"use client"

import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export default function AdminLoginPage() {
  const router = useRouter()
  const supabase = createClient()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setLoading(true)
    setError("")

    // Step 1: Authenticate with Supabase
    const { data, error: loginError } =
      await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      })

    if (loginError) {
      setError("Invalid email or password.")
      setLoading(false)
      return
    }

    if (!data.user) {
      setError("Unable to authenticate.")
      setLoading(false)
      return
    }

    // Step 2: Check whether the authenticated user is a CURA administrator
    const { data: isAdmin, error: adminError } =
      await supabase.rpc("is_current_user_admin")

    if (adminError) {
      console.error("Administrator check failed:", adminError)

      await supabase.auth.signOut()

      setError("Unable to verify administrator access.")
      setLoading(false)
      return
    }

    if (!isAdmin) {
      await supabase.auth.signOut()

      setError("You do not have administrator access.")
      setLoading(false)
      return
    }

    // Step 3: Administrator confirmed
    router.push("/admin")
    router.refresh()
  }

  return (
    <main className="min-h-screen bg-[#f4f7fb] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">

          {/* CURA Logo */}
          <div className="flex justify-center mb-8">
            <img
              src="/cura-logo.png"
              alt="CURA"
              className="h-16 w-auto object-contain"
            />
          </div>

          {/* Heading */}
          <div className="text-center mb-8">

            <p className="text-xs font-semibold tracking-[0.28em] text-[#19b5ed] uppercase mb-3">
              CURA Administration
            </p>

            <h1 className="text-3xl font-bold text-[#061a3a]">
              Administrator Login
            </h1>

            <p className="text-sm text-slate-500 mt-3">
              Sign in to manage CURA website content.
            </p>

          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5">

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-[#061a3a] mb-2"
              >
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Administrator email"
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-[#061a3a] outline-none transition focus:border-[#19b5ed] focus:ring-2 focus:ring-[#19b5ed]/20"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-[#061a3a] mb-2"
              >
                Password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Password"
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-[#061a3a] outline-none transition focus:border-[#19b5ed] focus:ring-2 focus:ring-[#19b5ed]/20"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[#061a3a] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#0b2a55] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-slate-400 mt-6">
          CURA · Audit · Tax · Advisory
        </p>

      </div>
    </main>
  )
}