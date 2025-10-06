# 更新日志 | Changelog

## [0.2.0] - 2025-10-06

### 🎉 重大更新

#### ❌ 移除探活/连接检测功能
- ✅ 完全移除探活相关 UI（按钮、状态点、文案）
- ✅ 移除探活相关逻辑（`handleProbe`、`probeDevice` API）
- ✅ 移除连接状态管理（`connectionStatus`、`isProbing`）
- ✅ 清理词典中的探活相关翻译（`probe`、`probeSuccess`、`probeHint`、`status.*`）
- ✅ 简化 ConnectionSection 组件
- ✅ 更新文档移除探活说明

#### ✨ 新增 Icon 和 Link 可选字段

**Icon 字段（图标）**：
- ✅ 支持上传 PNG/JPG/SVG 图片
- ✅ 自动转换为 40×40 PNG Base64
- ✅ 支持拖拽上传
- ✅ 实时预览（像素级）
- ✅ 支持移除图标
- ✅ 前端校验和错误提示
- ✅ 非 40×40 图片自动等比缩放并居中
- ✅ 仅在有图标时才发送 icon 字段

**Link 字段（链接）**：
- ✅ 支持 http/https URL
- ✅ 支持 URL Scheme（如 `x-apple-health://`）
- ✅ 前端格式校验
- ✅ 实时错误提示
- ✅ 仅在填写且合法时才发送 link 字段

**空白内容拦截**：
- ✅ title/message/signature 三者皆为空时禁止发送
- ✅ 显示友好错误提示
- ✅ 避免无意义的 API 调用

### 🌍 多语言完善

**中文新增词条**：
- `field.icon` / `field.link` / `field.linkPlaceholder`
- `cta.selectIcon` / `cta.removeIcon`
- `error.icon.invalid` / `error.link.invalid`
- `toast.emptyContent`
- `info.iconHint` / `info.iconDragHint` / `info.linkHint` / `info.processing`

**英文新增词条**：
- 完整对应的英文翻译
- 中英文同步，立即切换生效

### 🏗️ 架构改进

**新增文件**：
- `src/utils/imageProcessor.ts` - 图片处理工具
  - `processIconImage()` - 转换图片为 40×40 PNG Base64
  - `validateLink()` - 验证链接格式

**修改文件**：
- `src/components/ConnectionSection.tsx` - 简化，移除探活
- `src/components/TextSection.tsx` - 大幅扩展，添加 icon/link 字段
- `src/components/TextSection.css` - 新增样式
- `src/app/page.tsx` - 移除探活逻辑，添加 icon/link 状态管理
- `src/utils/api.ts` - 移除 `probeDevice` 函数
- `src/locales/zh-CN.json` - 更新词典
- `src/locales/en-US.json` - 更新词典

### 🎨 UI/UX 改进

- ✅ 图标预览框支持亮/暗主题
- ✅ 错误提示使用语义色（Error）
- ✅ 拖拽上传交互流畅
- ✅ 表单验证实时反馈
- ✅ 键盘可访问性完整

### 🐛 Bug 修复

- ✅ 修复空字段发送导致的 400 错误
- ✅ 只在有值时发送可选字段
- ✅ 空白内容拦截避免无效请求

### 📚 文档更新

- ✅ 更新 README - 移除探活说明，添加 icon/link 说明
- ✅ 更新 CHANGELOG - 详细记录本次改动

## [0.1.2] - 2025-10-06

### 🐛 重要 Bug 修复

#### Hydration 错误修复
- ✅ 修复了 Next.js 15 Hydration 不匹配错误
  - 问题：服务器渲染文本与客户端不匹配（"CastCard · 墨投" vs "CastCard"）
  - 原因：每个组件独立初始化语言状态，浏览器检测结果不一致
  - 解决：使用固定初始值 + useEffect 延迟读取浏览器偏好

#### 语言切换失效修复
- ✅ 修复了语言切换仅影响导航栏的问题
  - 问题：切换语言后只有 Header 更新，其他组件不响应
  - 原因：每个组件独立管理语言状态，没有全局同步
  - 解决：使用 React Context API 实现全局状态管理

### 🏗️ 架构改进

#### 新增文件
- ✅ `src/contexts/I18nContext.tsx` - 全局国际化 Context
  - 统一管理语言状态
  - 提供 `useI18n` hook
  - 解决 Hydration 不匹配
  - 实现全局语言同步

- ✅ `src/contexts/ThemeContext.tsx` - 全局主题 Context
  - 统一管理主题状态
  - 提供 `useTheme` hook
  - 监听系统主题变化

#### 架构变更
- ✅ 从独立 Hooks 迁移到 Context API
  - 旧：每个组件独立 `useState`
  - 新：全局 Context + Provider
  - 好处：单一状态源，自动同步

#### 修改文件
- `src/app/layout.tsx` - 添加 I18nProvider 和 ThemeProvider
- `src/app/page.tsx` - 更新导入路径
- `src/components/Header.tsx` - 更新导入路径
- `src/components/Footer.tsx` - 更新导入路径
- `src/components/ConnectionSection.tsx` - 更新导入路径
- `src/components/TextSection.tsx` - 更新导入路径
- `src/components/OperationSection.tsx` - 更新导入路径
- `src/components/ResponseSection.tsx` - 更新导入路径

### 📚 文档

- ✅ `HYDRATION_FIX.md` - 详细的修复说明文档
  - 问题分析
  - 解决方案
  - 技术细节
  - 验证方法
  - 最佳实践

### ⚡ 性能提升

- ✅ 消除 Hydration 重新渲染
- ✅ 减少内存占用（单一状态源）
- ✅ 提升语言/主题切换响应速度

### 🧪 验证

- ✅ 无 TypeScript 错误
- ✅ 无 ESLint 警告
- ✅ 无 Hydration 警告
- ✅ 语言切换全局生效
- ✅ 主题切换全局生效
- ✅ 状态正确持久化

## [0.1.1] - 2025-10-06

### 🌍 多语言完善
- ✅ 完善 ResponseSection 组件的多语言支持
  - 添加 `response.code`、`response.message`、`response.result` 翻译
  - 移除硬编码的 "Code:"、"Message:"、"Result:" 文本
- ✅ 完善 Footer 组件的确认对话框多语言
  - 添加 `toast.confirmClear` 翻译
  - 清除数据时显示多语言确认提示

### 🔗 项目信息更新
- ✅ 更新 GitHub 仓库地址为 `https://github.com/kaminono/CastCard`
  - Footer 组件中的开源链接
  - README.md 中的克隆命令
  - CONTRIBUTING.md 中的开发流程
  - QUICKSTART.md 中的 Issues 链接
  - START_HERE.md 中的 Issues 链接
  - package.json 中的仓库信息

### 📄 许可证变更
- ✅ 从 MIT License 变更为 GNU Affero General Public License v3.0 (AGPL-3.0)
  - README.md 许可证章节更新
  - CONTRIBUTING.md 许可证说明更新
  - PROJECT_SUMMARY.md 交付声明更新
  - package.json 许可证字段更新

### 📦 package.json 增强
- ✅ 添加仓库信息 (`repository`)
- ✅ 添加问题追踪链接 (`bugs`)
- ✅ 添加项目主页 (`homepage`)
- ✅ 明确许可证类型 (`license: AGPL-3.0`)

## [0.1.0] - 2025-10-06

### 🎉 初始发布
- ✅ 完整的 Next.js 15 应用（App Router + 静态导出）
- ✅ 中英双语支持（zh-CN / en-US）
- ✅ 亮色/暗色/系统主题切换
- ✅ Dot Text API 完整功能实现
- ✅ 探活测试（不切屏）
- ✅ 文本发送（支持 title/message/signature）
- ✅ refreshNow 立即显示控制
- ✅ 错误处理与排障建议
- ✅ 速率限制（1 次/秒）
- ✅ sessionStorage 会话级存储
- ✅ 一键清除本地数据
- ✅ 响应式布局（移动端友好）
- ✅ 无障碍支持（WCAG AA）
- ✅ 完整文档（9 个 Markdown 文档）

---

## 更新内容对比

### 修改的文件清单

#### 组件文件 (2)
- `src/components/Footer.tsx`
  - 更新 GitHub 链接
  - 修复确认对话框多语言

- `src/components/ResponseSection.tsx`
  - 移除硬编码文本
  - 使用 `t()` 函数进行翻译

#### 词典文件 (2)
- `src/locales/zh-CN.json`
  - 添加 `response.*` 字段
  - 添加 `toast.confirmClear` 字段

- `src/locales/en-US.json`
  - 添加 `response.*` 字段
  - 添加 `toast.confirmClear` 字段

#### 文档文件 (5)
- `README.md`
  - 更新许可证章节
  - 更新克隆命令中的仓库地址

- `CONTRIBUTING.md`
  - 更新许可证说明
  - 更新开发流程中的仓库地址

- `PROJECT_SUMMARY.md`
  - 更新许可证类型

- `QUICKSTART.md`
  - 更新 Issues 链接

- `START_HERE.md`
  - 更新 Issues 链接

#### 配置文件 (1)
- `package.json`
  - 添加 `license` 字段
  - 添加 `repository` 字段
  - 添加 `bugs` 字段
  - 添加 `homepage` 字段

### 词典新增字段

#### 中文词典 (zh-CN.json)
```json
{
  "response": {
    "httpStatus": "HTTP 状态",
    "code": "代码",
    "message": "消息",
    "result": "结果"
  },
  "toast": {
    "confirmClear": "确定要清除所有本地数据吗？这将清空 API Key 和 Device ID。"
  }
}
```

#### 英文词典 (en-US.json)
```json
{
  "response": {
    "httpStatus": "HTTP Status",
    "code": "Code",
    "message": "Message",
    "result": "Result"
  },
  "toast": {
    "confirmClear": "Are you sure you want to clear all local data? This will remove your API Key and Device ID."
  }
}
```

---

## 验证清单

- ✅ 所有文本已多语言化
- ✅ GitHub 链接已更新为正确地址
- ✅ 许可证信息已更新为 AGPL-3.0
- ✅ package.json 完整包含项目元信息
- ✅ 无 TypeScript 错误
- ✅ 无 ESLint 警告
- ✅ 所有文档一致性已检查

---

更新人：AI 前端工程师  
更新日期：2025-10-06

