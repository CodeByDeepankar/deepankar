import { cookies } from "next/headers";
import { NextResponse } from "next/server";

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
    
    // Sanitize filename: lowercase, replace spaces/special chars with hyphens, append random string
    const ext = filename.split('.').pop() || 'png';
    const nameWithoutExt = filename.substring(0, filename.lastIndexOf('.')).substring(0, 20); // max 20 chars
    const cleanName = nameWithoutExt.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
    const randomSuffix = Math.random().toString(36).substring(2, 8);
    const finalFilename = `${cleanName}-${randomSuffix}.${ext}`;

    // Store in selected folder
    const path = `public/images/${folder}/${finalFilename}`;
    const apiUrl = `https://api.github.com/repos/${githubRepo}/contents/${path}`;

    // Attempt to upload new file
    const putRes = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${githubToken}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `Upload image ${filename} via Admin Dashboard`,
        content: base64Content,
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
