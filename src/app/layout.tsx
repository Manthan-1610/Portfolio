import type { Metadata, Viewport } from "next";
import { Cinzel, EB_Garamond, Caveat } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-title",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const cinzelBanner = Cinzel({
  variable: "--font-banner",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const ebGaramond = EB_Garamond({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-handwriting",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#140D07",
};

export const metadata: Metadata = {
  title: "Manthan Mehta — Full-Stack & AI Software Engineer | The Marauder's Map",
  description:
    "Portfolio of Manthan Mehta, Full-Stack & AI Software Engineer. MS in Computer Software Engineering at Arizona State University (Graduating May 2027). Experience at Intrinsic (Google) & Prama.",
  keywords: [
    "Manthan Mehta",
    "Software Engineer",
    "Full-Stack",
    "AI Engineer",
    "Machine Learning",
    "Arizona State University",
    "Intrinsic",
    "Google",
    "React",
    "Python",
    "Next.js",
    "Portfolio",
    "Marauder's Map",
  ],
  authors: [{ name: "Manthan Mehta", url: "https://linkedin.com/in/manthan-mehta-7a341622b/" }],
  creator: "Manthan Mehta",
  openGraph: {
    title: "Manthan Mehta — Full-Stack & AI Software Engineer | The Marauder's Map",
    description:
      "MS Computer Software Engineering at ASU (May 2027). Software Engineer Intern at Intrinsic (AI Robotics at Google) & Prama. Explore the Marauder's Map portfolio.",
    type: "website",
    locale: "en_US",
    siteName: "Manthan Mehta Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Manthan Mehta — Full-Stack & AI Software Engineer",
    description: "MS Computer Software Engineering at ASU | Graduating May 2027",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Manthan Mehta",
    jobTitle: "Full-Stack & AI Software Engineer",
    worksFor: {
      "@type": "Organization",
      name: "Intrinsic (An AI Robotics Company at Google)",
    },
    alumniOf: [
      {
        "@type": "EducationalOrganization",
        name: "Arizona State University",
        degree: "Master of Science in Computer Software Engineering",
      },
      {
        "@type": "EducationalOrganization",
        name: "Ganpat University",
        degree: "Bachelor of Technology in Information Technology",
      },
    ],
    knowsAbout: [
      "Full-Stack Web Development",
      "Generative AI",
      "Agentic Systems",
      "Gemini LLMs",
      "Python",
      "TypeScript",
      "React",
      "Next.js",
      "Robotics",
    ],
    sameAs: [
      "https://github.com/Manthan-1610",
      "https://linkedin.com/in/manthan-mehta-7a341622b/",
    ],
  };

  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${cinzelBanner.variable} ${ebGaramond.variable} ${caveat.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full bg-[#140D07] text-[#2A1810] selection:bg-[#C5A55A]/30 selection:text-[#2A1810]">
        {children}
      </body>
    </html>
  );
}
