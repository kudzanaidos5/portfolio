import { NextRequest, NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"
import { requireAuth } from "@/lib/auth"

const dataDirectory = path.join(process.cwd(), "data")
const skillsFilePath = path.join(dataDirectory, "skills.json")

export async function GET() {
    try {
        const fileContents = await fs.readFile(skillsFilePath, "utf8")
        const data = JSON.parse(fileContents)
        return NextResponse.json(data)
    } catch (error) {
        console.error("Error reading skills data:", error)
        return NextResponse.json({ error: "Failed to read skills data" }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    // Require authentication for write operations
    const authError = await requireAuth()
    if (authError) return authError

    try {
        const body = await request.json()
        await fs.writeFile(skillsFilePath, JSON.stringify(body, null, 2), "utf8")
        return NextResponse.json({ success: true, message: "Skills updated successfully" })
    } catch (error) {
        console.error("Error writing skills data:", error)
        return NextResponse.json({ error: "Failed to update skills data" }, { status: 500 })
    }
}

