import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

type GitHubReleaseAsset = {
  name: string
  browser_download_url: string
}

type GitHubRelease = {
  html_url: string
  draft?: boolean
  prerelease?: boolean
  created_at?: string
  published_at?: string
  assets?: GitHubReleaseAsset[]
}

const GITHUB_RELEASES_URL = "https://api.github.com/repos/AdityaW2005/W-Aditya/releases?per_page=30"
const RELEASES_FALLBACK_URL = "https://github.com/AdityaW2005/W-Aditya/releases/latest"

function releaseDate(release: GitHubRelease) {
  return new Date(release.published_at || release.created_at || 0).getTime()
}

function findResumeAsset(release: GitHubRelease) {
  const pdfAssets = release.assets?.filter((asset) => asset.name.toLowerCase().endsWith(".pdf")) ?? []

  return (
    pdfAssets.find((asset) => /\b(resume|cv|aditya)\b/i.test(asset.name)) ??
    pdfAssets[0]
  )
}

export async function GET() {
  try {
    const response = await fetch(GITHUB_RELEASES_URL, {
      cache: "no-store",
      headers: {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
    })

    if (!response.ok) {
      throw new Error("GitHub releases request failed")
    }

    const releases = ((await response.json()) as GitHubRelease[])
      .filter((release) => !release.draft)
      .sort((a, b) => releaseDate(b) - releaseDate(a))

    for (const release of releases) {
      const resumeAsset = findResumeAsset(release)

      if (resumeAsset?.browser_download_url) {
        return NextResponse.redirect(resumeAsset.browser_download_url, {
          headers: {
            "Cache-Control": "no-store, max-age=0",
          },
        })
      }
    }
  } catch {
    return NextResponse.redirect(RELEASES_FALLBACK_URL, {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    })
  }

  return NextResponse.redirect(RELEASES_FALLBACK_URL, {
    headers: {
      "Cache-Control": "no-store, max-age=0",
    },
  })
}
