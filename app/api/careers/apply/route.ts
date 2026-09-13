import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey =
  process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "CURA <info@cura.mv>";
const INTERNAL_EMAIL = "info@cura.mv";
const STORAGE_BUCKET = "career-applications";

function clean(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

async function sendEmail({
  to,
  subject,
  html,
  replyTo,
}: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}) {
  if (!RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not configured");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: [to],
      subject,
      html,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      typeof data?.message === "string"
        ? data.message
        : `Email request failed with status ${response.status}`,
    );
  }

  return data;
}

function emailLayout(title: string, content: string) {
  return `
    <!DOCTYPE html>
    <html>
      <body style="margin:0;padding:0;background:#f5f7fa;font-family:Arial,Helvetica,sans-serif;color:#172033;">
        <div style="max-width:720px;margin:30px auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">
          <div style="background:#071B49;padding:24px 30px;color:#ffffff;">
            <h1 style="margin:0;font-size:24px;">${escapeHtml(title)}</h1>
          </div>
          <div style="padding:30px;">
            ${content}
          </div>
          <div style="padding:18px 30px;background:#f8fafc;color:#64748b;font-size:12px;">
            CURA — Maldives
          </div>
        </div>
      </body>
    </html>
  `;
}

function field(
  label: string,
  value: string | number | null | undefined,
) {
  const displayValue =
    value === null || value === undefined || value === ""
      ? "—"
      : String(value);

  return `
    <tr>
      <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-weight:600;width:220px;vertical-align:top;">
        ${escapeHtml(label)}
      </td>
      <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;vertical-align:top;">
        ${escapeHtml(displayValue).replace(/\n/g, "<br />")}
      </td>
    </tr>
  `;
}

export async function POST(request: NextRequest) {
  try {
    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        { error: "Server database configuration is incomplete." },
        { status: 500 },
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const formData = await request.formData();

    const careerId = clean(formData.get("career_id"));

    if (!careerId) {
      return NextResponse.json(
        { error: "The vacancy could not be identified." },
        { status: 400 },
      );
    }

    const {
      data: career,
      error: careerError,
    } = await supabase
      .from("careers")
      .select(
        "id,title,department,location,employment_type,closing_date,published",
      )
      .eq("id", careerId)
      .eq("published", true)
      .maybeSingle();

    if (careerError) {
      console.error("Career lookup error:", careerError);
      return NextResponse.json(
        { error: "Unable to verify this vacancy." },
        { status: 500 },
      );
    }

    if (!career) {
      return NextResponse.json(
        { error: "This vacancy is no longer available." },
        { status: 404 },
      );
    }

    if (
      career.closing_date &&
      new Date(`${career.closing_date}T23:59:59+05:00`) < new Date()
    ) {
      return NextResponse.json(
        { error: "The application deadline for this vacancy has passed." },
        { status: 400 },
      );
    }

    const fullName = clean(formData.get("full_name"));
    const email = clean(formData.get("email")).toLowerCase();
    const phone = clean(formData.get("phone"));
    const yearsOfExperienceRaw = clean(formData.get("years_of_experience"));
    const yearsOfExperience = yearsOfExperienceRaw
      ? Number.parseFloat(yearsOfExperienceRaw)
      : null;

    if (!fullName || !email || !phone) {
      return NextResponse.json(
        { error: "Please complete all required fields." },
        { status: 400 },
      );
    }

    if (
      yearsOfExperienceRaw &&
      (yearsOfExperience === null || Number.isNaN(yearsOfExperience))
    ) {
      return NextResponse.json(
        {
          error:
            "Please enter years of experience as a number, for example 3 or 3.5.",
        },
        { status: 400 },
      );
    }

    const applicationFields = {
      career_id: career.id,
      full_name: fullName,
      email,
      phone,
      id_number: clean(formData.get("id_number")),
      address: clean(formData.get("address")),
      date_of_birth: clean(formData.get("date_of_birth")) || null,
      current_position: clean(formData.get("current_position")),
      current_employer: clean(formData.get("current_employer")),
      years_of_experience: yearsOfExperience,
      professional_qualifications: clean(
        formData.get("professional_qualifications"),
      ),
      education: clean(formData.get("education")),
      notice_period: clean(formData.get("notice_period")),
      expected_salary: clean(formData.get("expected_salary")),
      linkedin_url: clean(formData.get("linkedin_url")),
      portfolio_url: clean(formData.get("portfolio_url")),
      cover_letter: clean(formData.get("cover_letter")),
      additional_information: clean(
        formData.get("additional_information"),
      ),
      status: "new",
      applicant_email_sent: false,
      internal_email_sent: false,
    };

    const {
      data: application,
      error: applicationError,
    } = await supabase
      .from("career_applications")
      .insert(applicationFields)
      .select("id")
      .single();

    if (applicationError || !application) {
      console.error("Application insert error:", applicationError);
      return NextResponse.json(
        { error: "Unable to submit your application. Please try again." },
        { status: 500 },
      );
    }

    const files = formData
      .getAll("documents")
      .filter((entry): entry is File => entry instanceof File && entry.size > 0);

    if (files.length > 10) {
      return NextResponse.json(
        { error: "You can upload a maximum of 10 documents." },
        { status: 400 },
      );
    }

    let documentDescriptions: string[] = [];

    const rawDocumentDescriptions = clean(
      formData.get("document_descriptions"),
    );

    if (rawDocumentDescriptions) {
      try {
        const parsed = JSON.parse(rawDocumentDescriptions);
        if (Array.isArray(parsed)) {
          documentDescriptions = parsed.map((value) =>
            typeof value === "string" ? value.trim() : "",
          );
        }
      } catch {
        documentDescriptions = [];
      }
    }

    const documentRows: Array<{
      application_id: string;
      document_type: string;
      original_file_name: string;
      storage_path: string;
      mime_type: string;
      file_size: number;
      description: string;
    }> = [];

    for (const file of files) {
      const safeName = file.name
        .replace(/[^a-zA-Z0-9._-]/g, "_")
        .replace(/_+/g, "_");

      const path = `${application.id}/${crypto.randomUUID()}-${safeName}`;

      const buffer = Buffer.from(await file.arrayBuffer());

      const { error: uploadError } = await supabase.storage
        .from(STORAGE_BUCKET)
        .upload(path, buffer, {
          contentType: file.type || "application/octet-stream",
          upsert: false,
        });

      if (uploadError) {
        console.error("Document upload error:", uploadError);

        await supabase
          .from("career_applications")
          .delete()
          .eq("id", application.id);

        return NextResponse.json(
          { error: `Unable to upload ${file.name}. Please try again.` },
          { status: 500 },
        );
      }

      documentRows.push({
        application_id: application.id,
        document_type: "supporting_document",
        original_file_name: file.name,
        storage_path: path,
        mime_type: file.type || "application/octet-stream",
        file_size: file.size,
        description: documentDescriptions[documentRows.length] || "",
      });
    }

    if (documentRows.length > 0) {
      const { error: documentsError } = await supabase
        .from("career_application_documents")
        .insert(documentRows);

      if (documentsError) {
        console.error("Document record error:", documentsError);
        return NextResponse.json(
          {
            error:
              "Your application was saved, but there was a problem recording the uploaded documents.",
          },
          { status: 500 },
        );
      }
    }

    const applicationReference = application.id;

    const details = [
      ["Vacancy", career.title || ""],
      ["Department", career.department || ""],
      ["Location", career.location || ""],
      ["Employment Type", career.employment_type || ""],
      ["Full Name", fullName],
      ["Email", email],
      ["Phone", phone],
      ["ID Number", applicationFields.id_number],
      ["Address", applicationFields.address],
      ["Date of Birth", applicationFields.date_of_birth],
      ["Current Position", applicationFields.current_position],
      ["Current Employer", applicationFields.current_employer],
      ["Years of Experience", applicationFields.years_of_experience],
      [
        "Professional Qualifications",
        applicationFields.professional_qualifications,
      ],
      ["Education", applicationFields.education],
      ["Notice Period", applicationFields.notice_period],
      ["Expected Salary", applicationFields.expected_salary],
      ["LinkedIn", applicationFields.linkedin_url],
      ["Portfolio", applicationFields.portfolio_url],
      ["Cover Letter", applicationFields.cover_letter],
      ["Additional Information", applicationFields.additional_information],
    ];

    const detailsTable = `
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        ${details.map(([label, value]) => field(label, value)).join("")}
      </table>
    `;

    const documentList =
      files.length > 0
        ? `
          <h3 style="margin-top:28px;">Documents</h3>
          <ul>
            ${files
              .map(
                (file) =>
                  `<li>${escapeHtml(file.name)} (${Math.round(
                    file.size / 1024,
                  )} KB)</li>`,
              )
              .join("")}
          </ul>
        `
        : `<p style="margin-top:28px;"><strong>Documents:</strong> None uploaded.</p>`;

    const internalHtml = emailLayout(
      `New Career Application`,
      `
        <p>A new application has been submitted through the CURA website.</p>
        <p>
          <strong>Application Reference:</strong>
          ${escapeHtml(applicationReference)}
        </p>
        ${detailsTable}
        ${documentList}
      `,
    );

    const applicantHtml = emailLayout(
      `Application Received`,
      `
        <p>Dear ${escapeHtml(fullName)},</p>

        <p>
          Thank you for applying for the position of
          <strong>${escapeHtml(career.title)}</strong> at CURA.
        </p>

        <p>
          We have successfully received your application.
        </p>

        <p>
          <strong>Application Reference:</strong>
          ${escapeHtml(applicationReference)}
        </p>

        <p>
          Our team will review your application and contact you if you are
          shortlisted for the next stage.
        </p>

        <p>
          Regards,<br />
          CURA<br />
          Maldives
        </p>
      `,
    );

    let applicantEmailSent = false;
    let internalEmailSent = false;

    try {
      await sendEmail({
        to: INTERNAL_EMAIL,
        subject: `New Career Application – ${career.title} – ${fullName}`,
        html: internalHtml,
        replyTo: email,
      });

      internalEmailSent = true;
    } catch (emailError) {
      console.error("Internal career application email failed:", emailError);
    }

    try {
      await sendEmail({
        to: email,
        subject: `Application Received – ${career.title}`,
        html: applicantHtml,
      });

      applicantEmailSent = true;
    } catch (emailError) {
      console.error("Applicant career application email failed:", emailError);
    }

    await supabase
      .from("career_applications")
      .update({
        internal_email_sent: internalEmailSent,
        applicant_email_sent: applicantEmailSent,
        updated_at: new Date().toISOString(),
      })
      .eq("id", application.id);

    return NextResponse.json({
      success: true,
      application_id: application.id,
      reference: applicationReference,
      applicant_email_sent: applicantEmailSent,
      internal_email_sent: internalEmailSent,
    });
  } catch (error) {
    console.error("Career application API error:", error);

    return NextResponse.json(
      { error: "Unable to submit the application. Please try again." },
      { status: 500 },
    );
  }
}
