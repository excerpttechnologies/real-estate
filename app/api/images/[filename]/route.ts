import { NextRequest, NextResponse } from "next/server"
import { readFile } from "fs/promises"
import { existsSync } from "fs"
import path from "path"

// ─────────────────────────────────────────
// GET /api/images/:filename — Serve image
// ─────────────────────────────────────────
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await params

    // Security check — prevent path traversal attacks
    // e.g. someone sending filename as "../../etc/passwd"
    if (filename.includes("..") || filename.includes("/")) {
      return NextResponse.json(
        { error: "Invalid filename" },
        { status: 400 }
      )
    }

    const filePath = path.join(process.cwd(), "uploads", filename)

    if (!existsSync(filePath)) {
      return NextResponse.json(
        { error: "Image not found" },
        { status: 404 }
      )
    }

    const fileBuffer = await readFile(filePath)

    // Detect content type from extension
    const extension = filename.split(".").pop()?.toLowerCase()
    const contentTypeMap: Record<string, string> = {
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      png: "image/png",
      webp: "image/webp",
      gif: "image/gif",
      avif: "image/avif",
    }
    const contentType = contentTypeMap[extension || ""] || "image/jpeg"

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000", // cache for 1 year
      },
    })
  } catch (error) {
    console.error("Serve image error:", error)
    return NextResponse.json(
      { error: "Failed to serve image." },
      { status: 500 }
    )
  }
}
