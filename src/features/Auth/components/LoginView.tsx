"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Lock,
  Mail,
  User,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowRight,
  Check,
  AlertCircle,
  Sparkles,
  ChevronRight,
  Loader2,
  KeyRound,
  ShieldAlert,
} from "lucide-react";
import { CornerOrnament } from "@/features/Blog/components/CornerOrnament";



export default function LoginView() {
  const router = useRouter();
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Form states
  const [email, setEmail] = useState("");
  const [rsn, setRsn] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Forgot password modal
  const [forgotModal, setForgotModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!email.trim() || !password.trim()) {
      setMessage({ type: "error", text: "Please provide both your email and password." });
      return;
    }

    if (authMode === "register") {
      if (password !== confirmPassword) {
        setMessage({ type: "error", text: "Passwords do not match." });
        return;
      }
      if (password.length < 6) {
        setMessage({ type: "error", text: "Password must be at least 6 characters long." });
        return;
      }
    }

    setLoading(true);

    // Simulate authentication processing
    setTimeout(() => {
      setLoading(false);
      if (authMode === "login") {
        setMessage({
          type: "success",
          text: "Login successful! Welcome back to SECNX. Redirecting...",
        });
        setTimeout(() => {
          router.push("/");
        }, 1200);
      } else {
        setMessage({
          type: "success",
          text: "Account registered successfully! You can now log in.",
        });
        setAuthMode("login");
        setPassword("");
        setConfirmPassword("");
      }
    }, 1200);
  };


  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail.trim() || !/^\S+@\S+\.\S+$/.test(resetEmail.trim())) {
      return;
    }
    setResetSent(true);
    setTimeout(() => {
      setResetSent(false);
      setForgotModal(false);
      setResetEmail("");
      setMessage({
        type: "success",
        text: "Password reset instructions sent to your email.",
      });
    }, 2000);
  };

  return (
    <section className="relative overflow-hidden bg-[#03060a] pt-12 pb-24 font-[family-name:var(--font-inter)] text-white sm:pt-16 sm:pb-32">
      {/* Background artwork & ambient lightings */}
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
        style={{ backgroundImage: "url('/assets/footer-image.png')" }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#020609_0%,rgba(2,6,9,0.40)_20%,rgba(2,6,9,0.70)_60%,rgba(1,4,7,0.96)_100%)]" />
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 size-[640px] rounded-full bg-[#d6a43a]/14 blur-[135px]" />

      <div className="relative mx-auto max-w-[1100px] px-4 sm:px-6">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="mb-8 flex items-center justify-center gap-2 text-xs sm:text-sm text-[#8e9ca7]"
        >
          <Link href="/" className="transition-colors hover:text-[#ffd95b]">
            Home
          </Link>
          <ChevronRight className="size-3.5 text-[#425567]" />
          <span className="font-medium text-[#ffd95b]">
            {authMode === "login" ? "Sign In" : "Register"}
          </span>
        </nav>

        {/* Card Container */}
        <div className="mx-auto max-w-lg">
          <div className="relative overflow-hidden rounded-2xl border border-[#d6a43a]/60 bg-[#090e17]/95 p-7 sm:p-10 shadow-[0_24px_65px_rgba(0,0,0,0.92),inset_0_1px_1px_rgba(214,164,58,0.3)] backdrop-blur-md">
            <CornerOrnament position="tl" />
            <CornerOrnament position="tr" />
            <CornerOrnament position="bl" />
            <CornerOrnament position="br" />

            {/* Header Ornament */}
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center gap-3 mb-2">
                <span className="h-px w-10 sm:w-14 bg-[linear-gradient(90deg,transparent,#d6a43a)] opacity-70" />
                <span className="text-[#ffd95b] text-base font-serif">◇</span>
                <span className="h-px w-10 sm:w-14 bg-[linear-gradient(90deg,#d6a43a,transparent)] opacity-70" />
              </div>

              <h1 className="font-[family-name:var(--font-eb-garamond)] text-3xl sm:text-4xl font-bold uppercase tracking-[0.12em] text-[#ffda5d] drop-shadow-[0_2px_14px_rgba(214,164,58,0.5)]">
                {authMode === "login" ? "Welcome Back" : "Create Account"}
              </h1>
              <p className="mt-2 text-xs sm:text-sm text-[#8e9ca7]">
                {authMode === "login"
                  ? "Access your live order delivery, trade tracking, and member perks."
                  : "Join thousands of verified RuneScape traders on SECNX."}
              </p>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="mt-7 grid grid-cols-2 rounded-xl border border-[#223340] bg-[#060c13] p-1.5">
              <button
                type="button"
                onClick={() => {
                  setAuthMode("login");
                  setMessage(null);
                }}
                className={`rounded-lg py-2 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  authMode === "login"
                    ? "bg-[linear-gradient(180deg,#d49320_0%,#b87412_100%)] text-white shadow-[0_2px_10px_rgba(214,147,32,0.45)]"
                    : "text-[#8e9ca7] hover:text-white"
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthMode("register");
                  setMessage(null);
                }}
                className={`rounded-lg py-2 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  authMode === "register"
                    ? "bg-[linear-gradient(180deg,#d49320_0%,#b87412_100%)] text-white shadow-[0_2px_10px_rgba(214,147,32,0.45)]"
                    : "text-[#8e9ca7] hover:text-white"
                }`}
              >
                Register
              </button>
            </div>

            {/* Notification alert */}
            {message && (
              <div
                className={`mt-5 flex items-start gap-2.5 rounded-xl border p-3.5 text-xs sm:text-sm ${
                  message.type === "success"
                    ? "border-[#00e676]/40 bg-[#00e676]/10 text-[#00e676]"
                    : "border-red-500/40 bg-red-500/10 text-red-400"
                }`}
              >
                {message.type === "success" ? (
                  <Check className="size-4 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="size-4 shrink-0 mt-0.5" />
                )}
                <span>{message.text}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {/* Optional RSN for register */}
              {authMode === "register" && (
                <div>
                  <label
                    htmlFor="rsn-input"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#cbd6dc] mb-1.5"
                  >
                    RuneScape Username (RSN) <span className="text-[#8e9ca7] font-normal">(Optional)</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[#7d8e9c]" />
                    <input
                      id="rsn-input"
                      type="text"
                      value={rsn}
                      onChange={(e) => setRsn(e.target.value)}
                      placeholder="e.g. Zezima"
                      className="h-11 w-full rounded-xl border border-[#223340] bg-[#050a10] pl-10 pr-4 text-xs sm:text-sm text-white placeholder-[#5c6c7b] focus:border-[#d6a43a] focus:outline-none focus:ring-1 focus:ring-[#d6a43a]/60"
                    />
                  </div>
                </div>
              )}

              {/* Email Input */}
              <div>
                <label
                  htmlFor="email-input"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#cbd6dc] mb-1.5"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[#7d8e9c]" />
                  <input
                    id="email-input"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="trader@secnx.com"
                    className="h-11 w-full rounded-xl border border-[#223340] bg-[#050a10] pl-10 pr-4 text-xs sm:text-sm text-white placeholder-[#5c6c7b] focus:border-[#d6a43a] focus:outline-none focus:ring-1 focus:ring-[#d6a43a]/60"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="password-input"
                    className="text-xs font-semibold uppercase tracking-wider text-[#cbd6dc]"
                  >
                    Password
                  </label>
                  {authMode === "login" && (
                    <button
                      type="button"
                      onClick={() => setForgotModal(true)}
                      className="text-xs font-semibold text-[#ffd95b] hover:underline cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[#7d8e9c]" />
                  <input
                    id="password-input"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="h-11 w-full rounded-xl border border-[#223340] bg-[#050a10] pl-10 pr-10 text-xs sm:text-sm text-white placeholder-[#5c6c7b] focus:border-[#d6a43a] focus:outline-none focus:ring-1 focus:ring-[#d6a43a]/60"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#7d8e9c] hover:text-white cursor-pointer"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password for register */}
              {authMode === "register" && (
                <div>
                  <label
                    htmlFor="confirm-password-input"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#cbd6dc] mb-1.5"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[#7d8e9c]" />
                    <input
                      id="confirm-password-input"
                      type={showPassword ? "text" : "password"}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="h-11 w-full rounded-xl border border-[#223340] bg-[#050a10] pl-10 pr-4 text-xs sm:text-sm text-white placeholder-[#5c6c7b] focus:border-[#d6a43a] focus:outline-none focus:ring-1 focus:ring-[#d6a43a]/60"
                    />
                  </div>
                </div>
              )}

              {/* Remember Me */}
              {authMode === "login" && (
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="size-4 rounded border-[#2c3e4e] bg-[#070e16] text-[#d6a43a] accent-[#d6a43a] focus:ring-0"
                    />
                    <span className="text-xs text-[#8e9ca7]">
                      Keep me signed in on this device
                    </span>
                  </label>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[linear-gradient(180deg,#d49320_0%,#b87412_100%)] text-xs sm:text-sm font-bold tracking-wider text-white shadow-[0_4px_18px_rgba(214,147,32,0.4)] transition-all duration-200 hover:bg-[linear-gradient(180deg,#e5a530_0%,#c7831d_100%)] hover:shadow-[0_6px_22px_rgba(214,147,32,0.55)] active:scale-[0.99] disabled:opacity-60 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    <span>AUTHENTICATING...</span>
                  </>
                ) : (
                  <>
                    <span>
                      {authMode === "login" ? "SIGN IN TO SECNX" : "CREATE MY ACCOUNT"}
                    </span>
                    <ArrowRight className="size-4" />
                  </>
                )}
              </button>
            </form>


            {/* RuneScape Security Note */}
            <div className="mt-7 rounded-xl border border-[#d6a43a]/25 bg-[linear-gradient(145deg,rgba(214,164,58,0.06),transparent)] p-3.5">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="size-4.5 shrink-0 text-[#ffd95b] mt-0.5" />
                <div className="text-[11px] leading-relaxed text-[#8e9ca7]">
                  <strong className="text-[#ffd95b]">Security Notice:</strong> Never enter your official Jagex or RuneScape in-game password. SECNX uses its own isolated encryption protocols.
                </div>
              </div>
            </div>

            {/* Toggle Footer */}
            <div className="mt-6 text-center text-xs text-[#8e9ca7]">
              {authMode === "login" ? (
                <>
                  Don&apos;t have an account yet?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode("register");
                      setMessage(null);
                    }}
                    className="font-bold text-[#ffd95b] hover:underline cursor-pointer"
                  >
                    Register free
                  </button>
                </>
              ) : (
                <>
                  Already registered?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode("login");
                      setMessage(null);
                    }}
                    className="font-bold text-[#ffd95b] hover:underline cursor-pointer"
                  >
                    Sign in here
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {forgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-2xl border border-[#d6a43a]/60 bg-[#090d16] p-6 sm:p-8 shadow-[0_24px_60px_rgba(0,0,0,0.95)]">
            <CornerOrnament position="tl" />
            <CornerOrnament position="tr" />
            <CornerOrnament position="bl" />
            <CornerOrnament position="br" />

            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full border border-[#d6a43a]/50 bg-[#d6a43a]/15 text-[#ffd95b]">
                <KeyRound className="size-5" />
              </div>
              <div>
                <h3 className="font-[family-name:var(--font-eb-garamond)] text-2xl font-bold text-[#ffda5d]">
                  Reset Password
                </h3>
                <p className="text-xs text-[#8e9ca7]">
                  Enter your email to receive recovery instructions.
                </p>
              </div>
            </div>

            <form onSubmit={handleResetPassword} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#cbd6dc] mb-1.5">
                  Your Account Email
                </label>
                <input
                  type="email"
                  required
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="trader@secnx.com"
                  className="h-11 w-full rounded-xl border border-[#223340] bg-[#050a10] px-4 text-xs sm:text-sm text-white placeholder-[#5c6c7b] focus:border-[#d6a43a] focus:outline-none focus:ring-1 focus:ring-[#d6a43a]"
                />
              </div>

              {resetSent && (
                <div className="flex items-center gap-2 rounded-lg bg-[#00e676]/10 p-2.5 text-xs text-[#00e676]">
                  <Check className="size-4 shrink-0" />
                  <span>Recovery link sent! Check your inbox.</span>
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setForgotModal(false)}
                  className="rounded-lg border border-[#223340] bg-[#101b26] px-4 py-2 text-xs font-semibold text-[#8e9ca7] hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-[linear-gradient(180deg,#d49320_0%,#b87412_100%)] px-5 py-2 text-xs font-bold text-white shadow-md hover:bg-[linear-gradient(180deg,#e5a530_0%,#c7831d_100%)] cursor-pointer"
                >
                  Send Recovery Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
