import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import { AssistantProvider } from "@/components/assistant/context";
import { AssistantPanel } from "@/components/assistant/assistant-panel";
import { WhatsAppFloatButton } from "@/components/assistant/whatsapp-float-button";
import { AuroraBackground } from "@/components/motion/aurora-background";

import "./globals.css";

const siteUrl = "https://quantumbatteries.bo";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Quantum Batteries Bolivia | Soluciones Energéticas Industriales",
    template: "%s | Quantum Batteries Bolivia",
  },
  description:
    "Resolvemos desafíos energéticos de industria, logística, minería, manufactura y agroindustria con soluciones de almacenamiento en litio diseñadas a medida — solar, montacargas, electromovilidad y proyectos a medida, con acompañamiento durante toda la vida útil.",
  keywords: [
    "soluciones energéticas industriales Bolivia",
    "almacenamiento de energía a medida",
    "baterías de litio Bolivia",
    "ingeniería energética",
    "BMS inteligente",
    "conversión a litio",
    "LiFePO4",
    "baterías solares industriales",
    "baterías montacargas",
    "electromovilidad Bolivia",
  ],
  authors: [{ name: "Quantum Batteries Bolivia" }],
  openGraph: {
    type: "website",
    locale: "es_BO",
    url: siteUrl,
    siteName: "Quantum Batteries Bolivia",
    title: "Cuéntanos qué necesitas. Diseñamos tu solución energética.",
    description:
      "Soluciones de almacenamiento en litio diseñadas a medida para industria, logística, minería, manufactura y agroindustria — con acompañamiento durante toda la vida útil de la batería.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Quantum Batteries Bolivia | Soluciones Energéticas Industriales",
    description:
      "Soluciones de almacenamiento en litio diseñadas a medida para tu operación, con acompañamiento durante toda la vida útil de la batería.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#05070D",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans text-foreground">
        <AuroraBackground fixed />
        <AssistantProvider>
          <div className="relative z-10">{children}</div>
          <AssistantPanel />
          <WhatsAppFloatButton />
        </AssistantProvider>
      </body>
    </html>
  );
}
