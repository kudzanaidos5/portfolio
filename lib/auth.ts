import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function checkAuth() {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get("admin_token")
        return !!token
    } catch (error) {
        return false
    }
}

export async function requireAuth() {
    const isAuthenticated = await checkAuth()
    if (!isAuthenticated) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    return null
}

