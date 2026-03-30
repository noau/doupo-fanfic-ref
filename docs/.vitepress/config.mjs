import { defineConfig } from 'vitepress'
import { readFileSync, readdirSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url));
const sourceDir = join(__dirname, '../chapters');

// 读取章节文件并生成侧边栏
const chapterFiles = readdirSync(sourceDir)
  .filter(f => f.endsWith('.md'))
  .sort((a, b) => {
    const numA = parseInt(a.match(/chapter_(\d+)\.md/)[1]);
    const numB = parseInt(b.match(/chapter_(\d+)\.md/)[1]);
    return numA - numB;
  });

// 生成侧边栏配置
const sidebar = {
  '/chapters/': chapterFiles.map((file) => {
    const num = file.match(/chapter_(\d+)\.md/)[1];
    const chapterNum = parseInt(num);
    // 读取文件第一行获取标题
    const content = readFileSync(`${sourceDir}/${file}`, 'utf-8');
    const titleMatch = content.match(/^##\s+(.+)$/m);
    const title = titleMatch ? titleMatch[1] : `第${chapterNum}章`;

    return {
      text: title,
      link: `/chapters/chapter_${num}`
    };
  })
};

export default defineConfig({
  title: '斗破苍穹章节摘要',
  description: '斗破苍穹同人小说创作参考站',

  lang: 'zh-CN',

  base: '/doupo-fanfic-ref/',

  cleanUrls: true,

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],

  themeConfig: {
    // 导航栏
    nav: [
      { text: '首页', link: '/' },
      { text: '关于', link: '/about' }
    ],

    // 侧边栏
    sidebar,

    // 搜索配置
    search: {
      provider: 'local',
      options: {
        detailedView: true
      }
    },

    // 上下章导航
    docFooter: {
      prev: '上一章',
      next: '下一章'
    },

    // 社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/' }
    ]
  },

  // Vite 配置
  vite: {
    server: {
      host: true
    }
  }
})
