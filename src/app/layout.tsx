import type { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yeruva Mahesh Reddy | Systems, Infrastructure & Backend Engineer",
  description:
    "Personal portfolio and technical case studies of Yeruva Mahesh Reddy — Computer Science at IIIT Dharwad. Specializing in distributed systems, database internals, networked software, and AI-powered retrieval.",
  keywords: [
    "Yeruva Mahesh Reddy",
    "Systems Engineer",
    "Backend Engineer",
    "Distributed Systems",
    "Database Internals",
    "PostgreSQL GiST",
    "ParadeDB",
    "IIIT Dharwad",
    "IntelliFile",
  ],
  authors: [{ name: "Yeruva Mahesh Reddy" }],
  creator: "Yeruva Mahesh Reddy",
  openGraph: {
    title: "Yeruva Mahesh Reddy | Systems & Infrastructure Engineer",
    description:
      "Engineering the invisible: Distributed systems, database internals, networked software, and AI-powered search.",
    type: "website",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0C0B",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${inter.variable} dark`}
    >
      <body className="bg-[#0B0C0B] text-[#F1F0E8] font-sans antialiased selection:bg-[#C5FF4A] selection:text-[#0B0C0B] min-h-screen overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
