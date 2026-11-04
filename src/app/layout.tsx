import type { Metadata, Viewport } from "next";
import { IM_Fell_English, IM_Fell_English_SC, EB_Garamond, Mrs_Saint_Delafield, Cedarville_Cursive } from "next/font/google";
import "./globals.css";

const fell = IM_Fell_English({ variable: "--nf-fell", subsets: ["latin"], weight: "400", style: ["normal", "italic"] });
const fellSC = IM_Fell_English_SC({ variable: "--nf-fell-sc", subsets: ["latin"], weight: "400" });
const garamond = EB_Garamond({ variable: "--nf-garamond", subsets: ["latin"], style: ["normal", "italic"] });
const script = Mrs_Saint_Delafield({ variable: "--nf-script", subsets: ["latin"], weight: "400" });
const hand = Cedarville_Cursive({ variable: "--nf-hand", subsets: ["latin"], weight: "400" });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#efe1c1",
};

const description =
  "Manthan Mehta — Full-Stack & AI Software Engineer. MS Software Engineering at Arizona State University (May 2027). AI Integration Engineer at ASU MeshLabs, previously Software Engineer Intern at Intrinsic (Google).";

export const metadata: Metadata = {
  title: "Manthan Mehta — Full-Stack & AI Software Engineer",
  description,
  keywords: [
    "Manthan Mehta",
    "Software Engineer",
    "AI Engineer",
    "Full-Stack",
    "Arizona State University",
    "Intrinsic",
    "Google",
    "New Grad 2027",
    "Portfolio",
  ],
  authors: [{ name: "Manthan Mehta", url: "https://linkedin.com/in/manthan-mehta-7a341622b/" }],
  creator: "Manthan Mehta",
  openGraph: {
    title: "The Map of Manthan Mehta",
    description,
    type: "website",
    locale: "en_US",
    siteName: "Manthan Mehta",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Map of Manthan Mehta",
    description,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Manthan Mehta",
  jobTitle: "Full-Stack & AI Software Engineer",
  alumniOf: [
    { "@type": "EducationalOrganization", name: "Arizona State University" },
    { "@type": "EducationalOrganization", name: "Ganpat University" },
  ],
  knowsAbout: ["Generative AI", "Agentic systems", "Full-stack development", "Python", "TypeScript", "React", "Robotics", "VR"],
  sameAs: ["https://github.com/Manthan-1610", "https://linkedin.com/in/manthan-mehta-7a341622b/"],
};

// Runs before first paint: marks JS as available (so ink can start hidden and
// fade in) and lets anyone who opened the map in the last 30 days skip the oath.
const bootScript = `(function(){var d=document.documentElement;d.classList.add('js');try{var t=+localStorage.getItem('sworn');if(t&&Date.now()-t<2592e6){d.classList.add('sworn','sworn-init');return}}catch(e){}d.classList.add('sealed')})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fell.variable} ${fellSC.variable} ${garamond.variable} ${script.variable} ${hand.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <link rel="preload" href="/textures/paper.webp" as="image" type="image/webp" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        {/* Shared ink filters: a gentle wobble that makes vector lines look hand-drawn. */}
        <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
          <defs>
            <filter id="wobble" x="-5%" y="-5%" width="110%" height="110%">
              <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="7" result="n" />
              <feDisplacementMap in="SourceGraphic" in2="n" scale="2.6" xChannelSelector="R" yChannelSelector="G" />
            </filter>
            <filter id="wobble-strong" x="-5%" y="-5%" width="110%" height="110%">
              <feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="2" seed="3" result="n" />
              <feDisplacementMap in="SourceGraphic" in2="n" scale="4" xChannelSelector="R" yChannelSelector="G" />
            </filter>
            <filter id="stamp-grain" x="0" y="0" width="100%" height="100%">
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="11" result="g" />
              <feColorMatrix in="g" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -2.2 1.35" result="m" />
              <feComposite in="SourceGraphic" in2="m" operator="in" />
            </filter>
          </defs>
        </svg>
        {children}
      </body>
    </html>
  );
}
