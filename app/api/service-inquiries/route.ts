import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SECRET_KEY =
  process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY

const RESEND_API_KEY = process.env.RESEND_API_KEY

const RESEND_FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || "CURA <info@cura.mv>"

const INTERNAL_EMAIL = "info@cura.mv"

const services = {
  audit: "Audit",
  tax: "Tax",
  advisory: "Advisory",
  legal: "Legal",
  bookkeeping: "Bookkeeping",
  payroll: "Payroll",
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

function emailLayout(content: string) {
  return `
    <div style="margin:0;padding:0;background:#f4f7fb;font-family:Arial,Helvetica,sans-serif;color:#071B49">
      <div style="max-width:680px;margin:0 auto;padding:32px 18px">
        <div style="background:#071B49;padding:22px 28px;border-radius:12px 12px 0 0">
          <div style="font-size:24px;font-weight:700;color:#ffffff;letter-spacing:0.5px">
            CURA
          </div>
          <div style="font-size:12px;color:#cbd5e1;margin-top:4px">
            Audit · Tax · Advisory · Legal
          </div>
        </div>

        <div style="background:#ffffff;padding:32px 28px;border-radius:0 0 12px 12px;border:1px solid #e2e8f0">
          ${content}

          <div style="margin-top:32px;padding-top:20px;border-top:1px solid #e2e8f0;font-size:13px;color:#64748b">
            <strong style="color:#071B49">CURA</strong><br>
            Maldives<br>
            <a href="mailto:info@cura.mv" style="color:#087dcc;text-decoration:none">
              info@cura.mv
            </a>
          </div>
        </div>
      </div>
    </div>
  `
}

async function sendEmail({
  to,
  subject,
  html,
  replyTo,
}: {
  to: string[]
  subject: string
  html: string
  replyTo?: string
}) {
  if (!RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not configured.")
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: RESEND_FROM_EMAIL,
      to,
      subject,
      reply_to: replyTo,
      html,
    }),
  })

  const result = await response.json().catch(() => null)

  if (!response.ok) {
    console.error("Resend error:", result)

    throw new Error(
      result?.message ||
        result?.error?.message ||
        "Unable to send email through Resend."
    )
  }

  return result?.id ?? null
}

export async function POST(request: NextRequest) {
  try {
    if (!SUPABASE_URL || !SUPABASE_SECRET_KEY || !RESEND_API_KEY) {
      console.error("CURA enquiry service configuration is incomplete.", {
        supabaseConfigured: Boolean(SUPABASE_URL && SUPABASE_SECRET_KEY),
        resendConfigured: Boolean(RESEND_API_KEY),
      })

      return NextResponse.json(
        {
          error:
            "CURA enquiry service is temporarily unavailable. Please try again later.",
        },
        { status: 500 }
      )
    }

    const body = await request.json()

    // Honeypot anti-spam field
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
      return NextResponse.json(
        { error: "Invalid service." },
        { status: 400 }
      )
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
        {
          error:
            "Please complete all required fields with sufficient detail.",
        },
        { status: 400 }
      )
    }

    const emailLooksValid =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

    if (!emailLooksValid) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      )
    }

    const supabase = createClient(
      SUPABASE_URL,
      SUPABASE_SECRET_KEY,
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
          detectSessionInUrl: false,
        },
      }
    )

    // 1. Save enquiry first
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
      console.error(
        "Unable to save service inquiry:",
        insertError
      )

      return NextResponse.json(
        {
          error:
            "Unable to save your enquiry. Please try again.",
        },
        { status: 500 }
      )
    }

    const serviceLabel = services[service]

    // ---------------------------------------------------------
    // 2. Email to CURA
    // ---------------------------------------------------------

    const internalSubject =
      `CURA ${serviceLabel} enquiry — ${businessName}`

    const internalHtml = emailLayout(`
      <h2 style="margin:0 0 6px;color:#071B49">
        New ${escapeHtml(serviceLabel)} enquiry
      </h2>

      <p style="margin-top:0;color:#64748b">
        Submitted through cura.mv
      </p>

      <div style="margin-top:28px">
        <h3 style="color:#071B49">Contact</h3>

        <p>
          <strong>Name:</strong> ${escapeHtml(fullName)}<br>
          <strong>Email:</strong>
          <a href="mailto:${escapeHtml(email)}"
             style="color:#087dcc">
            ${escapeHtml(email)}
          </a><br>
          <strong>Phone / WhatsApp:</strong> ${escapeHtml(phone)}<br>
          <strong>Preferred contact:</strong>
          ${escapeHtml(preferredContactMethod)}
        </p>
      </div>

      <div>
        <h3 style="color:#071B49">Business</h3>

        <p>
          <strong>Business:</strong> ${escapeHtml(businessName)}<br>
          <strong>Industry:</strong> ${escapeHtml(businessType)}<br>
          <strong>Location:</strong>
          ${escapeHtml(businessLocation || "Not provided")}<br>
          <strong>Website:</strong>
          ${escapeHtml(website || "Not provided")}
        </p>
      </div>

      <div>
        <h3 style="color:#071B49">Current circumstances</h3>

        <p style="white-space:pre-wrap">
          ${escapeHtml(currentCircumstance)}
        </p>
      </div>

      <div>
        <h3 style="color:#071B49">Assistance requested</h3>

        <p style="white-space:pre-wrap">
          ${escapeHtml(assistanceRequired)}
        </p>
      </div>

      <div style="margin-top:24px;padding:16px;background:#f8fafc;border-radius:8px">
        <strong>Urgency:</strong> ${escapeHtml(urgency)}<br>
        <strong>Reference:</strong> ${escapeHtml(inquiry.id)}
      </div>
    `)

    let internalMessageId: string | null = null
    let customerMessageId: string | null = null

    try {
      internalMessageId = await sendEmail({
        to: [INTERNAL_EMAIL],
        subject: internalSubject,
        html: internalHtml,
        replyTo: email,
      })
    } catch (error) {
      console.error(
        "Unable to send internal enquiry email:",
        error
      )
    }

    // ---------------------------------------------------------
    // 3. Confirmation email to customer
    // ---------------------------------------------------------

    const customerSubject =
      `CURA — We received your ${serviceLabel.toLowerCase()} enquiry`

    const customerHtml = emailLayout(`
      <h2 style="margin:0 0 12px;color:#071B49">
        Thank you for contacting CURA
      </h2>

      <p>
        Dear ${escapeHtml(fullName)},
      </p>

      <p>
        Thank you for submitting your enquiry regarding
        <strong>${escapeHtml(serviceLabel)}</strong>.
      </p>

      <p>
        We have received your enquiry and a member of the CURA
        team will review the information you provided.
      </p>

      <div style="margin:24px 0;padding:18px;background:#f8fafc;border-left:4px solid #087dcc;border-radius:6px">
        <strong>Enquiry reference</strong><br>
        ${escapeHtml(inquiry.id)}
      </div>

      <p>
        If we need any additional information, we will contact you
        using the details provided in your enquiry.
      </p>

      <p style="margin-top:28px">
        Kind regards,<br>
        <strong>CURA</strong>
      </p>
    `)

    try {
      customerMessageId = await sendEmail({
        to: [email],
        subject: customerSubject,
        html: customerHtml,
        replyTo: INTERNAL_EMAIL,
      })
    } catch (error) {
      console.error(
        "Unable to send customer confirmation email:",
        error
      )
    }

    // ---------------------------------------------------------
    // 4. Update enquiry email status
    // ---------------------------------------------------------

    const emailSent = Boolean(internalMessageId)

    await supabase
      .from("service_inquiries")
      .update({
        email_sent: emailSent,
        email_message_id: internalMessageId,
      })
      .eq("id", inquiry.id)

    // ---------------------------------------------------------
    // 5. Return result
    // ---------------------------------------------------------

    return NextResponse.json({
      ok: true,
      emailSent,
      customerEmailSent: Boolean(customerMessageId),
      reference: inquiry.id,
    })
  } catch (error) {
    console.error("Service inquiry error:", error)

    return NextResponse.json(
      {
        error:
          "Unable to process your enquiry. Please try again.",
      },
      { status: 500 }
    )
  }
}
