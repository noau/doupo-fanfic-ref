# 斗破苍穹章节摘要

同人小说创作参考站，基于 VitePress 构建。

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

## 部署

本项目配置了 GitHub Actions，push 到 main 分支时会自动部署到 GitHub Pages。

## 项目结构

```
fan-ref-site/
├── docs/
│   ├── .vitepress/
│   │   └── config.mjs      # VitePress 配置
│   ├── index.md            # 首页
│   ├── about.md            # 关于页面
│   └── chapters/           # 章节文件（自动生成）
├── scripts/
│   └── prepare-chapters.js # 复制章节文件的脚本
├── .github/
│   └── workflows/
│       └── deploy.yml       # GitHub Actions 部署配置
├── package.json
└── deploy.sh               # 手动部署脚本
```
