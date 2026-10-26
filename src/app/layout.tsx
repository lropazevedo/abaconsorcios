import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { MotionController } from "@/components/MotionController";
import { site } from "@/data/site";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const description =
  "Conheça a ABA Consórcios. Especialistas em consórcios automotivos, atendimento consultivo, presença física e acompanhamento de ponta a ponta em Pernambuco.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "ABA Consórcios | Consórcio Automotivo em Pernambuco",
    template: "%s | ABA Consórcios",
  },
  description,
  applicationName: site.name,
  keywords: [
    "ABA Consórcios",
    "consórcio automotivo",
    "consórcio Pernambuco",
    "consórcio Recife",
    "consórcio Fiat",
    "consórcio Jeep",
    "consórcio Citroën",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: site.url,
    siteName: site.name,
    title: "ABA Consórcios | Consórcio Automotivo em Pernambuco",
    description,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "ABA Consórcios. Conquistas que te movem." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ABA Consórcios | Consórcio Automotivo em Pernambuco",
    description,
    images: ["/og.jpg"],
  },
  icons: {
    icon: [
      { url: "/brand/aba-icone-quadrado.svg", type: "image/svg+xml" },
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0B122B",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={inter.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        {children}
        <MotionController />
      </body>
    </html>
  );
}
