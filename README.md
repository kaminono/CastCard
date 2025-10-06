# CastCard · 墨投

> 把文字与图片，一键投到电子屏  
> Send text and images to your Dot device with one click

**CastCard · 墨投** 是一个零后端、纯前端、可静态托管的 Web 应用，基于 [Dot 设备](https://dot.mindreset.tech) 的公开 Text API 开发。它让你可以通过浏览器直接向 Dot 电子屏幕发送文本内容，无需安装任何应用。

## ✨ 核心特性

- 🚀 **零后端**：纯前端实现，直接调用 Dot 官方 API
- 🌐 **静态托管**：可部署到任意静态托管服务（Vercel、Netlify、GitHub Pages 等）
- 🌍 **国际化**：内置中英文双语支持（zh-CN / en-US）
- 🎨 **主题切换**：支持亮色/暗色/系统主题，自动跟随系统偏好
- 🔒 **隐私优先**：API Key 仅在浏览器会话内保存，不记录、不上传
- ⚡ **速率控制**：自动处理 1 request/second 的 API 限制
- ♿ **无障碍**：符合 WCAG AA 标准，支持键盘导航和屏幕阅读器

## 📋 功能说明

### V0 版本功能

当前版本支持以下功能：

1. **文本发送**：向设备发送文本内容，支持标题、正文、签名三个字段
2. **图标上传**：支持上传图片作为图标（自动转换为 40×40 PNG Base64）
3. **链接添加**：支持添加 http/https 或 URL Scheme 链接
4. **立即显示控制**：可选择是否立即切换设备屏幕（refreshNow）
5. **回执显示**：实时显示 API 响应状态和详细信息
6. **错误处理**：针对常见错误（400/403/404/500）提供中英文提示和排障建议
7. **会话存储**：自动保存 API Key 和 Device ID 到浏览器会话
8. **一键清除**：支持清除所有本地数据

## 🚀 快速开始

> 💡 **5 分钟上手指南**：查看 [QUICKSTART.md](QUICKSTART.md) 快速启动项目

### 前置条件

1. 拥有一台 [Dot 设备](https://dot.mindreset.tech)
2. 在 Dot 应用中生成 API Key
3. 确保设备已添加 Text API 内容源

### 在线使用

访问部署好的应用（待部署后添加链接），输入您的 API Key 和 Device ID 即可开始使用。

> 📌 **完整测试指南**：请参阅 [TESTING.md](TESTING.md) 了解详细的测试步骤和验收标准。

### 本地运行

```bash
# 克隆仓库
git clone https://github.com/kaminono/CastCard.git
cd CastCard

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 在浏览器中访问 http://localhost:3000
```

### 静态导出

```bash
# 构建静态产物
npm run build

# 产物位于 out/ 目录
# 将 out/ 目录内容部署到任意静态托管服务即可
```

## 📖 使用指南

### 1. 获取 API Key

1. 打开 Dot 官方应用
2. 进入设置 → API 管理
3. 创建新的 API Key 并复制

### 2. 获取 Device ID

1. 在 Dot 应用中查看设备信息
2. 复制设备 ID（通常是 12 位十六进制字符，如 `48F6EE55ADDC`）

### 3. 添加 Text API 内容源

在 Dot 应用中为目标设备添加 Text API 类型的内容源，否则会收到 404 错误。

### 4. 发送文本

1. 填写文本内容（message 必填，title 和 signature 可选）
2. **可选**：上传图标（PNG/JPG/SVG，自动转换为 40×40）
3. **可选**：添加链接（http/https 或 URL Scheme，如 `x-apple-health://`）
4. 选择是否"立即显示"
5. 点击"发送"按钮
6. 查看回执区的响应信息

### 5. 图标使用说明

- 支持上传 PNG、JPG、SVG 格式图片
- 自动转换为 40×40 PNG Base64 格式
- 非 40×40 图片会等比缩放并居中
- 支持拖拽上传
- 可实时预览效果
- 可随时移除图标

### 6. 链接使用说明

- 支持标准 URL：`http://` 或 `https://` 开头
- 支持 URL Scheme：如 `x-apple-health://`、`mailto:`、`tel:` 等
- 填写后会自动验证格式
- 不合法的链接会阻止发送并提示错误

## 🔧 API 状态码与排障

### HTTP 200 - 成功
- `code: 200` - 操作成功
- 可能的消息：
  - "Text API content switched" - 内容已切换
  - "Data updated but content not switched" - 数据已更新但未切屏

### HTTP 400 - 参数错误
**可能原因**：
- 请求参数格式错误
- icon 字段格式不符合要求（应为 40×40 PNG base64）
- link 字段格式不合法

**解决方案**：
- 检查所有字段是否填写正确
- 重新上传或移除图标
- 确认 link 格式为 http/https 或有效的 URL Scheme

### HTTP 403 - 无权限
**可能原因**：
- API Key 错误或已失效
- 设备不属于当前 API Key 对应的账号

**解决方案**：
- 重新生成 API Key
- 确认设备归属权限

### HTTP 404 - 未找到
**可能原因**：
- 设备 ID 不存在或未注册
- 设备未添加 Text API 内容源

**解决方案**：
- 确认 Device ID 正确
- 在 Dot 应用中为设备添加 Text API 内容源

### HTTP 500 - 设备响应失败
**可能原因**：
- 设备离线或网络异常
- 服务端临时故障

**解决方案**：
- 检查设备网络连接
- 稍后重试

## 🛣️ 路线图

### 未来计划

- [ ] **Image API**：支持发送全屏图片到设备
- [ ] **内容模板**：预设常用文本模板
- [ ] **发送历史**：本地保存最近发送记录
- [ ] **多设备管理**：支持保存和切换多个设备
- [ ] **PWA 支持**：安装为独立应用
- [ ] **加密存储**：可选的加密持久化存储
- [ ] **图标库**：内置常用图标供快速选择

欢迎提交 Issue 或 PR 来建议新功能！请参阅 [CONTRIBUTING.md](CONTRIBUTING.md) 了解如何贡献。

## 🔒 隐私承诺

- ✅ **不记录**：应用不会记录您的 API Key 或任何个人数据
- ✅ **不上传**：所有 API 调用直接在浏览器中完成，不经过第三方服务器
- ✅ **不持久化**：仅使用 sessionStorage 临时保存，关闭浏览器即清除
- ✅ **开源透明**：所有代码公开可审计

## 🤝 技术栈

- **框架**：Next.js 15 (App Router)
- **语言**：TypeScript
- **构建**：Turbopack
- **部署**：静态导出 (output: "export")
- **样式**：原生 CSS + CSS 变量
- **API**：Dot Text API

## 📄 许可证

本项目采用 [GNU Affero General Public License v3.0 (AGPL-3.0)](LICENSE) 开源。

## ⚖️ 免责声明

**CastCard · 墨投** 与 Dot 官方无从属关系，系基于 Dot 公开 API 的独立开发项目。使用本应用产生的任何问题，开发者不承担责任。

如有疑问或需要技术支持，请访问：
- Dot 官方网站：https://dot.mindreset.tech
- Dot 官方文档：https://dot.mindreset.tech/docs

## 🙏 致谢

感谢 Dot 团队提供开放的 API，让开发者能够构建更多有趣的应用。

---

Made with ❤️ by [xiaoyu](https://github.com/kaminono)
