import { NextRequest, NextResponse } from "next/server"
import { requireAuth, isErrorResponse } from "@/app/lib/auth-helpers"
import { writeFile, mkdir } from "fs/promises"
import { existsSync } from "fs"
import path from "path"

// ─────────────────────────────────────────
// Auto-create uploads folder if not exists
// ─────────────────────────────────────────
async function ensureUploadDir() {
  const uploadDir = path.join(process.cwd(), "uploads")
  if (!existsSync(uploadDir)) {
    await mkdir(uploadDir, { recursive: true })
    console.log("✅ Created uploads folder automatically")
  }
  return uploadDir
}

// ─────────────────────────────────────────
// POST /api/upload — Upload images
// ─────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const auth = requireAuth(req)
    if (isErrorResponse(auth)) return auth

    const formData = await req.formData()
    const files = formData.getAll("images") as File[]

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: "No images provided" },
        { status: 400 }
      )
    }

    // Max 10 images
    if (files.length > 10) {
      return NextResponse.json(
        { error: "Maximum 10 images allowed" },
        { status: 400 }
      )
    }

    // Ensure uploads folder exists
    const uploadDir = await ensureUploadDir()

    const uploadedUrls: string[] = []

    for (const file of files) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        return NextResponse.json(
          { error: `${file.name} is not an image` },
          { status: 400 }
        )
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        return NextResponse.json(
          { error: `${file.name} exceeds 5MB limit` },
          { status: 400 }
        )
      }

      // Generate unique filename
      const timestamp = Date.now()
      const randomStr = Math.random().toString(36).substring(2, 8)
      const extension = file.name.split(".").pop()
      const filename = `property_${timestamp}_${randomStr}.${extension}`

      // Convert file to buffer and save
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const filePath = path.join(uploadDir, filename)

      await writeFile(filePath, buffer)

      // Return the URL to access the file
      const fileUrl = `/api/images/${filename}`
      uploadedUrls.push(fileUrl)
    }

    return NextResponse.json({
      message: "Images uploaded successfully",
      urls: uploadedUrls,
    })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json(
      { error: "Failed to upload images." },
      { status: 500 }
    )
  }
}

// ─────────────────────────────────────────
// DELETE /api/upload — Delete an image
// ─────────────────────────────────────────
export async function DELETE(req: NextRequest) {
  try {
    const auth = requireAuth(req)
    if (isErrorResponse(auth)) return auth

    const { filename } = await req.json()

    if (!filename) {
      return NextResponse.json(
        { error: "Filename is required" },
        { status: 400 }
      )
    }

    const { unlink } = await import("fs/promises")
    const filePath = path.join(process.cwd(), "uploads", filename)

    if (!existsSync(filePath)) {
      return NextResponse.json(
        { error: "File not found" },
        { status: 404 }
      )
    }

    await unlink(filePath)

    return NextResponse.json({
      message: "Image deleted successfully",
    })
  } catch (error) {
    console.error("Delete image error:", error)
    return NextResponse.json(
      { error: "Failed to delete image." },
      { status: 500 }
    )
  }
}