'use client'

import { useI18n } from '@/contexts/I18nContext'
import './ResponseSection.css'

interface ResponseData {
  httpStatus: number
  code: number
  message: string
  result?: any
  timestamp: string
}

interface ResponseSectionProps {
  response: ResponseData | null
  error: {
    status: number
    title: string
    message: string
    suggestion: string
  } | null
}

export default function ResponseSection({ response, error }: ResponseSectionProps) {
  const { t } = useI18n()

  const renderResponse = () => {
    if (!response && !error) {
      return (
        <p className="text-secondary text-small">
          {t('section.response')}
        </p>
      )
    }

    if (error) {
      return (
        <div className="error-box">
          <div className="error-header">
            <span className="error-code">HTTP {error.status}</span>
            <span className="error-title">{error.title}</span>
          </div>
          <p className="error-message">{error.message}</p>
          <p className="error-suggestion">{error.suggestion}</p>
          <a
            href="https://dot.mindreset.tech"
            target="_blank"
            rel="noopener noreferrer"
            className="error-link"
          >
            {t('cta.viewDocs')} →
          </a>
        </div>
      )
    }

    if (response) {
      const isSuccess = response.code === 200
      return (
        <div className={`response-box ${isSuccess ? 'response-success' : 'response-error'}`}>
          <div className="response-header">
            <span className="response-label">HTTP {response.httpStatus}</span>
            <span className="response-label">{t('response.code')}: {response.code}</span>
            <span className="response-time">{response.timestamp}</span>
          </div>
          <div className="response-content">
            <div className="response-field">
              <strong>{t('response.message')}:</strong> {response.message}
            </div>
            {response.result && (
              <div className="response-field">
                <strong>{t('response.result')}:</strong>
                <pre>{JSON.stringify(response.result, null, 2)}</pre>
              </div>
            )}
          </div>
        </div>
      )
    }
  }

  return (
    <section className="card">
      <h2 className="section-title">{t('section.response')}</h2>
      {renderResponse()}
    </section>
  )
}

