import { NextRequest, NextResponse } from "next/server"
import { requireAuth } from "@/lib/auth"

export const runtime = "edge"

const KV_KEY = "projects"

export async function GET() {
  try {
    const data = await PROJECTS_KV.get(KV_KEY)

    if (!data) {
      return NextResponse.json([])
    }

    return NextResponse.json(JSON.parse(data))
  } catch (error) {
    console.error("KV read error:", error)
    return NextResponse.json({ error: "Failed to read projects" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const authError = await requireAuth()
  if (authError) return authError

  try {
    const body = await request.json()

    await PROJECTS_KV.put(KV_KEY, JSON.stringify(body))

    return NextResponse.json({
      success: true,
      message: "Projects updated successfully",
    })
  } catch (error) {
    console.error("KV write error:", error)
    return NextResponse.json({ error: "Failed to update projects" }, { status: 500 })
  }
}
