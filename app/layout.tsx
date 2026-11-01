import type { Metadata, Viewport } from "next";
import { Anton, Geist, Geist_Mono, Homemade_Apple } from "next/font/google";
import "./globals.css";
import { links, siteUrl } from "@/lib/site";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const anton = Anton({ variable: "--font-anton", subsets: ["latin"], weight: "400" });
const sign = Homemade_Apple({ variable: "--font-sign", subsets: ["latin"], weight: "400" });

const title = "Rishi Roy | Backend, AI/ML & Full-stack Developer";
const description =
  "Computer Science student building REST APIs, ML services and full-stack products with Python, FastAPI and React. 1st place Oxy-Hack, IEEE Xplore author, creator of TalentAI HRMS and SAHAJ.";

export const metadata: Metadata = {
  metadataBase: new URL(`${siteUrl}/`),
  title,
  description,
  alternates: { canonical: "./" },
  authors: [{ name: "Rishi Roy", url: links.github }],
  keywords: ["Rishi Roy", "backend developer", "FastAPI", "machine learning", "React", "portfolio"],
  openGraph: { type: "profile", title, description, url: "./", siteName: "Rishi Roy" },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0606",
};

const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Rishi Roy",
  url: siteUrl,
  email: links.email,
  jobTitle: "Computer Science Engineering student, backend and AI/ML developer",
  alumniOf: { "@type": "CollegeOrUniversity", name: "The Oxford College of Engineering" },
  sameAs: [links.github, links.linkedin, links.leetcode],
  knowsAbout: ["Python", "FastAPI", "Machine Learning", "React", "PostgreSQL", "REST APIs"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${anton.variable} ${sign.variable} antialiased`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, "\\u003c") }}
        />
        {children}
      </body>
    </html>
  );
}
