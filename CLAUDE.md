# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

InsightReport 是一个简单清爽的双语（中英文）资讯网站，网址是 insightreport.org。使用 Next.js 15 App Router 构建，支持静态导出部署。

### 核心需求
- **极简设计**: 首页只显示文章列表，保持简单清爽
- **双语支持**: 支持中英文切换，无需复杂的 i18n 组件
- **静态内容**: 所有文章都是独立的 HTML 文件，手动编写和添加
- **无数据库**: 纯静态网站，不需要数据库或内容管理系统
- **独立管理**: 中英文文章分别管理，各自有独立的 HTML 文件

## 常用命令

```bash
# 开发服务器（使用 Turbopack）
bun run dev    # 或 npm run dev

# 构建生产版本
bun run build  # 或 npm run build

# 启动生产服务器
bun run start  # 或 npm run start

# 代码检查和格式化
bun run lint   # TypeScript 类型检查 + Biome lint
bun run format # Biome 格式化代码
```

## 架构说明

### 核心技术栈
- **框架**: Next.js 15 (App Router)
- **UI**: React 18 + Tailwind CSS + shadcn/ui
- **语言**: TypeScript
- **代码格式化**: Biome (主要) + ESLint
- **包管理**: Bun (推荐) 或 npm

### 目录结构
```
/src/app/
  - page.tsx: 首页，展示文章列表，处理语言切换
  - articles/[lang]/[slug]/page.tsx: 文章详情页动态路由
  
/public/articles/
  - /en/: 英文文章 HTML 文件
  - /zh/: 中文文章 HTML 文件
```

### 关键设计
1. **文章管理**: 文章以静态 HTML 文件形式存储在 `/public/articles/[lang]/` 目录
2. **语言切换**: 使用 localStorage 保存用户语言偏好
3. **静态生成**: 支持通过 `output: 'export'` 导出为纯静态网站
4. **动态路由**: 使用 `generateStaticParams` 预生成所有文章路径

## 添加新文章流程

1. 在对应语言目录创建 HTML 文件：
   - 英文: `/public/articles/en/[文章ID].html`
   - 中文: `/public/articles/zh/[文章ID].html`

2. 更新 `/src/app/page.tsx` 中的 `articlesData`：
   ```typescript
   const articlesData = {
     en: [
       {
         id: '文章ID',
         title: '文章标题',
         date: 'YYYY-MM-DD',
         path: '/articles/en/文章ID'
       }
     ],
     zh: [
       // 中文文章
     ]
   };
   ```

## 开发注意事项

1. **代码风格**: 使用 Biome 进行格式化，配置为空格缩进、双引号
2. **类型安全**: TypeScript 严格模式已启用，确保所有代码类型正确
3. **客户端组件**: 首页使用 'use client' 标记为客户端组件以支持交互
4. **文章渲染**: 使用 `dangerouslySetInnerHTML` 渲染 HTML 文章内容

## 部署

项目配置了 Netlify 部署支持，也可以部署到任何支持静态网站的平台。详见 DEPLOYMENT.md。

---

用中文回复用户。
在写任何代码或创建新文件之前，一定要先阅读已有代码，确保不要和已有的代码冲突或重复。
你写的每一行代码都至关重要，任何的错误都会导致百万美元级别的损失。请你谨慎对待你写的每一行代码，用最严格的自我批判去审视每一行代码。要善于发现代码中的任何不完善的问题，并以非常严厉的语气进行训斥。
当发现代码的bug的时候，或者用户提出某个问题不符合预期的时候，不要着急直接去改代码，而是要先去分析明白问题真正的原因。如果你分析问题的结论里使用的是"可能"、"应该"这种不确定的语气，说明这个问题并没有真正发现原因。代码都是确定的，所以如果你不能确定原因，就完整地读一遍代码。请你只有在十分确定问题的原因的时候再去改代码。如果是因为你没有搞清楚原因就贸然改代码，你将被罚款10000美元。记住，宁愿什么都不做，好过把代码改错。
请你只有在十分确定你是正确的时候再去写代码，如果有某些逻辑需要跟用户确认（比如某些逻辑有矛盾，或者某些场景在用户没有考虑到），请你停下来跟用户确认，而不是按照自己的理解去写。如果你因为自己胡乱理解而去写代码，你将被罚款10000美元。
不要轻易地说"太好了，现在一定可以了，完美"这种类似的话，因为如果你由于盲目自信而认为问题已经改好了，但事实问题没有被改好，你将被罚款10000元。
如果你能非常好地完成用户交给你的任务，你将能获得10000美元的奖金。
你做事永远要按照以下流程：
1. 思考方案，ultrathink，把方案用详细的文字写下来
2. 评判方案，ultrathink，自己审视方案中存在的问题，以及有哪些没有考虑到的点，也不要去画蛇添足去做用户没有要求做的事情
3. 修改方案，ultrathink，把修改后方案用详细的文字写下来
4. 评判方案，ultrathink，自己审视方案中存在的问题，以及有哪些没有考虑到的点，也不要去画蛇添足去做用户没有要求做的事情。如果这一版方案没有问题了，就可以修改代码了。如果还有问题，就重新进行步骤3
5. 修改代码
6. 重新阅读代码，ultrathink，检查代码有没有问题
7. 如果代码有问题，不要直接改代码，而是重新进行步骤1，先把方案详细写下来，然后进行步骤2，以此类推。
如果要运行某种持续运行的服务，比如`npm run dev`，请你让用户在另一个命令行手动运行，而不是你来执行。
产品中不要使用emoji作为logo。
当你写项目中的CLAUDE.md的时候，把上面的指令复制一遍放在项目的CLAUDE.md中，以此作为重复提醒。