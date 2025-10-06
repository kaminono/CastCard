'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import zhCN from '@/locales/zh-CN.json'
import enUS from '@/locales/en-US.json'

export type Locale = 'zh-CN' | 'en-US'

const translations = {
  'zh-CN': zhCN,
  'en-US': enUS,
}

interface I18nContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string, params?: Record<string, string | number>) => string
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

function getBrowserLocale(): Locale {
  if (typeof window === 'undefined') return 'zh-CN'
  
  const browserLang = navigator.language || navigator.languages?.[0]
  
  if (browserLang?.startsWith('zh')) return 'zh-CN'
  if (browserLang?.startsWith('en')) return 'en-US'
  
  return 'zh-CN'
}

function getStoredLocale(): Locale | null {
  if (typeof window === 'undefined') return null
  const stored = sessionStorage.getItem('locale')
  return stored === 'zh-CN' || stored === 'en-US' ? stored : null
}

function setStoredLocale(locale: Locale) {
  if (typeof window === 'undefined') return
  sessionStorage.setItem('locale', locale)
}

export function I18nProvider({ children }: { children: ReactNode }) {
  // 使用固定的初始值避免 hydration 不匹配
  const [locale, setLocaleState] = useState<Locale>('zh-CN')
  const [isClient, setIsClient] = useState(false)

  // 在客户端挂载后才读取实际的语言偏好
  useEffect(() => {
    setIsClient(true)
    const storedLocale = getStoredLocale()
    const initialLocale = storedLocale || getBrowserLocale()
    if (initialLocale !== locale) {
      setLocaleState(initialLocale)
    }
  }, [])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    setStoredLocale(newLocale)
  }

  const t = (key: string, params?: Record<string, string | number>): string => {
    const keys = key.split('.')
    let value: any = translations[locale]

    for (const k of keys) {
      value = value?.[k]
      if (value === undefined) {
        console.warn(`Translation key not found: ${key}`)
        return key
      }
    }

    if (typeof value !== 'string') {
      console.warn(`Translation value is not a string: ${key}`)
      return key
    }

    // 替换参数 {param}
    if (params) {
      return value.replace(/\{(\w+)\}/g, (match, paramKey) => {
        return params[paramKey]?.toString() || match
      })
    }

    return value
  }

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
}

