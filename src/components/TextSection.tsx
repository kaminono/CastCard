'use client'

import { useI18n } from '@/contexts/I18nContext'
import { useRef, useState } from 'react'
import { processIconImage, validateLink } from '@/utils/imageProcessor'
import './TextSection.css'

interface TextSectionProps {
  title: string
  message: string
  signature: string
  refreshNow: boolean
  icon: string // Base64 字符串
  link: string
  onTitleChange: (value: string) => void
  onMessageChange: (value: string) => void
  onSignatureChange: (value: string) => void
  onRefreshNowChange: (value: boolean) => void
  onIconChange: (base64: string) => void
  onLinkChange: (value: string) => void
}

export default function TextSection({
  title,
  message,
  signature,
  refreshNow,
  icon,
  link,
  onTitleChange,
  onMessageChange,
  onSignatureChange,
  onRefreshNowChange,
  onIconChange,
  onLinkChange,
}: TextSectionProps) {
  const { t } = useI18n()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [iconPreview, setIconPreview] = useState<string>('') // data URL for preview
  const [iconError, setIconError] = useState<string>('')
  const [linkError, setLinkError] = useState<string>('')
  const [isProcessing, setIsProcessing] = useState(false)

  // 处理文件选择
  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsProcessing(true)
    setIconError('')

    try {
      const result = await processIconImage(file)
      setIconPreview(result.dataUrl)
      onIconChange(result.base64)
    } catch (error) {
      console.error('Icon processing error:', error)
      setIconError(t('error.icon.invalid'))
      onIconChange('')
      setIconPreview('')
    } finally {
      setIsProcessing(false)
    }
  }

  // 移除图标
  const handleRemoveIcon = () => {
    onIconChange('')
    setIconPreview('')
    setIconError('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  // 处理拖拽
  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault()
    event.stopPropagation()
  }

  const handleDrop = async (event: React.DragEvent) => {
    event.preventDefault()
    event.stopPropagation()

    const file = event.dataTransfer.files?.[0]
    if (!file) return

    setIsProcessing(true)
    setIconError('')

    try {
      const result = await processIconImage(file)
      setIconPreview(result.dataUrl)
      onIconChange(result.base64)
    } catch (error) {
      console.error('Icon processing error:', error)
      setIconError(t('error.icon.invalid'))
      onIconChange('')
      setIconPreview('')
    } finally {
      setIsProcessing(false)
    }
  }

  // 验证 link
  const handleLinkBlur = () => {
    if (link && !validateLink(link)) {
      setLinkError(t('error.link.invalid'))
    } else {
      setLinkError('')
    }
  }

  // 有效的 link 错误状态
  const hasLinkError = link.trim() !== '' && !validateLink(link)

  return (
    <section className="card">
      <h2 className="section-title">{t('section.text')}</h2>

      <div className="field-group">
        <label htmlFor="title">{t('field.title')}</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder={t('field.titlePlaceholder')}
        />
      </div>

      <div className="field-group">
        <label htmlFor="message">{t('field.message')}</label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => onMessageChange(e.target.value)}
          placeholder={t('field.messagePlaceholder')}
          rows={4}
          aria-required="true"
        />
      </div>

      <div className="field-group">
        <label htmlFor="signature">{t('field.signature')}</label>
        <input
          id="signature"
          type="text"
          value={signature}
          onChange={(e) => onSignatureChange(e.target.value)}
          placeholder={t('field.signaturePlaceholder')}
        />
      </div>

      {/* Icon 字段 */}
      <div className="field-group">
        <label htmlFor="icon">{t('field.icon')}</label>
        <div className="icon-input-container">
          <div
            className="icon-upload-area"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              id="icon"
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              style={{ display: 'none' }}
            />
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={isProcessing}
            >
              {isProcessing ? t('info.processing') : t('cta.selectIcon')}
            </button>
            <span className="text-secondary text-small">{t('info.iconDragHint')}</span>
          </div>

          {iconPreview && (
            <div className="icon-preview-container">
              <img src={iconPreview} alt="Icon preview" className="icon-preview" />
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={handleRemoveIcon}
              >
                {t('cta.removeIcon')}
              </button>
            </div>
          )}
        </div>
        <p className="text-secondary text-small mt-1">{t('info.iconHint')}</p>
        {iconError && <p className="error-message">{iconError}</p>}
      </div>

      {/* Link 字段 */}
      <div className="field-group">
        <label htmlFor="link">{t('field.link')}</label>
        <input
          id="link"
          type="text"
          value={link}
          onChange={(e) => onLinkChange(e.target.value)}
          onBlur={handleLinkBlur}
          placeholder={t('field.linkPlaceholder')}
          className={hasLinkError ? 'input-error' : ''}
          aria-invalid={hasLinkError}
        />
        <p className="text-secondary text-small mt-1">{t('info.linkHint')}</p>
        {linkError && <p className="error-message">{linkError}</p>}
      </div>

      <div className="field-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={refreshNow}
            onChange={(e) => onRefreshNowChange(e.target.checked)}
            aria-describedby="refreshNowHint"
          />
          <span>{t('field.refreshNow')}</span>
        </label>
        <p id="refreshNowHint" className="text-secondary text-small mt-1">
          {t('info.refreshNowHint')}
        </p>
      </div>
    </section>
  )
}
