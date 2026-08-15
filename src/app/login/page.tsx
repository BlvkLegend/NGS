import Link from "next/link";
import { AuthShell, AuthField } from "@/components/auth-shell";

export default function LoginPage() {
  return (
    <AuthShell eyebrow="Welcome back" title="Sign in to your register account">
      <form className="space-y-4">
        <AuthField label="Email address" type="email" placeholder="you@example.com" />
        <AuthField label="Password" type="password" placeholder="••••••••" />
        <button
          type="submit"
          className="w-full rounded-full bg-forest-500 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-forest-700"
        >
          Sign in
        </button>
      </form>
      <p className="mt-6 text-[13px] text-ink-muted">
        New here?{" "}
        <Link href="/signup" className="font-medium text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink">
          Create an account
        </Link>
      </p>
    </AuthShell>
  );
}
