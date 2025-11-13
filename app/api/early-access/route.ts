import { NextResponse } from "next/server"
import { Resend } from "resend"
import { createClient } from "@supabase/supabase-js"

function thanksEmailHtml({ fullName, role, useCase }: { fullName: string; role?: string; useCase?: string }) {
  const safe = (v?: string) =>
    (v ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')

  const namePart = fullName ? `, ${safe(fullName)}` : ''
  const rolePart = role ? ` for your role as ${safe(role)}` : ''
  const useCasePart = useCase ? ` ("${safe(useCase)}")` : ''

  return `<!doctype html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Thanks for exploring Gradies</title>
  </head>
  <body style="margin:0;padding:0;background:#0b1020;font-family:Inter,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#0f172a;">
    <div style="max-width:640px;margin:0 auto;padding:24px;">
      <div style="padding:24px;background:#0B1020;color:#E5E7EB;border-radius:12px;border:1px solid rgba(255,255,255,0.08);">
        <h1 style="margin:0;font-size:24px;color:#F5F3FF;">Thanks for reaching out${namePart}!</h1>
        <p style="margin:8px 0 0;color:#CBD5E1;">We’re excited that you want to explore Gradies. Here’s how we’ll move forward.</p>
      </div>

      <div style="padding:20px 24px;background:#FFFFFF;border-radius:12px;margin-top:12px;">
        <h2 style="margin:0 0 8px;font-size:18px;color:#111827;">What happens next</h2>
        <ol style="padding-left:18px;margin:8px 0;color:#111827;">
          <li style="margin-bottom:8px;"><strong>Discovery (15–30 min):</strong> We’ll confirm your goals and success criteria${rolePart}.</li>
          <li style="margin-bottom:8px;"><strong>Tailored demo:</strong> We’ll share a short walkthrough aligned with your use case${useCasePart}.</li>
          <li style="margin-bottom:8px;"><strong>Plan & next steps:</strong> You’ll receive a concise plan and timeline options.</li>
        </ol>

        <h3 style="margin:16px 0 8px;font-size:16px;color:#111827;">What we’ll cover</h3>
        <ul style="padding-left:18px;margin:8px 0;color:#111827;">
          <li>Where AI can deliver measurable impact in your workflow</li>
          <li>Integration approach, data considerations, and guardrails</li>
          <li>Milestones for a 4–8 week pilot to de-risk quickly</li>
        </ul>

        <p style="margin-top:16px;color:#111827;">If you have any extra context or docs to share in advance, just reply to this email.</p>
        <p style="margin-top:16px;color:#111827;">— The Gradies Team</p>
      </div>

      <div style="border-top:1px solid #E5E7EB;margin-top:24px;padding-top:16px;color:#94A3B8;font-size:12px;">
        <p style="margin:0;">Gradies • San Francisco & Remote</p>
        <p style="margin:4px 0 0;">You’re receiving this because you requested early access updates.</p>
      </div>
    </div>
  </body>
</html>`
}

const resend = new Resend(process.env.RESEND_API_KEY)
const supabaseUrl = process.env.SUPABASE_URL || "https://laxsnumrgofjvrwyhilx.supabase.co"
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY
const supabaseKey = supabaseServiceKey || process.env.SUPABASE_KEY
const supabase = supabaseKey ? createClient(supabaseUrl, supabaseKey) : null

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { fullName, email, role, useCase } = body ?? {}

    if (!fullName || typeof fullName !== "string" || fullName.trim().length < 2) {
      return NextResponse.json({ error: "Full name is required" }, { status: 400 })
    }
    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 })
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ error: "Email service not configured" }, { status: 500 })
    }
    if (!supabase) {
      return NextResponse.json({ error: "Database not configured. Set SUPABASE_URL and SUPABASE_SERVICE_KEY (preferred) or SUPABASE_KEY." }, { status: 500 })
    }

    const from = process.env.RESEND_FROM || "Gradies <onboarding@resend.dev>"

    // Capture request context
    const userAgent = req.headers.get("user-agent") || ""
    const referrer = req.headers.get("referer") || req.headers.get("referrer") || ""

    // Persist submission in Supabase
    const { error: dbError } = await supabase
      .from("early_access_applications")
      .insert([
        {
          full_name: fullName,
          email,
          role_title: role || null,
          use_case: useCase || null,
          user_agent: userAgent,
          referrer,
          status: "new",
        },
      ])

    if (dbError) {
      console.error("Supabase insert error", dbError)
      return NextResponse.json({ error: "Failed to save your request. Please try again." }, { status: 500 })
    }

    // Send thank-you email to the requester (HTML pre-rendered)
    await resend.emails.send({
      from,
      to: email,
      subject: "Thanks for exploring Gradies",
      html: thanksEmailHtml({ fullName, role, useCase }),
    })

    return NextResponse.json({ ok: true })
  } catch (err: any) {
    console.error("/api/early-access error", err)
    return NextResponse.json({ error: err?.message || "Unexpected error" }, { status: 500 })
  }
}
