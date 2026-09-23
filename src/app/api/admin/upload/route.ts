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

    const { filename, base64Data, folder = "uploads" } = await req.json();
    if (!filename || !base64Data) {
      return NextResponse.json({ error: "Missing filename or data" }, { status: 400 });
    }

    const githubToken = process.env.GITHUB_TOKEN;
    const githubRepo = process.env.GITHUB_REPO;

    if (!githubToken || !githubRepo || githubToken === "your_github_token_here") {
      return NextResponse.json({ 
        error: "GITHUB_TOKEN or GITHUB_REPO not configured." 
      }, { status: 500 });
    }

    // Remove data:image/png;base64, prefix if present
    const base64Content = base64Data.split(",")[1] || base64Data;
    
    // Sanitize filename: lowercase, replace spaces with hyphens, remove weird chars
    const ext = filename.split('.').pop() || 'png';
    const nameWithoutExt = filename.substring(0, filename.lastIndexOf('.')).substring(0, 50);
    const cleanName = nameWithoutExt.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
    const finalFilename = `${cleanName}.${ext}`;

    // Write locally if not on Vercel so it's instantly available without pulling
    if (!process.env.VERCEL) {
      try {
        const localDir = path.join(process.cwd(), `public/images/${folder}`);
        if (!fs.existsSync(localDir)) {
          fs.mkdirSync(localDir, { recursive: true });
        }
        const localPath = path.join(localDir, finalFilename);
        fs.writeFileSync(localPath, Buffer.from(base64Content, 'base64'));
      } catch (err) {
        console.error("Failed to write image locally:", err);
      }
    }

    // Store in selected folder
    const filePath = `public/images/${folder}/${finalFilename}`;
    const apiUrl = `https://api.github.com/repos/${githubRepo}/contents/${filePath}`;

    // 1. Check if file already exists to get its SHA (required for overwrite)
    let sha: string | undefined;
    const getRes = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${githubToken}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (getRes.ok) {
      const fileData = await getRes.json();
      sha = fileData.sha;
    }

    // Attempt to upload or overwrite file
    const putRes = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${githubToken}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `Upload image ${finalFilename} via Admin Dashboard`,
        content: base64Content,
        sha: sha,
      }),
    });

    if (!putRes.ok) {
      const errData = await putRes.json();
      return NextResponse.json({ error: "Failed to upload to GitHub", details: errData }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      url: `/images/${folder}/${finalFilename}` 
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
