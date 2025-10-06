# 项目结构 | Project Structure

## 📁 目录结构

```
CastCard/
├── src/                          # 源代码目录
│   ├── app/                      # Next.js App Router
│   │   ├── globals.css          # 全局样式（CSS 变量、主题）
│   │   ├── layout.tsx           # 根布局组件
│   │   ├── page.tsx             # 首页（主应用逻辑）
│   │   └── page.css             # 首页样式
│   │
│   ├── components/               # UI 组件
│   │   ├── Header.tsx           # 页头（品牌、语言切换、主题切换）
│   │   ├── Header.css
│   │   ├── Footer.tsx           # 页脚（清除数据、免责声明）
│   │   ├── Footer.css
│   │   ├── ConnectionSection.tsx    # 连接区（API Key、Device ID、探活）
│   │   ├── ConnectionSection.css
│   │   ├── TextSection.tsx      # 文本区（标题、内容、签名、开关）
│   │   ├── OperationSection.tsx # 操作区（发送按钮、速率提示）
│   │   ├── OperationSection.css
│   │   ├── ResponseSection.tsx  # 回执区（响应显示、错误处理）
│   │   └── ResponseSection.css
│   │
│   ├── hooks/                    # 自定义 React Hooks
│   │   ├── useI18n.ts           # 国际化 Hook（语言切换、翻译函数）
│   │   └── useTheme.ts          # 主题 Hook（亮/暗/系统主题）
│   │
│   ├── locales/                  # 国际化词典
│   │   ├── zh-CN.json           # 简体中文词典
│   │   └── en-US.json           # 英文词典
│   │
│   └── utils/                    # 工具函数
│       ├── api.ts               # Dot API 调用封装
│       ├── storage.ts           # sessionStorage 管理
│       └── rateLimit.ts         # 速率限制控制
│
├── public/                       # 静态资源（图标等）
│
├── out/                          # 构建输出目录（生成）
│
├── next.config.js               # Next.js 配置（静态导出）
├── tsconfig.json                # TypeScript 配置
├── package.json                 # 项目依赖
│
├── README.md                    # 项目说明
├── PRIVACY.md                   # 隐私政策
├── TESTING.md                   # 测试指南
├── CONTRIBUTING.md              # 贡献指南
├── PROJECT_STRUCTURE.md         # 本文件
│
├── LICENSE                      # MIT 许可证
├── .gitignore                   # Git 忽略规则
├── .prettierrc.json            # 代码格式化配置
└── .eslintrc.json              # 代码检查配置
```

## 📦 核心模块说明

### 1. 应用入口 (`src/app/`)

#### `layout.tsx`
- 根布局组件
- 定义 HTML 结构和 metadata
- 全局只加载一次

#### `page.tsx` ⭐ 核心
- 主应用逻辑
- 状态管理（连接、文本、操作、回执）
- 事件处理（探活、发送、清除）
- 组件组装

#### `globals.css`
- CSS 变量定义（颜色、圆角、间距）
- 亮色/暗色主题变量
- 全局样式（reset、基础元素样式）
- 通用类名（.btn, .card, .status-indicator 等）

### 2. UI 组件 (`src/components/`)

所有组件都是**客户端组件**（'use client'），支持交互。

#### 组件职责划分

| 组件 | 职责 | 状态 |
|------|------|------|
| `Header` | 页头、品牌展示、切换器 | 无状态（使用 Hooks） |
| `Footer` | 页脚、清除数据 | 无状态（接收回调） |
| `ConnectionSection` | 连接配置、探活 | 无状态（受控组件） |
| `TextSection` | 文本输入表单 | 无状态（受控组件） |
| `OperationSection` | 发送操作 | 无状态（受控组件） |
| `ResponseSection` | 响应展示 | 无状态（纯展示） |

所有状态由 `page.tsx` 集中管理，组件通过 props 接收数据和回调。

### 3. Hooks (`src/hooks/`)

#### `useI18n.ts`
```typescript
// 功能
- 获取/设置当前语言（zh-CN / en-US）
- 提供翻译函数 t(key, params?)
- 自动检测浏览器语言
- sessionStorage 持久化

// 使用
const { locale, setLocale, t } = useI18n()
t('app.title')  // "CastCard · 墨投"
t('toast.rateLimitWait', { seconds: '3' })  // "速率限制: 请等待 3 秒"
```

#### `useTheme.ts`
```typescript
// 功能
- 获取/设置主题（light / dark / system）
- 监听系统主题变化
- 自动应用 CSS 变量到 DOM
- sessionStorage 持久化

// 使用
const { theme, setTheme, resolvedTheme } = useTheme()
```

### 4. 工具函数 (`src/utils/`)

#### `api.ts`
```typescript
// Dot Text API 封装
sendTextApi(apiKey, payload)  // 发送文本
probeDevice(apiKey, deviceId)  // 探活（refreshNow=false）

// 错误处理
interface ApiError {
  status: number      // HTTP 状态码
  code: number        // 业务错误码
  message: string     // 错误消息
  fullResponse?: any  // 完整响应
}
```

#### `storage.ts`
```typescript
// sessionStorage 管理
getStoredApiKey() / setStoredApiKey(key)
getStoredDeviceId() / setStoredDeviceId(id)
clearAllStoredData()  // 一键清除
```

#### `rateLimit.ts`
```typescript
// 速率限制（1 request/second）
canMakeRequest()          // 是否可发送
getRemainingTime()        // 剩余等待时间（秒）
updateLastRequestTime()   // 更新最后请求时间
resetRateLimit()          // 重置（清除数据时使用）
```

### 5. 国际化词典 (`src/locales/`)

#### 词典结构
```json
{
  "app": { "title": "...", "subtitle": "..." },
  "section": { "connection": "...", "text": "...", ... },
  "field": { "apiKey": "...", "deviceId": "...", ... },
  "cta": { "probe": "...", "send": "...", ... },
  "status": { "idle": "...", "connecting": "...", ... },
  "toast": { "success": "...", ... },
  "error": {
    "400": { "title": "...", "message": "...", "suggestion": "..." },
    "403": { ... },
    ...
  },
  "info": { ... },
  "footer": { ... },
  "theme": { ... },
  "language": { ... }
}
```

## 🔄 数据流

```
用户操作
   ↓
page.tsx (状态管理)
   ↓
├─→ utils/api.ts (API 调用)
│   ↓
│   Dot 官方服务器
│   ↓
│   返回响应/错误
│   ↓
├─→ utils/storage.ts (保存到 sessionStorage)
│
├─→ utils/rateLimit.ts (速率控制)
│
└─→ 更新状态
    ↓
    组件重新渲染
    ↓
    UI 更新
```

## 🎨 样式架构

### CSS 变量系统

```css
/* globals.css */
:root {
  --color-primary: #2563EB;
  --color-bg: #F8FAFC;
  --color-text: #0F172A;
  --radius: 12px;
  --spacing: 16px;
  /* ... */
}

[data-theme="dark"] {
  --color-bg: #0B0F1A;
  --color-text: #DCE3F0;
  /* ... */
}
```

### 组件样式

- 每个组件有独立的 CSS 文件
- 使用 CSS 变量保持一致性
- 支持响应式（@media）
- 明确的类名（避免冲突）

## 🏗️ 构建流程

```bash
npm run dev      # 开发服务器（Turbopack）
npm run build    # 生成静态产物到 out/
```

### 构建输出 (`out/`)

```
out/
├── index.html           # 首页
├── _next/
│   ├── static/          # 静态资源（CSS, JS）
│   └── ...
└── ...
```

可直接部署到：
- Vercel / Netlify
- GitHub Pages
- 任意静态托管服务
- 本地文件服务器（如 `npx serve out`）

## 🔧 技术选型理由

| 技术 | 理由 |
|------|------|
| Next.js 15 | 最新版本，App Router，静态导出支持 |
| TypeScript | 类型安全，更好的开发体验 |
| 原生 CSS | 无需额外依赖，完全控制样式 |
| CSS 变量 | 主题切换，减少重复代码 |
| sessionStorage | 临时存储，关闭即清除，符合隐私要求 |
| 无外部库 | 减少依赖，提升加载速度和安全性 |

## 🎯 设计原则

### First Principles
- 核心需求：向 Dot 设备发送文本
- 本质：浏览器 → API → 设备

### YAGNI
- V0 只实现 Text API，不做 Image
- 单设备，不做多设备管理
- 会话存储，不做持久化

### KISS
- 状态集中在 `page.tsx`
- 组件无状态，纯展示或受控
- 工具函数单一职责

### SOLID
- 单一职责：每个组件、工具各司其职
- 开放封闭：易于扩展（如添加 Image API）

### DRY
- CSS 变量复用
- i18n 词典统一管理
- 工具函数避免重复逻辑

## 📚 扩展指南

### 添加新语言

1. 在 `src/locales/` 添加新词典文件（如 `ja-JP.json`）
2. 在 `useI18n.ts` 的 `translations` 对象中引入
3. 在 `Header.tsx` 添加选项

### 添加新主题

1. 在 `globals.css` 添加新主题变量（如 `[data-theme="custom"]`）
2. 在 `useTheme.ts` 的类型定义中添加
3. 在 `Header.tsx` 添加选项

### 添加新 API 功能

1. 在 `src/utils/api.ts` 添加新函数
2. 在 `page.tsx` 添加状态和处理逻辑
3. 创建对应的 UI 组件
4. 更新 i18n 词典

---

有疑问？查看 [CONTRIBUTING.md](CONTRIBUTING.md) 或创建 Issue。

