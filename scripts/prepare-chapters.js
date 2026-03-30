const fs = require('fs');
const path = require('path');

const sourceDir = 'D:/Programming/fan-ref/斗破苍穹-summary-v2';
const targetDir = 'D:/Programming/fan-ref/fan-ref-site/docs/chapters';

// 确保目标目录存在
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// 读取源目录中的所有 .md 文件
const files = fs.readdirSync(sourceDir).filter(file => file.endsWith('.md'));

// 按文件名排序（chapter_0001.md, chapter_0002.md, ...）
files.sort((a, b) => {
  const numA = parseInt(a.match(/chapter_(\d+)\.md/)[1]);
  const numB = parseInt(b.match(/chapter_(\d+)\.md/)[1]);
  return numA - numB;
});

console.log(`找到 ${files.length} 个章节文件`);

// 复制每个文件到目标目录
files.forEach(file => {
  const sourcePath = path.join(sourceDir, file);
  const targetPath = path.join(targetDir, file);
  fs.copyFileSync(sourcePath, targetPath);
});

console.log(`已复制 ${files.length} 个文件到 ${targetDir}`);
