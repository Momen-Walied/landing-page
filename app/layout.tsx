import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/navbar'
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })


export const metadata: Metadata = {
  title: 'Gradies - Empowering Research with AI',
  description: 'Gradies transforms your workflow using intelligent tools built for researchers, startups, and innovators.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-black text-white`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
          storageKey="camit-theme"
        >
            <Navbar />
            {children}
            <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
