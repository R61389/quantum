import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import { AssistantProvider } from "@/components/assistant/context";
import { AssistantPanel } from "@/components/assistant/assistant-panel";
import { WhatsAppFloatButton } from "@/components/assistant/whatsapp-float-button";

import "./globals.css";

const siteUrl = "https://quantumbatteries.bo";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Quantum Batteries Bolivia | Ingeniería de Litio de Alto Rendimiento",
    template: "%s | Quantum Batteries Bolivia",
  },
  description:
    "Diseñamos, ensamblamos y modernizamos baterías de litio de alto rendimiento para aplicaciones industriales, sistemas UPS, energía solar, montacargas y soluciones energéticas especializadas en Bolivia.",
  keywords: [
    "baterías de litio Bolivia",
    "ingeniería energética",
    "BMS inteligente",
    "conversión a litio",
    "LiFePO4",
    "baterías UPS",
    "baterías solares",
    "baterías montacargas",
    "almacenamiento energético",
  ],
  authors: [{ name: "Quantum Batteries Bolivia" }],
  openGraph: {
    type: "website",
    locale: "es_BO",
    url: siteUrl,
    siteName: "Quantum Batteries Bolivia",
    title: "Ingeniería de Litio para el Futuro Energético de Bolivia",
    description:
      "Diseño, ensamblaje y modernización de baterías de litio de alto rendimiento: industrial, UPS, solar, montacargas y soluciones a medida.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Quantum Batteries Bolivia | Ingeniería de Litio",
    description:
      "Diseño, ensamblaje y modernización de baterías de litio de alto rendimiento para Bolivia.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#00205B",
  colorScheme: "light",
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
        <AssistantProvider>
          {children}
          <AssistantPanel />
          <WhatsAppFloatButton />
        </AssistantProvider>
      </body>
    </html>
  );
}
