import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

// Simple token generation (in production, use a proper JWT library)
function generateToken(): string {
    return Buffer.from(`${Date.now()}-${Math.random()}`).toString("base64")
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { username, password } = body

        // Get admin credentials from environment variables
        // Defaults for development only
        const adminUsername = process.env.ADMIN_USERNAME || "admin"
        const adminPassword = process.env.ADMIN_PASSWORD || "admin"

        if (!username || !password) {
            return NextResponse.json({ error: "Username and password are required" }, { status: 400 })
        }

        if (username !== adminUsername || password !== adminPassword) {
            return NextResponse.json({ error: "Invalid username or password" }, { status: 401 })
        }

        // Generate a session token
        const token = generateToken()
        const expiresAt = new Date()
        expiresAt.setHours(expiresAt.getHours() + 24) // 24 hour session

        // Set httpOnly cookie for security
        const cookieStore = await cookies()
        cookieStore.set("admin_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            expires: expiresAt,
            path: "/",
        })

        return NextResponse.json({ success: true, message: "Login successful" })
    } catch (error) {
        console.error("Login error:", error)
        return NextResponse.json({ error: "Login failed" }, { status: 500 })
    }
}

