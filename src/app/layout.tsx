import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MonFiscalFacile - Optimisation fiscale simplifiée",
  description: "Découvrez combien vous pouvez économiser sur vos impôts. Sans comptable, sans jargon. 100% légal.",
  keywords: ["optimisation fiscale", "impôts", "freelance", "micro-entrepreneur", "économies"],
  authors: [{ name: "MonFiscalFacile" }],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "MonFiscalFacile",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#10B981",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
