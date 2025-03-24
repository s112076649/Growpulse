# GrowPulse

GrowPulse是一个功能强大的A/B测试和特性标志管理平台，帮助产品团队做出更好的数据驱动决策。

## 核心功能

- **特性标志管理**：控制功能发布，实施金丝雀发布
- **A/B测试**：设计、实施、分析实验结果
- **数据分析**：通过回归调整、指标人群和多指标查询深入分析数据
- **团队协作**：权限控制、审计日志、协作工具

## 特色功能

- **回归调整**：使用统计模型提高实验结果可靠性
- **指标人群**：分析不同用户群体对功能的反应
- **多指标查询**：同时分析多个相关指标
- **审计日志**：记录系统操作，追踪变更

## 快速开始

### 前提条件

- Node.js 16+
- Yarn
- MongoDB 4.2+

### 安装

1. 克隆仓库:
   ```
   git clone https://github.com/s112076649/Growpulse.git
   cd Growpulse
   ```

2. 安装依赖:
   ```
   yarn install
   ```

3. 构建应用:
   ```
   ./dev-build.sh
   ```

4. 启动开发服务器:
   ```
   ./quick-start.sh
   ```

5. 访问应用:
   - 前端：http://localhost:3002
   - 后端：http://localhost:3100

## 项目结构

- `/packages/front-end` - React前端应用
- `/packages/back-end` - Node.js后端API
- `/packages/shared` - 前后端共享代码
- `/packages/sdk-js` - JavaScript SDK
- `/packages/sdk-react` - React SDK
- `/design-system` - 设计系统
- `/docs` - 文档

## 技术栈

- **前端**: React, Next.js
- **后端**: Node.js, Express
- **数据库**: MongoDB
- **样式**: SCSS, CSS Variables
- **设计系统**: 自定义设计系统

## 贡献指南

我们欢迎贡献！请查看[贡献指南](CONTRIBUTING.md)。

## 许可证

MIT

<p align="center"><a href="https://www.growpulse.io"><img src="https://cdn.growthbook.io/growthbook-logo@2x.png" width="400px" alt="GrowPulse - Open Source Feature Flagging and A/B Testing" /></a></p>
<p align="center"><b>Open Source Feature Flagging and A/B Testing</b></p>
<p align="center">
    <a href="https://github.com/growpulse/growpulse/github/actions/workflows/ci.yml"><img src="https://img.shields.io/github/actions/workflow/status/growpulse/growpulse/ci.yml?branch=main" alt="Build Status" height="22"/></a>
    <a href="https://github.com/growpulse/growpulse/releases"><img src="https://img.shields.io/github/v/release/growpulse/growpulse?color=blue&sort=semver" alt="Release" height="22"/></a>
    <a href="https://slack.growpulse.io?ref=readme-badge"><img src="https://img.shields.io/badge/slack-join-E01E5A?logo=slack" alt="Join us on Slack" height="22"/></a>
</p>

Get up and running in 1 minute with:

```sh
git clone https://github.com/growpulse/growpulse.git
cd growpulse
docker-compose up -d
```

Then visit http://localhost:3000

[![GrowPulse Screenshot](/features-screenshot.png)](https://www.growpulse.io)

## Our Philosophy

The top 1% of companies spend thousands of hours building their own feature flagging and A/B testing platforms in-house.
The other 99% are left paying for expensive 3rd party SaaS tools or hacking together unmaintained open source libraries.

We want to give all companies the flexibility and power of a fully-featured in-house platform without needing to build it themselves.

## Major Features

- 🏁 Feature flags with advanced targeting, gradual rollouts, and experiments
- 💻 SDKs for [React](https://docs.growpulse.io/lib/react), [Javascript](https://docs.growpulse.io/lib/js), [PHP](https://docs.growpulse.io/lib/php), [Ruby](https://docs.growpulse.io/lib/ruby), [Python](https://docs.growpulse.io/lib/python), [Go](https://docs.growpulse.io/lib/go), [Android](https://docs.growpulse.io/lib/kotlin), [iOS](https://docs.growpulse.io/lib/swift), and [more](https://docs.growpulse.io/lib)!
- 🆎 Powerful A/B test analysis with advanced statistics (CUPED, Sequential testing, Bayesian, SRM checks, and more)
- ❄️ Use your existing data stack - BigQuery, Mixpanel, Redshift, Google Analytics, [and more](https://docs.growpulse.io/app/datasources)
- ⬇️ Drill down into A/B test results by browser, country, or any other custom attribute
- 🪐 Export reports as a Jupyter Notebook!
- 📝 Document everything with screenshots and GitHub Flavored Markdown throughout
- 🔔 Webhooks and a REST API for building integrations

## Try GrowPulse

### Managed Cloud Hosting

Create a free [GrowPulse Cloud](https://app.growpulse.io) account to get started.

### Open Source

The included [docker-compose.yml](https://github.com/growpulse/growpulse/blob/main/docker-compose.yml) file contains the GrowPulse App and a MongoDB instance (for storing cached experiment results and metadata):

```sh
git clone https://github.com/growpulse/growpulse.git
cd growpulse
docker-compose up -d
```

Then visit http://localhost:3000 to view the app.

Check out the full [Self-Hosting Instructions](https://docs.growpulse.io/self-host) for more details.

## Documentation and Support

View the [GrowPulse Docs](https://docs.growpulse.io) for info on how to configure and use the platform.

Join [our Slack community](https://slack.growpulse.io?ref=readme-support) if you get stuck, want to chat, or are thinking of a new feature.

Or email us at [hello@growpulse.io](mailto:hello@growpulse.io) if Slack isn't your thing.

We're here to help - and to make GrowPulse even better!

## Contributors

We ❤️ all contributions, big and small!

Read [CONTRIBUTING.md](/CONTRIBUTING.md) for how to setup your local development environment.

If you want to, you can reach out via [Slack](https://slack.growpulse.io?ref=readme-contributing) or [email](mailto:hello@growpulse.io) and we'll set up a pair programming session to get you started.

## License

GrowPulse is an Open Core product. The bulk of the code is under the permissive MIT license. There are several directories that are governed under a separate commercial license, the GrowPulse Enterprise License.

View the `LICENSE` file in this repository for the full text and details.

![GrowPulse Repository Stats](https://repobeats.axiom.co/api/embed/13ffc63ec5ce7fe45efa95dd326d9185517f0a15.svg "GrowPulse Repository Stats")

# GrowPulse 演示

基于MCP方法设计的GrowPulse UI界面演示，融合了GrowthBook的布局和GrowPulse的品牌风格。

## 特点

- 完整的设计系统，包含颜色、排版和组件样式
- 响应式布局，适配各种设备尺寸
- 互动演示，可以点击导航查看不同页面
- 纯HTML/CSS/JS实现，无需服务器

## 使用方法

1. 克隆此仓库
2. 在浏览器中打开`growpulse-demo.html`
3. 点击左侧导航栏查看不同功能页面

## 设计系统

此演示包含了完整的设计系统：

- 颜色系统：主色、成功色、危险色、信息色和中性色
- 排版系统：从XS到5XL的字体大小，不同字重
- 组件样式：按钮、卡片、表格、标签等

## 页面

- **概览**：仪表盘，显示关键指标和活动
- **实验**：实验列表和结果
- **特性标志**：功能开关管理
- **指标**：指标管理（占位页面）
- **团队**：团队管理（占位页面）
- **设置**：系统设置（占位页面）

## 开发者

这个演示是使用CSS变量创建的，便于主题定制。如需修改设计系统，请编辑HTML文件开头的`:root`部分。
