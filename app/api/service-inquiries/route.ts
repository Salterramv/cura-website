import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SECRET_KEY =
  process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY
const RESEND_API_KEY = process.env.RESEND_API_KEY
const RESEND_FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || "CURA <info@cura.mv>"

const services = {
  audit: "Audit",
  tax: "Tax",
  advisory: "Advisory",
  legal: "Legal",
} as const

function clean(value: unknown, max = 10000) {
  return String(value ?? "").trim().slice(0, max)
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;")
}

export async function POST(request: NextRequest) {
  try {
    if (!SUPABASE_URL || !SUPABASE_SECRET_KEY) {
      return NextResponse.json(
        { error: "CURA enquiry service is not configured." },
        { status: 500 },
      )
    }

    const body = await request.json()

    if (clean(body.website_url, 100).length > 0) {
      return NextResponse.json({ ok: true })
    }

    const service = clean(body.service, 20) as keyof typeof services
    const fullName = clean(body.full_name, 150)
    const email = clean(body.email, 320)
    const phone = clean(body.phone, 50)
    const businessName = clean(body.business_name, 200)
    const businessType = clean(body.business_type, 150)
    const businessLocation = clean(body.business_location, 200)
    const website = clean(body.website, 500)
    const currentCircumstance = clean(body.current_circumstance, 10000)
    const assistanceRequired = clean(body.assistance_required, 5000)
    const urgency = clean(body.urgency, 50) || "Not urgent"
    const preferredContactMethod =
      clean(body.preferred_contact_method, 50) || "Email"

    if (!services[service]) {
      return NextResponse.json({ error: "Invalid service." }, { status: 400 })
    }

    if (
      fullName.length < 2 ||
      email.length < 5 ||
      phone.length < 3 ||
      businessName.length < 2 ||
      businessType.length < 2 ||
      currentCircumstance.length < 20 ||
      assistanceRequired.length < 10
    ) {
      return NextResponse.json(
        { error: "Please complete all required fields with sufficient detail." },
        { status: 400 },
      )
    }

    const emailLooksValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    if (!emailLooksValid) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 },
      )
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SECRET_KEY, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    })

    const { data: inquiry, error: insertError } = await supabase
      .from("service_inquiries")
      .insert({
        service,
        full_name: fullName,
        email,
        phone,
        business_name: businessName,
        business_type: businessType,
        business_location: businessLocation || null,
        website: website || null,
        current_circumstance: currentCircumstance,
        assistance_required: assistanceRequired,
        urgency,
        preferred_contact_method: preferredContactMethod,
      })
      .select("id")
      .single()

    if (insertError || !inquiry) {
      console.error("Unable to save service inquiry:", insertError)
      return NextResponse.json(
        { error: "Unable to save your enquiry. Please try again." },
        { status: 500 },
      )
    }

    let emailSent = false
    let emailMessageId: string | null = null

    if (RESEND_API_KEY) {
      const serviceLabel = services[service]
      const subject = `CURA ${serviceLabel} enquiry — ${businessName}`

      const html = `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#071B49">
          <h2 style="margin-bottom:4px">New CURA ${escapeHtml(serviceLabel)} enquiry</h2>
          <p style="color:#64748b;margin-top:0">Submitted through cura.mv</p>

          <h3>Contact</h3>
          <p><strong>Name:</strong> ${escapeHtml(fullName)}<br>
          <strong>Email:</strong> ${escapeHtml(email)}<br>
          <strong>Phone / WhatsApp:</strong> ${escapeHtml(phone)}<br>
          <strong>Preferred contact:</strong> ${escapeHtml(preferredContactMethod)}</p>

          <h3>Business</h3>
          <p><strong>Business:</strong> ${escapeHtml(businessName)}<br>
          <strong>Industry:</strong> ${escapeHtml(businessType)}<br>
          <strong>Location:</strong> ${escapeHtml(businessLocation || "Not provided")}<br>
          <strong>Website:</strong> ${escapeHtml(website || "Not provided")}</p>

          <h3>Current circumstance</h3>
          <p>${escapeHtml(currentCircumstance).replaceAll("\n", "<br>")}</p>

          <h3>Assistance requested</h3>
          <p>${escapeHtml(assistanceRequired).replaceAll("\n", "<br>")}</p>

          <p><strong>Urgency:</strong> ${escapeHtml(urgency)}</p>
          <p><strong>Internal reference:</strong> ${escapeHtml(inquiry.id)}</p>
        </div>
      `

      try {
        const resendResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: RESEND_FROM_EMAIL,
            to: ["info@cura.mv"],
            reply_to: email,
            subject,
            html,
          }),
        })

        const resendResult = await resendResponse.json()

        if (resendResponse.ok) {
          emailSent = true
          emailMessageId = resendResult?.id ?? null
        } else {
          console.error("Resend error:", resendResult)
        }
      } catch (emailError) {
        console.error("Unable to send enquiry email:", emailError)
      }
    }

    await supabase
      .from("service_inquiries")
      .update({
        email_sent: emailSent,
        email_message_id: emailMessageId,
      })
      .eq("id", inquiry.id)

    return NextResponse.json({
      ok: true,
      emailSent,
    })
  } catch (error) {
    console.error("Service inquiry error:", error)
    return NextResponse.json(
      { error: "Unable to process your enquiry. Please try again." },
      { status: 500 },
    )
  }
}
