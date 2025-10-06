'use client'

import { useI18n } from '@/contexts/I18nContext'
import './OperationSection.css'

interface OperationSectionProps {
  onSend: () => void
  isSending: boolean
  canSend: boolean
  remainingTime?: number
}

export default function OperationSection({
  onSend,
  isSending,
  canSend,
  remainingTime,
}: OperationSectionProps) {
  const { t } = useI18n()

  return (
    <section className="card operation-section">
      <h2 className="section-title">{t('section.operation')}</h2>

      <button
        onClick={onSend}
        disabled={isSending || !canSend}
        className="btn btn-primary send-btn"
      >
        {isSending ? '...' : t('cta.send')}
      </button>

      <div className="operation-info">
        <p className="text-secondary text-small">{t('info.rateLimit')}</p>
        {remainingTime !== undefined && remainingTime > 0 && (
          <p className="text-secondary text-small">
            {t('toast.rateLimitWait', { seconds: remainingTime.toString() })}
          </p>
        )}
      </div>
    </section>
  )
}

