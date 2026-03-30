#!/bin/bash
# 部署脚本 - 用于手动部署到 GitHub Pages

set -e

echo "开始部署..."

# 安装依赖
npm install

# 构建
npm run build

# 部署到 GitHub Pages (需要 gh CLI)
echo "请确保已安装 gh CLI 并登录"
gh auth status || echo "未检测到 gh CLI，请手动部署"

# 推送 dist 目录到 gh-pages 分支
git checkout -B gh-pages
git add docs/.vitepress/dist -f
git commit -m "Deploy to GitHub Pages $(date)"
git push origin gh-pages --force
git checkout main

echo "部署完成!"
