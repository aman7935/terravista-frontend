import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { QueryProvider } from "@/lib/query-provider"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ChatbotWidget } from "@/components/chatbot/chatbot-widget"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "TerraVista — Real Estate Intelligence Platform",
  description:
    "AI-powered real estate platform. Find your perfect property with intelligent search, market insights, and expert agents.",
  keywords: "real estate, property, homes, AI, TerraVista",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 pt-16">{children}</main>
            <Footer />
          </div>
          <ChatbotWidget />
        </QueryProvider>
      </body>
    </html>
  )
}
