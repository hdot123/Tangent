# Tangent 中文社区版

这是 [Tangent](https://www.tangentnotes.com) 的中文社区 fork。

预编译二进制文件可以在[下载页面](https://www.tangentnotes.com/Download)和 [Flathub](https://flathub.org/apps/io.github.suchnsuch.Tangent) 上找到。

Tangent 是一款本地笔记写作 / 个人知识管理工具。它深受 Obsidian 的启发，并在自己的方向上不断发展。它使用 `[[维基链接]]` 和略有定制的 Markdown 语法。笔记在编写时即可完整渲染样式，Markdown 语法按需隐藏和显示。

主要功能：
* 创新的二维连接地图，展示你的导航和链接历史。
* "滑动面板"用户体验，灵感来自 [Andy Matuschak 的笔记](https://notes.andymatuschak.org/About_these_notes)。
* 写作专注模式：高亮当前段落、行或句子。
* 可自定义的笔记视图：以卡片或无限动态加载的信息流查看笔记集合。
* 自定义查询语言（带自动补全！）用于复杂的搜索。
* 支持嵌入图片、链接预览、PDF、音频和视频，包括 YouTube 链接！

## 社区

- 问题反馈：[GitHub Issues](https://github.com/hdot123/Tangent/issues)
- 讨论交流：欢迎提交 PR 和 Issue

## 模块

本仓库包含多个模块。

### 应用程序
`apps` 目录包含 Tangent 的各个应用程序模块。
* [tangent-electron](./apps/tangent-electron/README.md) – 基于 Electron 的 Tangent 应用。
* [tangent-website](./apps/tangent-website/README.md) – [tangentnotes.com](https://www.tangentnotes.com) 的源代码。
* [tangent-test-workspace-generator](./apps/tangent-test-workspace-generator/README.md) – 用于生成测试内容的简单 CLI 工具。

### 包
`packages` 目录包含提供 Tangent 相关功能的库模块。
* [tangent-html-to-markdown](./packages/tangent-html-to-markdown/README.md) – 用于将 `text/html` 剪贴板数据转换为 Tangent 特定 Markdown 文本的解析器。
* [tangent-query-parser](./packages/tangent-query-parser/README.md) – Tangent 查询语言的解析器。

### 库
`lib` 目录包含作为 git 子模块添加的外部版本化库。
* [typewriter](./lib/typewriter/README.md) – [Typewriter](https://github.com/typewriter-editor/typewriter) 项目的 Tangent 特定 fork。


## 本地构建
1. 确保所有子模块已同步（如 `git submodule update`）。
2. 在仓库根目录运行 `npm ci` 安装所有依赖。
3. 在仓库根目录运行 `npm run build` 构建所有依赖。
4. 在 `./apps/tangent-electron` 中运行 `npm run dev`（Windows 上使用 `dev:win`）以开发模式启动 Tangent。


## 报告问题
创建 Issue 时，请使用合适的标签标记具体模块。

报告 Bug 时，请包含：
1. 相关应用/包的版本号。
2. 在标题中简明描述问题。
   * 例如："点击新建笔记按钮后没有创建新笔记"
3. 在正文中详细描述问题。
   * 导致问题发生的步骤。
      * 例如：
         1. "打开一个空白工作区"
         2. "点击新建笔记按钮"
         3. "发现新笔记没有被创建"
   * 包含任何有助于说明问题的额外细节或上下文。
4. 日志有时对排查问题非常有帮助。
   * Tangent 的窗口内日志可在开发者控制台中找到。可以通过 `Cmd+Option+I`（Mac）或 `Ctrl+Shift+I`（Windows 和 Linux）打开。附上截图或日志内容会很有帮助。
   * Tangent 的应用日志可在系统的日志文件夹中找到。你可以在 Tangent 中通过命令面板调用"显示日志"命令（`Cmd/Ctrl+P` 打开面板）直接跳转到日志。
