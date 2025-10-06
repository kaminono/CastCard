/**
 * 速率限制工具
 * Dot API 限制: 1 request/second
 */

const RATE_LIMIT_MS = 1100 // 1.1 秒，稍微多一点避免边界情况

let lastRequestTime = 0

export function canMakeRequest(): boolean {
  const now = Date.now()
  return now - lastRequestTime >= RATE_LIMIT_MS
}

export function getRemainingTime(): number {
  const now = Date.now()
  const elapsed = now - lastRequestTime
  const remaining = Math.max(0, RATE_LIMIT_MS - elapsed)
  return Math.ceil(remaining / 1000) // 返回秒数
}

export function updateLastRequestTime(): void {
  lastRequestTime = Date.now()
}

export function resetRateLimit(): void {
  lastRequestTime = 0
}

