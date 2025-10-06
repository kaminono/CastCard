'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ConnectionSection from '@/components/ConnectionSection'
import TextSection from '@/components/TextSection'
import OperationSection from '@/components/OperationSection'
import ResponseSection from '@/components/ResponseSection'
import { useI18n } from '@/contexts/I18nContext'
import {
  getStoredApiKey,
  setStoredApiKey,
  getStoredDeviceId,
  setStoredDeviceId,
  clearAllStoredData,
} from '@/utils/storage'
import { sendTextApi, ApiError } from '@/utils/api'
import {
  canMakeRequest,
  getRemainingTime,
  updateLastRequestTime,
  resetRateLimit,
} from '@/utils/rateLimit'
import { validateLink } from '@/utils/imageProcessor'
import './page.css'

interface ResponseData {
  httpStatus: number
  code: number
  message: string
  result?: any
  timestamp: string
}

interface ErrorData {
  status: number
  title: string
  message: string
  suggestion: string
}

export default function Home() {
  const { t } = useI18n()

  // 连接区状态
  const [apiKey, setApiKey] = useState('')
  const [deviceId, setDeviceId] = useState('')

  // 文本区状态
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [signature, setSignature] = useState('')
  const [icon, setIcon] = useState('') // Base64 字符串
  const [link, setLink] = useState('')
  const [refreshNow, setRefreshNow] = useState(true)

  // 操作区状态
  const [isSending, setIsSending] = useState(false)
  const [remainingTime, setRemainingTime] = useState<number | undefined>(undefined)

  // 回执区状态
  const [response, setResponse] = useState<ResponseData | null>(null)
  const [error, setError] = useState<ErrorData | null>(null)

  // 从 sessionStorage 加载数据
  useEffect(() => {
    setApiKey(getStoredApiKey())
    setDeviceId(getStoredDeviceId())
  }, [])

  // 保存到 sessionStorage
  useEffect(() => {
    setStoredApiKey(apiKey)
  }, [apiKey])

  useEffect(() => {
    setStoredDeviceId(deviceId)
  }, [deviceId])

  // 速率限制计时器
  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = getRemainingTime()
      if (remaining > 0) {
        setRemainingTime(remaining)
      } else {
        setRemainingTime(undefined)
      }
    }, 100)

    return () => clearInterval(timer)
  }, [])

  // 获取错误信息
  const getErrorData = (err: ApiError): ErrorData => {
    const status = err.status
    let errorKey = 'unknown'

    if (status === 400) errorKey = '400'
    else if (status === 403) errorKey = '403'
    else if (status === 404) errorKey = '404'
    else if (status === 500) errorKey = '500'
    else if (status === 0) errorKey = 'network'

    return {
      status,
      title: t(`error.${errorKey}.title`),
      message: t(`error.${errorKey}.message`),
      suggestion: t(`error.${errorKey}.suggestion`),
    }
  }

  // 验证是否有空白内容
  const hasEmptyContent = (): boolean => {
    const hasTitle = title.trim() !== ''
    const hasMessage = message.trim() !== ''
    const hasSignature = signature.trim() !== ''
    
    // title/message/signature 三者皆为空或仅空白字符
    return !hasTitle && !hasMessage && !hasSignature
  }

  // 发送文本
  const handleSend = async () => {
    // 基本验证
    if (!apiKey || !deviceId) return
    if (!canMakeRequest()) return

    // 空白内容拦截
    if (hasEmptyContent()) {
      setError({
        status: 0,
        title: t('toast.emptyContent'),
        message: t('toast.emptyContent'),
        suggestion: t('info.requiredFields'),
      })
      return
    }

    // Link 格式验证
    if (link.trim() !== '' && !validateLink(link)) {
      setError({
        status: 0,
        title: t('error.link.invalid'),
        message: t('error.link.invalid'),
        suggestion: t('info.linkHint'),
      })
      return
    }

    setIsSending(true)
    setError(null)
    setResponse(null)

    try {
      // 构建请求体：只包含非空字段
      const payload: any = {
        deviceId,
        refreshNow,
      }

      if (title.trim()) payload.title = title.trim()
      if (message.trim()) payload.message = message.trim()
      if (signature.trim()) payload.signature = signature.trim()
      if (icon.trim()) payload.icon = icon.trim()
      if (link.trim() && validateLink(link)) payload.link = link.trim()

      const result = await sendTextApi(apiKey, payload)
      updateLastRequestTime()

      setResponse({
        httpStatus: 200,
        code: result.code,
        message: result.message,
        result: result.result,
        timestamp: new Date().toLocaleTimeString(),
      })
    } catch (err: any) {
      setError(getErrorData(err as ApiError))
    } finally {
      setIsSending(false)
    }
  }

  // 清除本地数据
  const handleClearData = () => {
    clearAllStoredData()
    resetRateLimit()
    setApiKey('')
    setDeviceId('')
    setTitle('')
    setMessage('')
    setSignature('')
    setIcon('')
    setLink('')
    setRefreshNow(true)
    setResponse(null)
    setError(null)
  }

  const canSend = !!(apiKey && deviceId && canMakeRequest())

  return (
    <>
      <Header />

      <main className="main-content">
        <div className="container">
          <ConnectionSection
            apiKey={apiKey}
            deviceId={deviceId}
            onApiKeyChange={setApiKey}
            onDeviceIdChange={setDeviceId}
          />

          <TextSection
            title={title}
            message={message}
            signature={signature}
            icon={icon}
            link={link}
            refreshNow={refreshNow}
            onTitleChange={setTitle}
            onMessageChange={setMessage}
            onSignatureChange={setSignature}
            onIconChange={setIcon}
            onLinkChange={setLink}
            onRefreshNowChange={setRefreshNow}
          />

          <OperationSection
            onSend={handleSend}
            isSending={isSending}
            canSend={canSend}
            remainingTime={remainingTime}
          />

          <ResponseSection response={response} error={error} />
        </div>
      </main>

      <Footer onClearData={handleClearData} />
    </>
  )
}
