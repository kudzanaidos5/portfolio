import { NextRequest, NextResponse } from "next/server"

export const runtime = "edge"

// Edge-safe token generation
function generateToken(): string {
  return crypto.randomUUID()
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, password } = body

    const adminUsername = process.env.ADMIN_USERNAME || "admin"
    const adminPassword = process.env.ADMIN_PASSWORD || "admin"

    if (!username || !password) {
      return NextResponse.json({ error: "Username and password are required" }, { status: 400 })
    }

    if (username !== adminUsername || password !== adminPassword) {
      return NextResponse.json({ error: "Invalid username or password" }, { status: 401 })
    }

    const token = generateToken()

    const response = NextResponse.json({ success: true, message: "Login successful" })

    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 24h
    })

    return response
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Login failed" }, { status: 500 })
  }
}
