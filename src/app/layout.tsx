import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "./globals.css";
import { ThemeScript } from "@/components/theme-script";
import { ModeProvider } from "@/lib/mode-context";
import { LeaderboardWidget } from "@/components/leaderboard-widget";

export const metadata: Metadata = {
  metadataBase: new URL("https://ngsc.example.com"),
  title: "Nigeria Governance Scorecard: Rate your representative",
  description:
    "A structured, evidence-aware evaluation of Nigeria's elected officials. Score performance, compare to public averages, and share the record. Accountability through data.",
  icons: {
    icon: "/ngsc-logo.png",
    apple: "/ngsc-logo.png",
  },
  openGraph: {
    title: "Nigeria Governance Scorecard: Rate your representative",
    description: "Accountability through data. Nigeria Governance Scorecard.",
    images: ["/ngsc-logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="antialiased">
        <ModeProvider>
          {children}
          <LeaderboardWidget />
        </ModeProvider>
      </body>
    </html>
  );
}
