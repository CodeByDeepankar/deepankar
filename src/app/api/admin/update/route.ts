import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token");

    if (!token || token.value !== "authenticated") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { updatedData } = await req.json();
    if (!updatedData) {
      return NextResponse.json({ error: "No data provided" }, { status: 400 });
    }

    // Write to local file system if not running on Vercel so local testing works!
    if (!process.env.VERCEL) {
      try {
        const localPath = path.join(process.cwd(), "src/data/resume.json");
        fs.writeFileSync(localPath, JSON.stringify(updatedData, null, 2));
      } catch (err) {
        console.error("Failed to write locally:", err);
      }
    }

    const githubToken = process.env.GITHUB_TOKEN;
    const githubRepo = process.env.GITHUB_REPO; // e.g. "CodeByDeepankar/deepankar"

    if (!githubToken || !githubRepo || githubToken === "your_github_token_here") {
      return NextResponse.json({ 
        error: "GITHUB_TOKEN or GITHUB_REPO not configured in environment variables. Please add them to commit changes." 
      }, { status: 500 });
    }

    const filePath = "src/data/resume.json";
    const apiUrl = `https://api.github.com/repos/${githubRepo}/contents/${filePath}`;

    // 1. Get current file SHA (Required for GitHub API update, unless it's a new file)
    const getRes = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${githubToken}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    let sha: string | undefined;
    let oldData: any = null;

    if (getRes.ok) {
      const fileData = await getRes.json();
      sha = fileData.sha;
      if (fileData.content) {
        try {
          const decoded = Buffer.from(fileData.content, 'base64').toString('utf-8');
          oldData = JSON.parse(decoded);
        } catch (e) {}
      }
    } else if (getRes.status !== 404) {
      // If it's not a 404 (Not Found), something else went wrong
      const errText = await getRes.text();
      return NextResponse.json({ error: "Failed to fetch current file from GitHub", details: errText }, { status: 500 });
    }

    // 2. Commit updated file
    const contentEncoded = Buffer.from(JSON.stringify(updatedData, null, 2)).toString("base64");

    const putRes = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${githubToken}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "Update portfolio data via Admin Dashboard",
        content: contentEncoded,
        sha: sha,
      }),
    });

    if (!putRes.ok) {
      const errData = await putRes.json();
      return NextResponse.json({ error: "Failed to commit to GitHub", details: errData }, { status: 500 });
    }

    // 3. Automated Garbage Collection for Orphaned Images
    if (oldData) {
      try {
        const extractImages = (data: any) => {
          const urls = new Set<string>();
          if (data.projects) data.projects.forEach((p: any) => p.image && urls.add(p.image));
          if (data.gallery) data.gallery.forEach((g: any) => g.src && urls.add(g.src));
          if (data.lab) data.lab.forEach((l: any) => l.image && urls.add(l.image));
          return urls;
        };

        const oldImages = extractImages(oldData);
        const newImages = extractImages(updatedData);

        const orphanedImages = Array.from(oldImages).filter(img => !newImages.has(img) && img.startsWith('/images/'));

        for (const imgUrl of orphanedImages) {
          const imgPath = `public${imgUrl}`;
          const imgApiUrl = `https://api.github.com/repos/${githubRepo}/contents/${imgPath}`;
          
          const imgGetRes = await fetch(imgApiUrl, {
            headers: { Authorization: `Bearer ${githubToken}`, Accept: "application/vnd.github.v3+json" }
          });
          
          if (imgGetRes.ok) {
            const imgData = await imgGetRes.json();
            await fetch(imgApiUrl, {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${githubToken}`,
                Accept: "application/vnd.github.v3+json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                message: `Automated cleanup: Delete orphaned image ${imgUrl}`,
                sha: imgData.sha
              })
            });
            
            // Delete locally as well if not on Vercel
            if (!process.env.VERCEL) {
              try {
                const localImgPath = path.join(process.cwd(), imgPath);
                if (fs.existsSync(localImgPath)) {
                  fs.unlinkSync(localImgPath);
                }
              } catch (err) {}
            }
          }
        }
      } catch (gcError) {
        console.error("Garbage collection failed:", gcError);
      }
    }

    return NextResponse.json({ success: true, message: "Committed successfully. Vercel is deploying..." });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
