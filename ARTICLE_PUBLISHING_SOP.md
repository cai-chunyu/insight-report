# 新文章发布标准操作流程 (SOP)

本文档详细说明了从创建 HTML 文件到文章上线的完整流程。

## 前置条件
- 您已经创建了两个 HTML 文件（中英文版本）
- 初始文件名格式：`20250106.html`（示例）
- 文件已放置在正确的目录：
  - `/public/articles/en/20250106.html`
  - `/public/articles/zh/20250106.html`

## 📋 完整发布流程

### 第一步：分析文章内容，确定 SEO 文件名

1. **打开两个 HTML 文件，提取关键信息**：
   ```bash
   # 查看文章标题
   grep -i "<title>" public/articles/*/20250106.html
   ```

2. **根据内容确定 SEO 友好的文件名**：
   - 分析文章主题和关键词
   - 创建描述性文件名，例如：
     - `ai-content-creation-guide.html`
     - `blockchain-security-analysis.html`
     - `ecommerce-trends-2025.html`

3. **文件名规则**：
   - 使用小写字母
   - 使用连字符分隔单词
   - 3-5 个单词为宜
   - 包含核心关键词

### 第二步：重命名文件

1. **执行重命名命令**：
   ```bash
   # 重命名英文版
   mv public/articles/en/20250106.html public/articles/en/[new-seo-name].html
   
   # 重命名中文版
   mv public/articles/zh/20250106.html public/articles/zh/[new-seo-name].html
   ```

2. **验证重命名成功**：
   ```bash
   ls public/articles/*/[new-seo-name].html
   ```

### 第三步：更新首页文章列表

1. **编辑 `src/app/page.tsx`**

2. **在 `articlesData` 对象中添加新文章**：
   ```typescript
   const articlesData = {
     en: [
       {
         id: '[new-seo-name]',  // 不含 .html
         title: '[从 HTML 中提取的英文标题]',
         date: 'YYYY-MM-DD',  // 发布日期
         path: '/articles/en/[new-seo-name]'
       },
       // ... 其他文章
     ],
     zh: [
       {
         id: '[new-seo-name]',  // 与英文版相同
         title: '[从 HTML 中提取的中文标题]',
         date: 'YYYY-MM-DD',  // 与英文版相同
         path: '/articles/zh/[new-seo-name]'
       },
       // ... 其他文章
     ]
   };
   ```

3. **注意事项**：
   - 新文章通常添加在数组开头（最新的在前）
   - 确保日期格式为 `YYYY-MM-DD`
   - id 使用文件名（不含 .html）
   - path 要包含完整路径

### 第四步：检查文章 HTML 质量和相应SEO

1. **验证 HTML 结构**：
   - 确保有 `<title>` 标签
   - 确保有 `<meta charset="UTF-8">`
   - 确保有 `<meta name="viewport">`

2. **检查是否需要优化**：
   - 是否有过多的内联 CSS/JS
   - 图片是否优化
   - 是否有外部依赖
