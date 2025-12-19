import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ThemeProvider } from "@/components/providers/theme-provider"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Plandata – Extrahera data från byggritningar med AI",
    template: "%s | Plandata",
  },
  description:
    "Ladda upp bygglovsritningar och få automatiskt ut rumsytor, fönster, dörrar och vägglängder i Excel. Spara timmar på varje kalkyl. Testa gratis.",
  keywords: [
    "byggritning",
    "planritning",
    "kalkyl",
    "mängdberäkning",
    "bygglov",
    "AI",
    "OCR",
    "Excel",
    "BTA",
    "BOA",
    "rumsyta",
    "arkitekt",
    "byggföretag",
  ],
  authors: [{ name: "Plandata" }],
  creator: "Plandata",
  publisher: "Plandata",
  openGraph: {
    type: "website",
    locale: "sv_SE",
    url: "https://plandata.se",
    title: "Plandata – Extrahera data från byggritningar med AI",
    description:
      "Ladda upp bygglovsritningar och få automatiskt ut rumsytor, fönster, dörrar och vägglängder i Excel.",
    siteName: "Plandata",
  },
  twitter: {
    card: "summary_large_image",
    title: "Plandata – Extrahera data från byggritningar med AI",
    description:
      "Ladda upp bygglovsritningar och få automatiskt ut rumsytor, fönster, dörrar och vägglängder i Excel.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="sv" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
