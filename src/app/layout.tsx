// This is the root layout component for your Next.js app.
// Learn more: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required

import { Bangers } from 'next/font/google'

import { cn } from '@/lib/utils'
import './globals.css'
import { Head } from 'next/document'

const fontHeading = Bangers({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
  weight: '400'
})


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
       <head>
       <link rel="icon" href="/favicon.ico" />
       </head>
      <body
        className={cn(
          'antialiased',
          fontHeading.variable,
        )}
      >
        {children}
      </body>
    </html>
  )
}