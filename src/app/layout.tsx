import type { Metadata } from "next";
import "./globals.css";
import { LenisProvider } from "@/components/LenisProvider";

export const metadata: Metadata = {
  title: "Lexus GX550 · 2026",
  description:
    "Overtrail. Overbuilt. The 2026 Lexus GX550 — a study in precision, presence, and quiet power.",
  openGraph: {
    title: "Lexus GX550 · 2026",
    description: "Overtrail. Overbuilt. The 2026 Lexus GX550.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-paper text-ink antialiased">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
