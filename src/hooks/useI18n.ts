'use client'

import { useState, useEffect } from 'react'
import zhCN from '@/locales/zh-CN.json'
import enUS from '@/locales/en-US.json'

export type Locale = 'zh-CN' | 'en-US'

const translations = {
  'zh-CN': zhCN,
  'en-US': enUS,
}

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

export function useI18n() {
  const [locale, setLocaleState] = useState<Locale>(() => {
    return getStoredLocale() || getBrowserLocale()
  })

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

  return { locale, setLocale, t }
}

