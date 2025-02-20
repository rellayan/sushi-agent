# 苏轼智能体

“杭州老市长”东坡先生苏轼既是大文豪，又是美食家、旅行家...... 我们或许已经看过很多有关苏东坡的文章和节目，比如央视的《唐宋八大家》系列，也在博物馆了解了很多和东坡先生有关的景观和事迹，但是我们无法穿越到过去和苏轼交流。如果能够和苏轼直接对话，让他教我们做菜，带我们观光，引领我们品读古代的名篇佳作，那该有多好?

苏轼智能体借助 DeepSeek 大语言模型 (LLM) 开发了一个具备苏轼的性格特点、语言风格和知识经验的 AI 智能体，帮助我们与东坡先生进行穿越古今的人生对话。

一起来与苏轼交谈吧：🔗 https://sushi-agent-client.onrender.com

<img width="1460" alt="image" src="https://github.com/user-attachments/assets/dca2701a-79d3-4276-8646-082d92907017" />

## 项目设计

在 DeepSeek 开源大模型的基础上，根据历史人物苏轼的性格特点、知识经验等实现智能体，并进行智能体前端页面开发、尝试文字和语音互相转换等，使我们可以直接和东坡先生“面对面”进行对话交流。

技术方案

1. 采用 [Eliza](https://elizaos.github.io/eliza/) 模块化的智能体框架，实现了 Agent 描述，基于 [elizaOS/eliza-starter](https://github.com/elizaOS/eliza-starter) 模板开发
2. 使用 [NEAR AI](https://docs.near.ai/) 模型服务来调用 Agent LLM 接口，支持主流开源大模型如 Llama、QWen、DeepSeek 等。但考虑到需要基于 Eliza 前端模板修改，没有使用 NEAR AI 的 Agent 部署服务
3. 背后调用的是 [DeepSeek v3](https://github.com/deepseek-ai/DeepSeek-v3) 开源大模型，为了提升响应速度，部署时没有使用 DeepSeek R1，但是效果仍然不错，以后可以根据需要切换模型
4. 前端开发使用 [React 框架](https://github.com/facebook/react)
5. 后端开发使用 [Node.js](https://github.com/nodejs/node)（版本需要是 v22 或以上）

代码实现

1. 苏轼智能体相关的描述代码主要在 [src](src) 文件夹和[src/character.ts](src/character.ts) 文件当中，包括人物背景和涉及话题等。特别地，为了使人物更真实，要求苏轼对于北宋以后的世界不了解，这与一般智能体要求不同
2. 为了接入 NEAR AI 模型服务，在 [src/config](src/config/index.ts) 当中进行了修改，主要包括 API Key 的查询等
3. 前端代码为展示苏轼形象和实现交互对话，对 [client](client) 当中的不同组件进行了修改，是在 [elizaos/eliza](https://github.com/elizaOS/eliza/tree/main/client) 的代码基础上做的改进
4. 语音播报的修改主要在 [client/src/components/ui/chat/chat-tts-button.tsx](client/src/components/ui/chat/chat-tts-button.tsx) 当中，主要修复了语音播报无效的问题。但由于 Eleven Labs 语音模型对中文支持不完善，在线的版本中没有开启，可以根据以下步骤打开。

## 准备环境

1. 参照文档 https://docs.near.ai/agents/quickstart/#setup, 下载 NEAR AI CLI 并登录

```bash
python3 -m pip install nearai
nearai login
```

2. 配置环境变量，将 `.env.example` 复制到 `.env`

```bash
cp .env.example .env
```

3. 语音播报功能

如果需要开启语音播报功能，需要在 [Eleven Labs](https://elevenlabs.io/) 注册后，获得 API key，添加 `ELEVENLABS_XI_API_KEY` 变量。然后在 [client/src/components/ui/chat/chat-tts-button.tsx](client/src/components/ui/chat/chat-tts-button.tsx) 在第39行根据说明修改代码。


## 安装并启动

> 注意: 安装和运行时，Node.js 版本需要的最低版本是 v22

1. 安装 Node.js 和 pnpm

在 https://nodejs.org/ 下载安装包，安装 Node.js。

打开命令行窗口，运行命令安装 pnpm 和依赖的包

```bash
# 下载 pnpm
npm i -g pnpm

# 安装依赖
pnpm install
cd client & pnpm install & cd ..
```

2. 启动智能体服务

在一个命令行窗口，启动服务，运行在 http://localhost:3030

```bash
pnpm start
```

3. 启动智能体前端

在一个新的命令行窗口，启动前端，可以在 http://localhost:5173 用浏览器打开前端页面

```bash
pnpm start:client
```

前端正式部署使用了 [Render](https://render.com/)
