# 部署到 Vercel（免费公网访问）

本项目是 Vite + React 静态站点，构建后可通过 [Vercel](https://vercel.com) 免费部署，无需自备服务器。

## 一、准备工作

1. 注册 [GitHub](https://github.com) 账号
2. 注册 [Vercel](https://vercel.com) 账号（建议用 GitHub 登录）

## 二、推送代码到 GitHub

在项目根目录打开终端，执行：

```bash
git init
git add .
git commit -m "init: HΘΓΞ博客"
```

在 GitHub 新建一个仓库（例如 `my-blog`），然后：

```bash
git remote add origin https://github.com/你的用户名/my-blog.git
git branch -M main
git push -u origin main
```

> 如果本地已有 git 仓库，只需 `git add .` → `git commit` → `git push` 即可。

## 三、在 Vercel 部署

1. 打开 [vercel.com/new](https://vercel.com/new)
2. 点击 **Import Git Repository**，选择刚推送的 `my-blog` 仓库
3. 框架会自动识别为 **Vite**，保持默认配置：
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. 点击 **Deploy**，等待 1～2 分钟

部署完成后会得到公网地址，例如：

```
https://my-blog-xxx.vercel.app
```

把这个链接发给别人即可访问。

## 四、已配置项说明

项目根目录的 `vercel.json` 已包含：

- **构建命令**：`npm run build`
- **输出目录**：`dist`
- **SPA 路由回退**：访问 `/article/1` 等子路径不会 404

## 五、后续更新

本地改完代码后：

```bash
git add .
git commit -m "更新说明"
git push
```

Vercel 会自动重新构建并发布，无需手动操作。

## 六、本地预览构建结果

部署前可在本地验证：

```bash
npm run build
npm run preview
```

浏览器打开终端提示的地址（通常是 `http://localhost:4173`）。

## 七、本地 API 联调

前端已对接 `MiaoSure_B` 后端，开发时需同时启动两个服务：

```bash
# 终端 1：后端（需先启动 MongoDB）
cd D:\MiaoSure_B
npm start

# 终端 2：前端
cd D:\MiaoSure_F\my-blog
npm run dev
```

`vite.config.js` 已配置代理：`/api` → `http://localhost:3000`

生产环境可在 `.env.production` 中设置：

```
VITE_API_BASE=https://你的后端域名/api
```

## 八、备选平台

若 Vercel 访问不稳定，也可尝试：

| 平台 | 说明 |
|------|------|
| [Netlify](https://netlify.com) | 同样免费，导入 GitHub 仓库即可 |
| [Cloudflare Pages](https://pages.cloudflare.com) | 免费 CDN，全球访问较稳定 |

Netlify 需在 `public` 目录添加 `_redirects` 文件；Cloudflare Pages 构建命令填 `npm run build`，输出目录填 `dist`。
