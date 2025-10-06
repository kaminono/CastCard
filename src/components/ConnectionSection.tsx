'use client'

import { useI18n } from '@/contexts/I18nContext'
import './ConnectionSection.css'

interface ConnectionSectionProps {
  apiKey: string
  deviceId: string
  onApiKeyChange: (value: string) => void
  onDeviceIdChange: (value: string) => void
}

export default function ConnectionSection({
  apiKey,
  deviceId,
  onApiKeyChange,
  onDeviceIdChange,
}: ConnectionSectionProps) {
  const { t } = useI18n()

  return (
    <section className="card">
      <h2 className="section-title">{t('section.connection')}</h2>

      <div className="field-group">
        <label htmlFor="apiKey">{t('field.apiKey')}</label>
        <input
          id="apiKey"
          type="password"
          value={apiKey}
          onChange={(e) => onApiKeyChange(e.target.value)}
          placeholder={t('field.apiKeyPlaceholder')}
          aria-required="true"
        />
      </div>

      <div className="field-group">
        <label htmlFor="deviceId">{t('field.deviceId')}</label>
        <input
          id="deviceId"
          type="text"
          value={deviceId}
          onChange={(e) => onDeviceIdChange(e.target.value)}
          placeholder={t('field.deviceIdPlaceholder')}
          aria-required="true"
        />
      </div>
    </section>
  )
}
