# 快速开始 | Quick Start

## ⚡ 5 分钟上手

### 1️⃣ 安装依赖

```bash
npm install
```

> 首次安装可能需要几分钟，请耐心等待。

### 2️⃣ 启动开发服务器

```bash
npm run dev
```

看到以下信息表示启动成功：
```
▲ Next.js 15.0.0
- Local:        http://localhost:3000
- Ready in xxxms
```

### 3️⃣ 打开浏览器

访问 http://localhost:3000

### 4️⃣ 测试连接

1. **输入测试参数**（仅供本地测试）：
   ```
   API Key: 
   Device ID: 
   ```

2. **点击"探活"按钮**
   - 应该看到绿色连通指示
   - 回执区显示 HTTP 200

3. **发送测试文本**
   - 在"消息内容"输入：`Hello from CastCard`
   - 点击"发送"按钮
   - 设备应立即显示内容

### 5️⃣ 体验功能

✅ **语言切换**：右上角切换中英文  
✅ **主题切换**：右上角切换亮色/暗色/系统  
✅ **清除数据**：页脚"清除本地数据"按钮  

## 🚀 构建部署

### 构建静态产物

```bash
npm run build
```

产物位于 `out/` 目录，可直接部署。

### 本地预览

```bash
npx serve out
```

### 部署到 Vercel

```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel --prod
```

### 部署到 Netlify

```bash
# 拖拽 out/ 目录到 Netlify Drop
# 或使用 Netlify CLI
netlify deploy --prod --dir=out
```

### 部署到 GitHub Pages

1. 在项目根目录创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

2. 在 GitHub 仓库设置中启用 GitHub Pages，选择 `gh-pages` 分支

## 📝 开发提示

### 热重载

修改代码后自动刷新浏览器，无需手动刷新。

### 查看控制台

打开浏览器开发者工具（F12）查看：
- 网络请求（Network 标签）
- API 响应（Console 标签）
- React 组件（React DevTools）

### 常见问题

**Q: 端口 3000 被占用？**
```bash
# 使用其他端口
npm run dev -- -p 3001
```

**Q: 构建失败？**
```bash
# 清理缓存重试
rm -rf .next node_modules
npm install
npm run build
```

**Q: API 调用失败？**
- 检查网络连接
- 确认 API Key 和 Device ID 正确
- 查看浏览器控制台的错误信息
- 参考 [TESTING.md](TESTING.md) 排查

## 📚 下一步

- 📖 阅读完整 [README.md](README.md)
- 🧪 参考 [TESTING.md](TESTING.md) 进行完整测试
- 🏗️ 查看 [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) 了解架构
- 🤝 阅读 [CONTRIBUTING.md](CONTRIBUTING.md) 参与贡献

## 🆘 需要帮助？

- 查看 [Issues](https://github.com/kaminono/CastCard/issues)
- 创建新 Issue 提问
- 参考 Dot 官方文档：https://dot.mindreset.tech

---

祝使用愉快！🎉

