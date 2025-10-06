'use client'

import { useI18n } from '@/contexts/I18nContext'
import './Footer.css'

interface FooterProps {
  onClearData: () => void
}

export default function Footer({ onClearData }: FooterProps) {
  const { t } = useI18n()

  const handleClearClick = () => {
    if (confirm(t('toast.confirmClear'))) {
      onClearData()
    }
  }

  return (
    <footer className="app-footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-actions">
            <button
              onClick={handleClearClick}
              className="btn btn-secondary btn-sm"
            >
              {t('cta.clearData')}
            </button>
            <a
              href="https://github.com/kaminono/CastCard"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              {t('footer.opensource')}
            </a>
          </div>

          <div className="footer-info">
            <p className="footer-text">{t('footer.disclaimer')}</p>
            <p className="footer-text text-small">{t('footer.privacy')}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

