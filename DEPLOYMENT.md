# 🚀 网页与贺卡极速生成平台 — 生产环境部署说明书

本平台是一个基于 **React 18 + Vite** 开发的模块化自适应静态网页与贺卡平台。在打包后，它所生成的网页是 **100% 纯净的静态 HTML / CSS / JS 资源**。

为了将其部署到您自己的服务器，我们强烈推荐**在本地电脑构建打包好后，将生成的静态文件传输到服务器部署**。这能极大节省您服务器的 CPU 消耗与磁盘带宽（特别是对于 1核2G 等轻量云服务器）。

---

## 🧭 方式一：最佳实践（本地构建，部署静态资产到服务器）

该方式**最安全、最省服务器资源、最简单**。服务器无需安装 Node.js、Vite 或依赖包，只需安装极轻量的 Web 服务器软件（如 **Nginx**、**Apache** 或 **Caddy** ）。

### 步骤 1：本地准备与打包
在您的个人电脑（Windows / macOS / Linux）上打开终端：

1. **安装 Node.js 运行环境**：
   确保您的电脑上安装了 Node.js （推荐 LTS v18 或 v20+）。
2. **下载并解压项目代码**。
3. **安装依赖依赖包**：
   ```bash
   npm install
   ```
4. **编译构建静态资产**：
   ```bash
   npm run build
   ```
   * 构建完成后，项目根目录下会生成一个名为 **`dist`** 的文件夹。
   * 这个 `dist` 文件夹中包含了经过体积压缩、代码混淆和优化的全部网页静态资源（含 `index.html`、CSS 样式、JS 脚本以及预置的静态 SVG 图片等）。

---

### 步骤 2：将 `dist` 文件夹上传到服务器
使用您熟悉的工具（如 SCP、SFTP、FileZilla 或宝塔面板）将本地打包生成的 `dist` 文件夹**所有内容**，完整上传到您的云服务器目录中。
例如放置于：`/www/wwwroot/your-site`

---

### 步骤 3：配置服务器 Web 容器（以 Nginx 为例）
在您的云服务器上，编辑 Nginx 配置文件（通常位于 `/etc/nginx/nginx.conf` 或 `/etc/nginx/conf.d/` 路径下），在 `server` 块中配置静态资源托管：

```nginx
server {
    listen 80;
    server_name yourdomain.com; # 替换为您的域名/公网IP

    # 指向您刚刚上传的绝对路径
    root /www/wwwroot/your-site; 
    index index.html;

    # 完美适配单页路由 SPA 配置
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 启用 Gzip 极速载入静态资源
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
    gzip_min_length 1024;
}
```
保存配置后，在服务器终端执行 Nginx 重载命令：
```bash
nginx -s reload
```
至此，您就可以直接通过公网 IP 或域名访问您精美的网站和贺卡了！

---

## 🌐 方式二：在独立静态托管云平台一键部署（零费用推荐）

因为本系统构建的是**全静态网页、极致轻量**，您可以直接将代码拖拽上传至以下免费的全球静态云托管平台，不仅不需要准备服务器，还自带 **免费 SSL 证书及全球 CDN 加速**：

### ☁️ 推荐托管渠道 1：Vercel / Netlify
1. 注册并登录 [Vercel](https://vercel.com/)。
2. 将代码关联到您的 GitHub 仓库并导入，或者在本地电脑安装 Vercel CLI：
   ```bash
   npm i -g vercel
   vercel
   ```
3. 平台会自动识别这是 Vite 项目，选择默认配置。点击 **Deploy** 即可一键生成属于您的安全公网链接！

### ☁️ 推荐托管渠道 2：GitHub Pages
1. 创建一个公有 GitHub 仓库，并利用 Git 客户端将代码推送至仓库。
2. 在仓库的 **Settings** -> **Pages** 页面，设置部署分支为 `gh-pages`，或者配置一个专用的 GitHub Action 工作流。每次推送，GitHub 均会自动为您免费构建并发布。

---

## 🛠️ 方式三：直接在服务器上实时动态构建（不推荐）

如果您希望直接在服务器端托管代码，通过监控仓库自动拉取并使用服务器的算力进行打包，可以通过以下全生命周期步骤在服务器上构建：

1. **登录您的服务器**，确保服务器已安装 `git` 和 `node`（推荐 v18+）。
2. **下载克隆代码**：
   ```bash
   git clone <您的代码仓库地址>
   cd <项目目录>
   ```
3. **安装依赖并打包**（每次更新代码代码均需重复此步）：
   ```bash
   npm install
   npm run build
   ```
4. **使用 Nginx 指向打包生成的 `dist` 文件夹**（同 *方式一：步骤3* ）。

> ⚠️ **为什么强烈不推荐在轻量级服务器（1核1G、1核2G）上直接运行打包？**
> * Vite 打包时由多线程进行压缩优化，瞬间 CPU 和内存消耗极大。
> * 如果服务器配置较低，或者已经运行了数据库，在执行 `npm run build` 瞬间可能因为高并发或内存限制（Out of Memory）导致 **构建崩溃、卡死甚至服务器直接失联**。
> * 因此，在本地打包出 `dist` 后上传是国际上对静态网页项目的绝对主流与最佳实践。

---

## 💡 本地导出 “已生成网页/贺卡” 的离线预览包如何处理？

在浏览器中使用本系统的一键导出功能（例如导出 HTML / 下载贺卡）：
1. 导出的 HTML 文件采用的是本地单文件，已内置全部基础动画和本地静态结构依赖。
2. 即使没有服务器，直接把它发送给您的朋友，他们在电脑上**双击此 `.html` 文件**，即可通过浏览器 100% 离线完美播放动效和背景音乐。
3. 若要将它发布出去给更多人访问，只需将该导出的 `index.html` 放入前述 Web 服务器中即可，非常具有可移植性！

---

## ⚡ 常见本地构建错误与排坑指南 (Windows Focus)

### 1. 报错：`'-xxxx\node_modules\.bin\' 不是内部或外部命令，也不是可运行的程序` 或 `Cannot find module 'vite.js'`
*   **原因**：您的本地项目父文件夹路径名称中包含了 Windows 敏感特殊字符（如 **`&`** 符号）。例如：`C:\Users\cyber\Desktop\modular-web-&-greeting-card-builder`。这会导致 Windows 命令行解释器截断该脚本路径，误将前半截当作目录，后半截当作独立脚本执行。
*   **修复方案**：
    1. 关闭所有终端窗口。
    2. 将包含 `&` 的父文件夹重新命名为类似 `modular-web-greeting-card-builder` （去掉 `&`，最好只含字母、数字和中划线）。
    3. 重新打开终端，并运行 `npm install` 与 `npm run build`。

### 2. 本地执行 `npm install` 时报版本冲突 (EROLVE Overriding Peer Dependency)
*   **原因**：由于本地全局 Node 版本和 React 18/19 多版本共存产生的包依赖对齐警告。
*   **修复方案**：
    使用强制依赖覆盖参数进行安全安装：
    ```bash
    npm install --legacy-peer-deps
    ```

