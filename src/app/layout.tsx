import type { Metadata } from 'next'
import { I18nProvider } from '@/contexts/I18nContext'
import { ThemeProvider } from '@/contexts/ThemeContext'
import './globals.css'

export const metadata: Metadata = {
  title: 'CastCard · 墨投',
  description: '把文字与图片，一键投到电子屏 | Send text and images to your Dot device with one click',
  keywords: 'CastCard, Dot, E-ink, Text API, Display',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body>
        <I18nProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  )
}

