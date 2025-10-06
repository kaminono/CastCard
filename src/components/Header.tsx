'use client'

import { useI18n, Locale } from '@/contexts/I18nContext'
import { useTheme, Theme } from '@/contexts/ThemeContext'
import './Header.css'

export default function Header() {
  const { locale, setLocale, t } = useI18n()
  const { theme, setTheme } = useTheme()

  return (
    <header className="app-header">
      <div className="container">
        <div className="header-content">
          <div className="header-brand">
            <h1 className="header-title">{t('app.title')}</h1>
            <p className="header-subtitle">{t('app.subtitle')}</p>
          </div>

          <div className="header-controls">
            {/* 语言切换器 */}
            <select
              value={locale}
              onChange={(e) => setLocale(e.target.value as Locale)}
              className="control-select"
              aria-label="Language selector"
            >
              <option value="zh-CN">{t('language.zh-CN')}</option>
              <option value="en-US">{t('language.en-US')}</option>
            </select>

            {/* 主题切换器 */}
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value as Theme)}
              className="control-select"
              aria-label="Theme selector"
            >
              <option value="system">{t('theme.system')}</option>
              <option value="light">{t('theme.light')}</option>
              <option value="dark">{t('theme.dark')}</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  )
}

