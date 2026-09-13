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

function field(label: string, value: string | number | null | undefined) {
  const displayValue =
    value === null || value === undefined || value === "" ? "—" : String(value);

  return `<tr>
    <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-weight:600;width:220px;vertical-align:top;">${escapeHtml(label)}</td>
    <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;vertical-align:top;">${escapeHtml(displayValue).replace(/\n/g, "<br />")}</td>
  </tr>`;
}

function emailLayout(title: string, content: string) {
  return `<!DOCTYPE html><html><body style="margin:0;padding:0;background:#f5f7fa;font-family:Arial,Helvetica,sans-serif;color:#172033;">
    <div style="max-width:760px;margin:30px auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">
      <div style="background:#071B49;padding:24px 30px;color:#fff;"><h1 style="margin:0;font-size:24px;">${escapeHtml(title)}</h1></div>
      <div style="padding:30px;">${content}</div>
      <div style="padding:18px 30px;background:#f8fafc;color:#64748b;font-size:12px;">CURA — Maldives</div>
    </div>
  </body></html>`;
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
  if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY is not configured");

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
}

function parseJsonArray(value: string) {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function uploadFile(
  supabase: any,
  applicationId: string,
  file: File,
  documentType: string,
) {
  const safeName = file.name
    .replace(/[^a-zA-Z0-9._-]/g, "_")
    .replace(/_+/g, "_");
  const path = `${applicationId}/${crypto.randomUUID()}-${safeName}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(path, buffer, {
      contentType: file.type || "application/octet-stream",
      upsert: false,
    });

  if (error) throw new Error(`Unable to upload ${file.name}.`);

  return {
    application_id: applicationId,
    document_type: documentType,
    original_file_name: file.name,
    storage_path: path,
    mime_type: file.type || "application/octet-stream",
    file_size: file.size,
  };
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

    const { data: career, error: careerError } = await supabase
      .from("careers")
      .select("id,title,department,location,employment_type,closing_date,published")
      .eq("id", careerId)
      .eq("published", true)
      .maybeSingle();

    if (careerError || !career) {
      return NextResponse.json(
        { error: careerError ? "Unable to verify this vacancy." : "This vacancy is no longer available." },
        { status: careerError ? 500 : 404 },
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

    if (!fullName || !email || !phone) {
      return NextResponse.json(
        { error: "Please complete all required fields." },
        { status: 400 },
      );
    }

    const educationDetails = parseJsonArray(clean(formData.get("education_details")));
    const experienceDetails = parseJsonArray(clean(formData.get("experience_details")));

    const education = educationDetails
      .filter((item) => item && typeof item === "object")
      .map((item: any) =>
        [item.qualification, item.institute, item.startYear, item.graduatedYear]
          .filter(Boolean)
          .join(" — "),
      )
      .filter(Boolean)
      .join("\n");

    const experience = experienceDetails
      .filter((item) => item && typeof item === "object")
      .map((item: any) =>
        [
          item.designation,
          item.employer,
          item.startYear ? `${item.startYear}–${item.currentlyWorking ? "Present" : item.endYear || ""}` : "",
          item.reasonForLeaving ? `Reason: ${item.reasonForLeaving}` : "",
        ]
          .filter(Boolean)
          .join(" — "),
      )
      .filter(Boolean)
      .join("\n");

    const applicationFields = {
      career_id: career.id,
      full_name: fullName,
      email,
      phone,
      id_number: clean(formData.get("id_number")),
      address: clean(formData.get("address")),
      date_of_birth: clean(formData.get("date_of_birth")) || null,
      education,
      education_details: educationDetails,
      experience_details: experienceDetails,
      professional_qualifications: clean(formData.get("professional_qualifications")),
      years_of_experience: null,
      current_employer: "",
      current_position: "",
      notice_period: clean(formData.get("notice_period")),
      expected_salary: clean(formData.get("expected_salary")),
      linkedin_url: "",
      portfolio_url: "",
      cover_letter: clean(formData.get("cover_letter")),
      additional_information: clean(formData.get("additional_information")),
      status: "new",
      applicant_email_sent: false,
      internal_email_sent: false,
    };

    const { data: application, error: applicationError } = await supabase
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

    try {
      const profilePictureEntry = formData.get("profile_picture");
      if (profilePictureEntry instanceof File && profilePictureEntry.size > 0) {
        if (!profilePictureEntry.type.startsWith("image/")) {
          throw new Error("Profile picture must be an image file.");
        }
        if (profilePictureEntry.size > 5 * 1024 * 1024) {
          throw new Error("Profile picture must be 5 MB or smaller.");
        }

        const profileRow = await uploadFile(
          supabase,
          application.id,
          profilePictureEntry,
          "profile_picture",
        );

        const { error } = await supabase
          .from("career_application_documents")
          .insert({ ...profileRow, description: "Applicant profile picture" });

        if (error) throw new Error("Unable to record the profile picture.");
      }

      const files = formData
        .getAll("documents")
        .filter((entry): entry is File => entry instanceof File && entry.size > 0);

      if (files.length > 10) {
        throw new Error("You can upload a maximum of 10 supporting documents.");
      }

      const descriptions = parseJsonArray(clean(formData.get("document_descriptions")));

      for (let index = 0; index < files.length; index += 1) {
        const file = files[index];
        const row = await uploadFile(
          supabase,
          application.id,
          file,
          "supporting_document",
        );

        const description =
          typeof descriptions[index] === "string" ? descriptions[index].trim() : "";

        const { error } = await supabase
          .from("career_application_documents")
          .insert({ ...row, description });

        if (error) throw new Error("Unable to record an uploaded document.");
      }
    } catch (fileError) {
      console.error("Career application file error:", fileError);
      await supabase.from("career_applications").delete().eq("id", application.id);

      return NextResponse.json(
        {
          error:
            fileError instanceof Error
              ? fileError.message
              : "Unable to process uploaded files.",
        },
        { status: 500 },
      );
    }

    const reference = application.id;
    const details = [
      ["Vacancy", career.title],
      ["Department", career.department],
      ["Location", career.location],
      ["Employment Type", career.employment_type],
      ["Full Name", fullName],
      ["Email", email],
      ["Phone", phone],
      ["ID Number", applicationFields.id_number],
      ["Address", applicationFields.address],
      ["Date of Birth", applicationFields.date_of_birth],
      ["Professional Qualifications", applicationFields.professional_qualifications],
      ["Education", education || "None provided"],
      ["Experience", experience || "None provided"],
      ["Notice Period", applicationFields.notice_period],
      ["Expected Salary", applicationFields.expected_salary],
      ["Cover Letter", applicationFields.cover_letter],
      ["Additional Information", applicationFields.additional_information],
    ];

    const detailsTable = `<table style="width:100%;border-collapse:collapse;font-size:14px;">
      ${details.map(([label, value]) => field(label, value)).join("")}
    </table>`;

    const documentRows = await supabase
      .from("career_application_documents")
      .select("original_file_name,document_type,description")
      .eq("application_id", application.id)
      .order("created_at", { ascending: true });

    const documentList =
      documentRows.data && documentRows.data.length > 0
        ? `<h3 style="margin-top:28px;">Uploaded Files</h3><ul>${documentRows.data
            .map(
              (doc) =>
                `<li><strong>${escapeHtml(doc.document_type)}</strong>: ${escapeHtml(doc.original_file_name)}${
                  doc.description ? ` — ${escapeHtml(doc.description)}` : ""
                }</li>`,
            )
            .join("")}</ul>`
        : `<p style="margin-top:28px;"><strong>Uploaded files:</strong> None.</p>`;

    const internalHtml = emailLayout(
      "New Career Application",
      `<p>A new application has been submitted through the CURA website.</p>
       <p><strong>Application Reference:</strong> ${escapeHtml(reference)}</p>
       ${detailsTable}${documentList}`,
    );

    const applicantHtml = emailLayout(
      "Application Received",
      `<p>Dear ${escapeHtml(fullName)},</p>
       <p>Thank you for applying for the position of <strong>${escapeHtml(career.title)}</strong> at CURA.</p>
       <p>We have successfully received your application.</p>
       <p><strong>Application Reference:</strong> ${escapeHtml(reference)}</p>
       <p>Our team will review your application and contact you if you are shortlisted for the next stage.</p>
       <p>Regards,<br />CURA<br />Maldives</p>`,
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
    } catch (error) {
      console.error("Internal career application email failed:", error);
    }

    try {
      await sendEmail({
        to: email,
        subject: `Application Received – ${career.title}`,
        html: applicantHtml,
      });
      applicantEmailSent = true;
    } catch (error) {
      console.error("Applicant career application email failed:", error);
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
      reference,
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
