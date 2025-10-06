/**
 * Dot Text API 调用工具
 * 官方文档: https://dot.mindreset.tech/api/open/text
 */

const API_ENDPOINT = 'https://dot.mindreset.tech/api/open/text'

export interface TextApiRequest {
  deviceId: string
  refreshNow?: boolean
  title?: string
  message?: string
  signature?: string
  icon?: string // Base64 字符串（不含 data URL 前缀）
  link?: string // http/https 或 URL Scheme
}

export interface TextApiResponse {
  code: number
  message: string
  result?: any
}

export interface ApiError {
  status: number
  code: number
  message: string
  fullResponse?: any
}

/**
 * 调用 Dot Text API
 */
export async function sendTextApi(
  apiKey: string,
  payload: TextApiRequest
): Promise<TextApiResponse> {
  if (!apiKey) {
    throw new Error('API Key is required')
  }

  if (!payload.deviceId) {
    throw new Error('Device ID is required')
  }

  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    })

    const data = await response.json()

    if (!response.ok) {
      const error: ApiError = {
        status: response.status,
        code: data.code || response.status,
        message: data.message || response.statusText,
        fullResponse: data,
      }
      throw error
    }

    return data as TextApiResponse
  } catch (error: any) {
    // 网络错误或其他异常
    if (error.status !== undefined) {
      throw error // 已经是 ApiError
    }

    // 网络错误
    const networkError: ApiError = {
      status: 0,
      code: 0,
      message: error.message || 'Network error',
    }
    throw networkError
  }
}


