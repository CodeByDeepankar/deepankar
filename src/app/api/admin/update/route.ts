import { cookies } from "next/headers";
import { NextResponse } from "next/server";

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

    const githubToken = process.env.GITHUB_TOKEN;
    const githubRepo = process.env.GITHUB_REPO; // e.g. "CodeByDeepankar/deepankar"

    if (!githubToken || !githubRepo || githubToken === "your_github_token_here") {
      return NextResponse.json({ 
        error: "GITHUB_TOKEN or GITHUB_REPO not configured in environment variables. Please add them to commit changes." 
      }, { status: 500 });
    }

    const path = "src/data/resume.json";
    const apiUrl = `https://api.github.com/repos/${githubRepo}/contents/${path}`;

    // 1. Get current file SHA (Required for GitHub API update, unless it's a new file)
    const getRes = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${githubToken}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    let sha: string | undefined;

    if (getRes.ok) {
      const fileData = await getRes.json();
      sha = fileData.sha;
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

    return NextResponse.json({ success: true, message: "Committed successfully. Vercel is deploying..." });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
