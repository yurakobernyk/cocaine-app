import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Støtte — RUSinfo",
  description: "Self-help for people who use cocaine. By RUSinfo / Velferdsetaten Oslo.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Støtte",
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#eef8ef",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="no" className={`${inter.variable} h-full antialiased`}>
      <body className="h-full overflow-hidden bg-m2-bg">
        {/* Mobile shell: constrain to phone viewport */}
        <div className="relative mx-auto h-full w-full max-w-[430px] overflow-hidden shadow-2xl">
          {children}
        </div>
      </body>
    </html>
  );
}
