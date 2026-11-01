import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { links, siteUrl } from "@/lib/site";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const title = "Rishi Roy | Backend, AI/ML & Full-stack Developer";
const description =
  "Computer Science student building REST APIs, ML services and full-stack products with Python, FastAPI and React. 1st place Oxy-Hack, IEEE Xplore author, creator of TalentAI HRMS and SAHAJ.";

export const metadata: Metadata = {
  metadataBase: new URL(`${siteUrl}/`),
  title,
  description,
  alternates: { canonical: "./" },
  authors: [{ name: "Rishi Roy", url: links.github }],
  keywords: [
    "Rishi Roy",
    "backend developer",
    "FastAPI",
    "machine learning",
    "React",
    "portfolio",
  ],
  openGraph: {
    type: "profile",
    title,
    description,
    url: "./",
    siteName: "Rishi Roy",
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#07080b",
};

const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Rishi Roy",
  url: siteUrl,
  email: links.email,
  jobTitle: "Computer Science Engineering student, backend and AI/ML developer",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "The Oxford College of Engineering",
  },
  sameAs: [links.github, links.linkedin, links.leetcode],
  knowsAbout: [
    "Python",
    "FastAPI",
    "Machine Learning",
    "React",
    "PostgreSQL",
    "REST APIs",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrument.variable} antialiased`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(person).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
