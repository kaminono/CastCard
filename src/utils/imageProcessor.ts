/**
 * 图片处理工具
 * 将上传的图片转换为 40×40 PNG Base64
 */

export interface ImageProcessResult {
  base64: string // 纯 Base64 字符串（不含 data URL 前缀）
  dataUrl: string // 用于预览的 data URL
}

/**
 * 处理上传的图片文件，转换为 40×40 PNG Base64
 * @param file 图片文件
 * @returns Base64 字符串和预览 URL
 */
export async function processIconImage(file: File): Promise<ImageProcessResult> {
  return new Promise((resolve, reject) => {
    // 验证文件类型
    if (!file.type.startsWith('image/')) {
      reject(new Error('File is not an image'))
      return
    }

    const reader = new FileReader()

    reader.onload = (e) => {
      const img = new Image()

      img.onload = () => {
        try {
          // 创建 40×40 画布
          const canvas = document.createElement('canvas')
          canvas.width = 40
          canvas.height = 40
          const ctx = canvas.getContext('2d')

          if (!ctx) {
            reject(new Error('Cannot get canvas context'))
            return
          }

          // 计算缩放和居中
          const scale = Math.min(40 / img.width, 40 / img.height)
          const scaledWidth = img.width * scale
          const scaledHeight = img.height * scale
          const x = (40 - scaledWidth) / 2
          const y = (40 - scaledHeight) / 2

          // 清空画布（透明背景）
          ctx.clearRect(0, 0, 40, 40)

          // 绘制缩放后的图片
          ctx.drawImage(img, x, y, scaledWidth, scaledHeight)

          // 转换为 PNG Data URL
          const dataUrl = canvas.toDataURL('image/png')

          // 提取纯 Base64（移除 "data:image/png;base64," 前缀）
          const base64 = dataUrl.split(',')[1]

          resolve({
            base64,
            dataUrl,
          })
        } catch (error) {
          reject(error)
        }
      }

      img.onerror = () => {
        reject(new Error('Failed to load image'))
      }

      img.src = e.target?.result as string
    }

    reader.onerror = () => {
      reject(new Error('Failed to read file'))
    }

    reader.readAsDataURL(file)
  })
}

/**
 * 验证 Link 格式
 * @param link 链接字符串
 * @returns 是否有效
 */
export function validateLink(link: string): boolean {
  if (!link || link.trim() === '') {
    return true // 空值也是有效的（可选字段）
  }

  const trimmed = link.trim()

  // 标准 URL：http:// 或 https://
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    try {
      new URL(trimmed)
      return true
    } catch {
      return false
    }
  }

  // URL Scheme：<scheme>: 或 <scheme>://
  // 例如：x-apple-health:// 或 mailto:
  const schemeRegex = /^[a-z][a-z0-9+.-]*:(\/\/)?/i
  return schemeRegex.test(trimmed)
}

