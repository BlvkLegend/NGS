import Link from "next/link";
import { AuthShell, AuthField } from "@/components/auth-shell";

export default function SignupPage() {
  return (
    <AuthShell eyebrow="Join the register" title="Create your account">
      <form className="space-y-4">
        <AuthField label="Full name" placeholder="Chidinma Okafor" />
        <AuthField label="Email address" type="email" placeholder="you@example.com" />
        <AuthField label="Password" type="password" placeholder="At least 8 characters" />
        <button
          type="submit"
          className="w-full rounded-full bg-forest-500 py-2.5 text-[14px] font-medium text-paper transition-colors hover:bg-forest-700"
        >
          Create account
        </button>
      </form>
      <p className="mt-6 text-[13px] text-ink-muted">
        Already registered?{" "}
        <Link href="/login" className="font-medium text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink">
          Sign in
        </Link>
      </p>
    </AuthShell>
  );
}
