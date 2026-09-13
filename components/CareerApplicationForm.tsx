"use client"

import { FormEvent, useState } from "react"

type CareerApplicationFormProps = {
  careerId: string
  careerTitle: string
  closingDate: string | null
}

const inputClass =
  "w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-[#071B49] outline-none transition focus:border-[#18B8EE] focus:ring-2 focus:ring-[#18B8EE]/20"

const labelClass = "mb-2 block text-sm font-semibold text-[#071B49]"

export default function CareerApplicationForm({
  careerId,
  careerTitle,
  closingDate,
}: CareerApplicationFormProps) {
  const [open, setOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [files, setFiles] = useState<File[]>([])
  const [fileDescriptions, setFileDescriptions] = useState<string[]>([])

  const applicationClosed =
    !!closingDate &&
    new Date(`${closingDate}T23:59:59+05:00`).getTime() < Date.now()

  function handleFiles(selected: FileList | null) {
    const selectedFiles = selected ? Array.from(selected) : []

    if (selectedFiles.length > 10) {
      setError("You can upload a maximum of 10 documents.")
      setFiles(selectedFiles.slice(0, 10))
      return
    }

    setError("")
    setFiles(selectedFiles)
    setFileDescriptions(selectedFiles.map(() => ""))
  }

  function updateFileDescription(index: number, description: string) {
    setFileDescriptions((current) => {
      const next = [...current]
      next[index] = description
      return next
    })
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setSubmitting(true)
    setError("")
    setSuccess("")

    const form = event.currentTarget
    const formData = new FormData(form)

    formData.set("career_id", careerId)

    // Replace the browser's automatic file entries with the
    // controlled file list so every selected document is submitted once.
    formData.delete("documents")
    formData.delete("document_descriptions")

    if (files.length > 10) {
      throw new Error("You can upload a maximum of 10 documents.")
    }

    files.forEach((file) => {
      formData.append("documents", file)
    })

    formData.append(
      "document_descriptions",
      JSON.stringify(fileDescriptions),
    )

    try {
      const response = await fetch("/api/careers/apply", {
        method: "POST",
        body: formData,
      })

      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(
          typeof data?.error === "string"
            ? data.error
            : "Unable to submit your application.",
        )
      }

      setSuccess(
        `Thank you for applying for ${careerTitle}. Your application has been submitted successfully. Your reference number is ${data.reference ?? "confirmed by CURA"}.`,
      )

      form.reset()
      setFiles([])
      setFileDescriptions([])
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Unable to submit your application. Please try again.",
      )
    } finally {
      setSubmitting(false)
    }
  }

  if (success) {
    return (
      <section className="mt-10 rounded-2xl border border-emerald-200 bg-emerald-50 p-8">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-700">
          Application received
        </p>

        <h2 className="mt-3 text-2xl font-semibold text-[#071B49]">
          Thank you for applying
        </h2>

        <p className="mt-4 leading-7 text-slate-700">
          {success}
        </p>

        <p className="mt-4 text-sm text-slate-600">
          A confirmation email will be sent to the email address provided in
          your application.
        </p>
      </section>
    )
  }

  return (
    <section className="mt-10">
      {!open ? (
        <div className="rounded-2xl bg-[#071B49] p-8 text-white md:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#35B5E5]">
            Interested in this position?
          </p>

          <h2 className="mt-3 text-2xl font-semibold md:text-3xl">
            Apply Online
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
            Submit your application online with your personal details,
            qualifications, experience and supporting documents.
          </p>

          {!applicationClosed && (
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="mt-7 inline-flex items-center rounded-lg bg-[#35B5E5] px-6 py-3 text-sm font-semibold text-[#071B49] transition hover:bg-white"
            >
              Apply Online
              <span className="ml-2">→</span>
            </button>
          )}

          {applicationClosed && (
            <p className="mt-7 text-sm font-semibold text-slate-500">
              Applications for this position are now closed.
            </p>
          )}

          {closingDate && (
            <p className="mt-4 text-xs text-slate-400">
              Applications close on{" "}
              {new Date(closingDate).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
              .
            </p>
          )}
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
          <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#168BC4]">
                Online Application
              </p>

              <h2 className="mt-2 text-2xl font-semibold text-[#071B49]">
                Apply for {careerTitle}
              </h2>
            </div>

            <button
              type="button"
              onClick={() => {
                setOpen(false)
                setError("")
              }}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
            >
              Close
            </button>
          </div>

          {error && (
            <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-[#071B49]">
                Personal Information
              </h3>

              <div className="mt-5 grid gap-5 md:grid-cols-2">
                <div>
                  <label className={labelClass}>Full Name *</label>
                  <input
                    name="full_name"
                    type="text"
                    className={inputClass}
                    required
                  />
                </div>

                <div>
                  <label className={labelClass}>Email Address *</label>
                  <input
                    name="email"
                    type="email"
                    className={inputClass}
                    required
                  />
                </div>

                <div>
                  <label className={labelClass}>Phone Number *</label>
                  <input
                    name="phone"
                    type="tel"
                    className={inputClass}
                    required
                  />
                </div>

                <div>
                  <label className={labelClass}>National ID / ID Number</label>
                  <input
                    name="id_number"
                    type="text"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Date of Birth</label>
                  <input
                    name="date_of_birth"
                    type="date"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Current Address</label>
                  <input
                    name="address"
                    type="text"
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[#071B49]">
                Professional Information
              </h3>

              <div className="mt-5 grid gap-5 md:grid-cols-2">
                <div>
                  <label className={labelClass}>Current Position</label>
                  <input
                    name="current_position"
                    type="text"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Current Employer</label>
                  <input
                    name="current_employer"
                    type="text"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Years of Experience</label>
                  <input
                    name="years_of_experience"
                    type="text"
                    className={inputClass}
                    placeholder="e.g. 3 years"
                  />
                </div>

                <div>
                  <label className={labelClass}>Notice Period</label>
                  <input
                    name="notice_period"
                    type="text"
                    className={inputClass}
                    placeholder="e.g. 1 month"
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    Professional Qualifications
                  </label>
                  <textarea
                    name="professional_qualifications"
                    rows={4}
                    className={inputClass}
                    placeholder="ACCA, CPA, degree, professional memberships, etc."
                  />
                </div>

                <div>
                  <label className={labelClass}>Education</label>
                  <textarea
                    name="education"
                    rows={4}
                    className={inputClass}
                    placeholder="Degrees, institutions and relevant education"
                  />
                </div>

                <div>
                  <label className={labelClass}>Expected Salary</label>
                  <input
                    name="expected_salary"
                    type="text"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>LinkedIn Profile</label>
                  <input
                    name="linkedin_url"
                    type="url"
                    className={inputClass}
                    placeholder="https://..."
                  />
                </div>

                <div className="md:col-span-2">
                  <label className={labelClass}>Portfolio / Website</label>
                  <input
                    name="portfolio_url"
                    type="url"
                    className={inputClass}
                    placeholder="https://..."
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[#071B49]">
                Application
              </h3>

              <div className="mt-5 space-y-5">
                <div>
                  <label className={labelClass}>Cover Letter</label>
                  <textarea
                    name="cover_letter"
                    rows={7}
                    className={inputClass}
                    placeholder="Tell us why you are interested in this position and why you would be a good fit."
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    Additional Information
                  </label>
                  <textarea
                    name="additional_information"
                    rows={5}
                    className={inputClass}
                    placeholder="Anything else you would like CURA to know?"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[#071B49]">
                Supporting Documents
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Upload your CV and any other supporting documents relevant to
                your application.
              </p>

              <input
                name="documents"
                type="file"
                multiple
                onChange={(event) => handleFiles(event.target.files)}
                className="mt-4 block w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm"
              />

              {files.length > 0 && (
                <div className="mt-4 space-y-4">
                  <p className="text-sm font-semibold text-[#071B49]">
                    Selected documents ({files.length}/10)
                  </p>

                  {files.map((file, index) => (
                    <div
                      key={`${file.name}-${file.size}-${index}`}
                      className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                    >
                      <p className="text-sm font-semibold text-[#071B49]">
                        {index + 1}. {file.name}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {Math.round(file.size / 1024)} KB
                      </p>

                      <label className="mt-3 block text-xs font-semibold text-[#071B49]">
                        Description of this document
                      </label>

                      <textarea
                        value={fileDescriptions[index] || ""}
                        onChange={(event) =>
                          updateFileDescription(index, event.target.value)
                        }
                        rows={2}
                        className={`${inputClass} mt-2`}
                        placeholder="Briefly describe this document, e.g. Bachelor's degree certificate"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-slate-200 pt-6">
              <p className="text-xs leading-6 text-slate-500">
                By submitting this application, you confirm that the
                information provided is accurate and may be used by CURA for
                recruitment purposes.
              </p>

              <button
                type="submit"
                disabled={submitting}
                className="mt-6 inline-flex items-center rounded-lg bg-[#071B49] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#0B2A55] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Submitting Application..." : "Submit Application"}
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  )
}
