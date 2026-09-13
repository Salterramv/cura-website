 "use client"

import { FormEvent, useRef, useState } from "react"

type CareerApplicationFormProps = {
  careerId: string
  careerTitle: string
  closingDate: string | null
}

type EducationEntry = {
  qualification: string
  institute: string
  startYear: string
  graduatedYear: string
}

type ExperienceEntry = {
  designation: string
  employer: string
  startYear: string
  endYear: string
  currentlyWorking: boolean
  reasonForLeaving: string
}

const inputClass =
  "w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-[#071B49] outline-none transition focus:border-[#18B8EE] focus:ring-2 focus:ring-[#18B8EE]/20"

const labelClass = "mb-2 block text-sm font-semibold text-[#071B49]"

const emptyEducation = (): EducationEntry => ({
  qualification: "",
  institute: "",
  startYear: "",
  graduatedYear: "",
})

const emptyExperience = (): ExperienceEntry => ({
  designation: "",
  employer: "",
  startYear: "",
  endYear: "",
  currentlyWorking: false,
  reasonForLeaving: "",
})

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
  const [profilePicture, setProfilePicture] = useState<File | null>(null)
  const [educationEntries, setEducationEntries] = useState<EducationEntry[]>([
    emptyEducation(),
  ])
  const [experienceEntries, setExperienceEntries] = useState<ExperienceEntry[]>([
    emptyExperience(),
  ])

  const fileInputRef = useRef<HTMLInputElement>(null)
  const profilePictureInputRef = useRef<HTMLInputElement>(null)

  const applicationClosed =
    !!closingDate &&
    new Date(`${closingDate}T23:59:59+05:00`).getTime() < Date.now()

  function handleFiles(selected: FileList | null) {
    if (!selected || selected.length === 0) return

    const incomingFiles = Array.from(selected)

    if (files.length + incomingFiles.length > 10) {
      setError(
        `You can upload a maximum of 10 documents. You currently have ${files.length} document${files.length === 1 ? "" : "s"}.`,
      )
      return
    }

    setFiles((current) => [...current, ...incomingFiles])
    setFileDescriptions((current) => [
      ...current,
      ...incomingFiles.map(() => ""),
    ])
    setError("")

    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  function removeFile(index: number) {
    setFiles((current) => current.filter((_, fileIndex) => fileIndex !== index))
    setFileDescriptions((current) =>
      current.filter((_, descriptionIndex) => descriptionIndex !== index),
    )
  }

  function updateFileDescription(index: number, description: string) {
    setFileDescriptions((current) => {
      const next = [...current]
      next[index] = description
      return next
    })
  }

  function updateEducation(
    index: number,
    field: keyof EducationEntry,
    value: string,
  ) {
    setEducationEntries((current) =>
      current.map((entry, entryIndex) =>
        entryIndex === index ? { ...entry, [field]: value } : entry,
      ),
    )
  }

  function addEducation() {
    setEducationEntries((current) => [...current, emptyEducation()])
  }

  function removeEducation(index: number) {
    setEducationEntries((current) => {
      if (current.length === 1) return current
      return current.filter((_, entryIndex) => entryIndex !== index)
    })
  }

  function updateExperience(
    index: number,
    field: keyof ExperienceEntry,
    value: string | boolean,
  ) {
    setExperienceEntries((current) =>
      current.map((entry, entryIndex) =>
        entryIndex === index ? { ...entry, [field]: value } : entry,
      ),
    )
  }

  function addExperience() {
    setExperienceEntries((current) => [...current, emptyExperience()])
  }

  function removeExperience(index: number) {
    setExperienceEntries((current) => {
      if (current.length === 1) return current
      return current.filter((_, entryIndex) => entryIndex !== index)
    })
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setSubmitting(true)
    setError("")
    setSuccess("")

    try {
      const form = event.currentTarget
      const formData = new FormData(form)

      formData.set("career_id", careerId)
      formData.delete("documents")
      formData.delete("document_descriptions")
      formData.delete("profile_picture")
      formData.delete("education_details")
      formData.delete("experience_details")

      files.forEach((file) => formData.append("documents", file))

      if (profilePicture) {
        formData.append("profile_picture", profilePicture)
      }

      formData.append(
        "document_descriptions",
        JSON.stringify(fileDescriptions),
      )

      formData.append("education_details", JSON.stringify(educationEntries))
      formData.append("experience_details", JSON.stringify(experienceEntries))

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
      setProfilePicture(null)
      setEducationEntries([emptyEducation()])
      setExperienceEntries([emptyExperience()])
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
        <p className="mt-4 leading-7 text-slate-700">{success}</p>
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
                  <input name="full_name" type="text" className={inputClass} required />
                </div>
                <div>
                  <label className={labelClass}>Email Address *</label>
                  <input name="email" type="email" className={inputClass} required />
                </div>
                <div>
                  <label className={labelClass}>Phone Number *</label>
                  <input name="phone" type="tel" className={inputClass} required />
                </div>
                <div>
                  <label className={labelClass}>National ID / ID Number</label>
                  <input name="id_number" type="text" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Date of Birth</label>
                  <input name="date_of_birth" type="date" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Current Address</label>
                  <input name="address" type="text" className={inputClass} />
                </div>
              </div>

              <div className="mt-5 max-w-sm">
                <label className={labelClass}>Profile Picture</label>
                <input
                  ref={profilePictureInputRef}
                  name="profile_picture"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={(event) => setProfilePicture(event.target.files?.[0] ?? null)}
                  className="block w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-600"
                />
                <p className="mt-2 text-xs text-slate-500">
                  Upload a recent passport-style photograph (JPG, PNG or WEBP).
                </p>
                {profilePicture && (
                  <p className="mt-2 text-xs font-medium text-[#071B49]">
                    Selected: {profilePicture.name}
                  </p>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[#071B49]">Education</h3>
              <p className="mt-2 text-sm text-slate-500">
                Add each qualification separately.
              </p>

              <div className="mt-5 space-y-4">
                {educationEntries.map((entry, index) => (
                  <div key={index} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <div className="grid gap-4 md:grid-cols-4">
                      <div>
                        <label className={labelClass}>Qualification name</label>
                        <input
                          value={entry.qualification}
                          onChange={(event) => updateEducation(index, "qualification", event.target.value)}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Institute</label>
                        <input
                          value={entry.institute}
                          onChange={(event) => updateEducation(index, "institute", event.target.value)}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Start Year</label>
                        <input
                          value={entry.startYear}
                          onChange={(event) => updateEducation(index, "startYear", event.target.value)}
                          className={inputClass}
                          inputMode="numeric"
                          placeholder="e.g. 2022"
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Graduated Year</label>
                        <input
                          value={entry.graduatedYear}
                          onChange={(event) => updateEducation(index, "graduatedYear", event.target.value)}
                          className={inputClass}
                          inputMode="numeric"
                          placeholder="e.g. 2025"
                        />
                      </div>
                    </div>

                    {educationEntries.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeEducation(index)}
                        className="mt-3 text-sm font-medium text-red-600 hover:text-red-700"
                      >
                        Remove qualification
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={addEducation}
                className="mt-4 rounded-lg border border-[#35B5E5] px-4 py-2.5 text-sm font-semibold text-[#071B49] hover:bg-[#35B5E5]/10"
              >
                + Add qualification
              </button>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[#071B49]">Experience</h3>
              <p className="mt-2 text-sm text-slate-500">
                Add your employment history, starting with your most recent role.
              </p>

              <div className="mt-5 space-y-4">
                {experienceEntries.map((entry, index) => (
                  <div key={index} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <div className="grid gap-4 md:grid-cols-4">
                      <div>
                        <label className={labelClass}>Designation</label>
                        <input
                          value={entry.designation}
                          onChange={(event) => updateExperience(index, "designation", event.target.value)}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Employer</label>
                        <input
                          value={entry.employer}
                          onChange={(event) => updateExperience(index, "employer", event.target.value)}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Start Year</label>
                        <input
                          value={entry.startYear}
                          onChange={(event) => updateExperience(index, "startYear", event.target.value)}
                          className={inputClass}
                          inputMode="numeric"
                          placeholder="e.g. 2022"
                        />
                      </div>
                      <div>
                        <label className={labelClass}>End Year</label>
                        <input
                          value={entry.endYear}
                          onChange={(event) => updateExperience(index, "endYear", event.target.value)}
                          className={inputClass}
                          inputMode="numeric"
                          placeholder="e.g. 2025"
                          disabled={entry.currentlyWorking}
                        />
                        <label className="mt-2 flex items-center gap-2 text-xs font-medium text-slate-600">
                          <input
                            type="checkbox"
                            checked={entry.currentlyWorking}
                            onChange={(event) => {
                              updateExperience(index, "currentlyWorking", event.target.checked)
                              if (event.target.checked) {
                                updateExperience(index, "endYear", "")
                              }
                            }}
                          />
                          Currently working here
                        </label>
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className={labelClass}>Reason for leaving</label>
                      <textarea
                        value={entry.reasonForLeaving}
                        onChange={(event) => updateExperience(index, "reasonForLeaving", event.target.value)}
                        rows={2}
                        className={inputClass}
                      />
                    </div>

                    {experienceEntries.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeExperience(index)}
                        className="mt-3 text-sm font-medium text-red-600 hover:text-red-700"
                      >
                        Remove experience
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={addExperience}
                className="mt-4 rounded-lg border border-[#35B5E5] px-4 py-2.5 text-sm font-semibold text-[#071B49] hover:bg-[#35B5E5]/10"
              >
                + Add experience
              </button>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[#071B49]">
                Professional Information
              </h3>
              <div className="mt-5 grid gap-5 md:grid-cols-2">
                <div>
                  <label className={labelClass}>Professional Qualifications</label>
                  <textarea
                    name="professional_qualifications"
                    rows={4}
                    className={inputClass}
                    placeholder="ACCA, CPA, professional memberships, etc."
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
                  <label className={labelClass}>Expected Salary</label>
                  <input name="expected_salary" type="text" className={inputClass} />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[#071B49]">Application</h3>
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
                  <label className={labelClass}>Additional Information</label>
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
              <h3 className="text-lg font-semibold text-[#071B49]">Supporting Documents</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Upload your CV and any other supporting documents relevant to your application.
              </p>

              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-[#071B49]">
                    Documents added: {files.length}/10
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Add up to 10 documents. You can add them one at a time.
                  </p>
                </div>
                <button
                  type="button"
                  disabled={files.length >= 10}
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex w-fit items-center rounded-lg bg-[#35B5E5] px-5 py-2.5 text-sm font-semibold text-[#071B49] transition hover:bg-[#071B49] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  + Add Document
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={(event) => handleFiles(event.target.files)}
                  className="hidden"
                />
              </div>

              {files.length > 0 && (
                <div className="mt-5 space-y-4">
                  {files.map((file, index) => (
                    <div
                      key={`${file.name}-${file.size}-${index}`}
                      className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-[#071B49]">
                            {index + 1}. {file.name}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            {Math.round(file.size / 1024)} KB
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="shrink-0 text-sm font-medium text-red-600 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>

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
                By submitting this application, you confirm that the information
                provided is accurate and may be used by CURA for recruitment purposes.
              </p>
              <button
                type="submit"
                disabled={submitting}
                className="mt-5 inline-flex items-center rounded-lg bg-[#071B49] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#168BC4] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Submitting..." : "Submit Application"}
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  )
}
