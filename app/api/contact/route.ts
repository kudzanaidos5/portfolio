import { type NextRequest, NextResponse } from "next/server"

// Ensure this route runs on the Node.js runtime for email SDK compatibility
export const runtime = "nodejs"

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    console.log("Received contact form data:", { name, email, subject, message })

    // Validate required fields
    if (!name || !email || !subject || !message) {
      console.log("Validation failed: Missing required fields")
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      console.log("Validation failed: Invalid email format")
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Check if we have Resend API key
    if (!process.env.RESEND_API_KEY) {
      console.log("No RESEND_API_KEY found, using fallback method")

      // Fallback: Log the message (in production, you might want to save to database)
      console.log("=== NEW CONTACT MESSAGE ===")
      console.log(`From: ${name} (${email})`)
      console.log(`Subject: ${subject}`)
      console.log(`Message: ${message}`)
      console.log("========================")

      // Simulate email sending delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      return NextResponse.json({
        message: "Message received successfully! (Demo mode - check server logs)",
        id: `demo_${Date.now()}`,
      })
    }

    // Try to use Resend if API key is available
    try {
      const { Resend } = await import("resend")
      const resend = new Resend(process.env.RESEND_API_KEY)

      console.log("Attempting to send email via Resend...")

      const emailFrom = process.env.EMAIL_FROM || "Portfolio Contact <onboarding@resend.dev>"
      const emailTo = process.env.EMAIL_TO || "kudzanaidos5@gmail.com"
      const autoReplyFrom = process.env.AUTO_REPLY_FROM || process.env.EMAIL_FROM || "Kudzanai Denzel Dhospani <onboarding@resend.dev>"

      const safeMessageHtml = escapeHtml(message).replace(/\n/g, "<br>")

      const emailData = await resend.emails.send({
        from: emailFrom,
        to: [emailTo],
        replyTo: email,
        subject: `Portfolio Contact: ${subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
              New Contact Form Submission
            </h2>
            
            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1e293b; margin-top: 0;">Contact Details</h3>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Subject:</strong> ${subject}</p>
            </div>
            
            <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
              <h3 style="color: #1e293b; margin-top: 0;">Message</h3>
              <p style="line-height: 1.6; color: #475569;">${safeMessageHtml}</p>
            </div>
            
            <div style="margin-top: 20px; padding: 15px; background-color: #dbeafe; border-radius: 8px;">
              <p style="margin: 0; color: #1e40af; font-size: 14px;">
                <strong>Reply to:</strong> ${email}
              </p>
            </div>
          </div>
        `,
        text: `
          New Contact Form Submission
          
          Name: ${name}
          Email: ${email}
          Subject: ${subject}
          
          Message:
          ${message}
          
          Reply to: ${email}
        `,
      })

      console.log("Email sent successfully via Resend:", emailData)

      // Send auto-reply
      try {
        await resend.emails.send({
          from: autoReplyFrom,
          to: [email],
          subject: "Thank you for contacting me!",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #2563eb;">Thank You for Your Message!</h2>
              <p>Hi ${name},</p>
              <p>Thank you for reaching out through my portfolio website. I've received your message and will get back to you within 24-48 hours.</p>
              <p>Best regards,<br><strong>Kudzanai Denzel Dhospani</strong></p>
            </div>
          `,
          replyTo: emailTo,
        })
        console.log("Auto-reply sent successfully")
      } catch (autoReplyError) {
        console.warn("Auto-reply failed:", autoReplyError)
      }

      return NextResponse.json({
        message: "Email sent successfully!",
        id: emailData.data?.id,
      })
    } catch (resendError) {
      console.error("Resend error:", resendError)

      // Fallback if Resend fails
      console.log("=== FALLBACK: NEW CONTACT MESSAGE ===")
      console.log(`From: ${name} (${email})`)
      console.log(`Subject: ${subject}`)
      console.log(`Message: ${message}`)
      console.log("===================================")

      return NextResponse.json({
        message: "Message received successfully! (Fallback mode)",
        id: `fallback_${Date.now()}`,
      })
    }
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ error: "Failed to process your message. Please try again." }, { status: 500 })
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json({ message: "Contact API is working" })
}
