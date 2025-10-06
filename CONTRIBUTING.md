# 贡献指南 | Contributing Guide

感谢你考虑为 CastCard · 墨投 项目贡献！

## 🌟 如何贡献

### 报告 Bug

如果你发现了 bug，请：

1. 检查 [Issues](https://github.com/yourusername/castcard/issues) 是否已有相关报告
2. 如果没有，创建新 Issue，包含：
   - 清晰的标题和描述
   - 复现步骤
   - 预期行为 vs 实际行为
   - 浏览器和版本信息
   - 截图（如果适用）

### 建议新功能

欢迎提出新功能建议：

1. 先查看 [路线图](README.md#路线图) 和现有 Issues
2. 创建 Feature Request Issue
3. 说明功能的使用场景和价值

### 提交代码

#### 开发流程

1. **Fork 项目**
   ```bash
   git clone https://github.com/kaminono/CastCard.git
   cd CastCard
   ```

2. **创建分支**
   ```bash
   git checkout -b feature/your-feature-name
   # 或
   git checkout -b fix/your-bug-fix
   ```

3. **安装依赖**
   ```bash
   npm install
   ```

4. **开发**
   ```bash
   npm run dev
   ```

5. **测试**
   - 手动测试所有相关功能
   - 确保构建成功：`npm run build`

6. **提交代码**
   ```bash
   git add .
   git commit -m "feat: 添加新功能描述"
   # 或
   git commit -m "fix: 修复问题描述"
   ```

   提交信息格式：
   - `feat:` 新功能
   - `fix:` Bug 修复
   - `docs:` 文档更新
   - `style:` 代码格式（不影响功能）
   - `refactor:` 重构
   - `test:` 测试相关
   - `chore:` 构建/工具相关

7. **推送并创建 PR**
   ```bash
   git push origin feature/your-feature-name
   ```
   
   然后在 GitHub 上创建 Pull Request

#### 代码规范

- 遵循现有代码风格
- 使用 TypeScript 类型注解
- 组件使用函数式写法
- 添加必要的注释
- 保持文件结构清晰

#### PR 检查清单

提交 PR 前，请确认：

- [ ] 代码符合项目风格
- [ ] 没有 TypeScript 错误
- [ ] 没有 ESLint 警告/错误
- [ ] 功能经过测试
- [ ] 更新了相关文档
- [ ] 构建成功（`npm run build`）
- [ ] 没有提交敏感信息（API Key 等）

### 文档贡献

文档改进同样重要：

- 修正错别字和语法错误
- 改进说明和示例
- 翻译文档
- 添加截图和图表

## 🎨 设计规范

### CSS 规范

- 使用 CSS 变量定义主题色
- 保持响应式设计
- 确保暗色模式对比度符合 AA 标准
- 圆角统一使用 `--radius` 或 `--radius-sm`
- 间距使用 `--spacing` 或 `--spacing-sm`

### 组件规范

- 每个组件独立 `.tsx` 和 `.css` 文件
- 使用清晰的 Props 接口定义
- 添加 aria 属性支持可访问性
- 支持键盘导航

### i18n 规范

- 所有用户可见文字必须国际化
- 词典 key 使用点号分隔：`section.subsection.key`
- 同时更新 `zh-CN.json` 和 `en-US.json`

## 🔒 安全要求

- **严禁**提交真实 API Key
- **严禁**提交个人设备信息
- 确保用户数据仅在客户端处理
- 不引入追踪或分析代码

## 📝 许可证

提交代码即表示你同意你的贡献将以 GNU Affero General Public License v3.0 (AGPL-3.0) 许可证发布。

## 🤝 行为准则

- 尊重所有参与者
- 接受建设性批评
- 专注于对项目最有利的事情
- 展现同理心

## 💬 联系方式

如有疑问，可以：

- 创建 Issue 讨论
- 在 PR 中提问

---

再次感谢你的贡献！🎉

