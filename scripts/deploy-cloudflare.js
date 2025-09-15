#!/usr/bin/env node

/**
 * Cloudflare Pages 部署脚本
 * 自动构建并部署到 Cloudflare Pages
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 开始 Cloudflare Pages 部署流程...\n');

try {
  // 1. 检查构建输出目录
  console.log('📁 检查构建输出...');
  const outDir = path.join(__dirname, 'out');
  
  if (!fs.existsSync(outDir)) {
    console.log('⚠️  未找到构建输出，开始构建...');
    execSync('npm run build', { stdio: 'inherit' });
  } else {
    console.log('✅ 找到构建输出目录');
  }

  // 2. 检查 wrangler 是否安装
  console.log('\n🔧 检查 Wrangler CLI...');
  try {
    execSync('wrangler --version', { stdio: 'pipe' });
    console.log('✅ Wrangler CLI 已安装');
  } catch (error) {
    console.log('⚠️  Wrangler CLI 未安装，正在安装...');
    execSync('npm install -g wrangler', { stdio: 'inherit' });
  }

  // 3. 部署到 Cloudflare Pages
  console.log('\n🌐 部署到 Cloudflare Pages...');
  const deployCommand = process.argv.includes('--production') 
    ? 'wrangler pages deploy out --project-name=hanggle-blog --production'
    : 'wrangler pages deploy out --project-name=hanggle-blog';
    
  execSync(deployCommand, { stdio: 'inherit' });
  
  console.log('\n✅ 部署完成！');
  console.log('🌍 您的网站已部署到 Cloudflare Pages');
  console.log('📊 访问 Cloudflare Dashboard 查看部署状态');

} catch (error) {
  console.error('\n❌ 部署失败:', error.message);
  process.exit(1);
}