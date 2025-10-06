/**
 * 会话存储工具函数
 * 仅保存到 sessionStorage，不持久化
 */

export const STORAGE_KEYS = {
  API_KEY: 'castcard_api_key',
  DEVICE_ID: 'castcard_device_id',
} as const

export function getStoredApiKey(): string {
  if (typeof window === 'undefined') return ''
  return sessionStorage.getItem(STORAGE_KEYS.API_KEY) || ''
}

export function setStoredApiKey(apiKey: string): void {
  if (typeof window === 'undefined') return
  if (apiKey) {
    sessionStorage.setItem(STORAGE_KEYS.API_KEY, apiKey)
  } else {
    sessionStorage.removeItem(STORAGE_KEYS.API_KEY)
  }
}

export function getStoredDeviceId(): string {
  if (typeof window === 'undefined') return ''
  return sessionStorage.getItem(STORAGE_KEYS.DEVICE_ID) || ''
}

export function setStoredDeviceId(deviceId: string): void {
  if (typeof window === 'undefined') return
  if (deviceId) {
    sessionStorage.setItem(STORAGE_KEYS.DEVICE_ID, deviceId)
  } else {
    sessionStorage.removeItem(STORAGE_KEYS.DEVICE_ID)
  }
}

export function clearAllStoredData(): void {
  if (typeof window === 'undefined') return
  sessionStorage.removeItem(STORAGE_KEYS.API_KEY)
  sessionStorage.removeItem(STORAGE_KEYS.DEVICE_ID)
}

