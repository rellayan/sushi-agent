# 苏轼智能体

## 准备环境

1. 参照文档 https://docs.near.ai/agents/quickstart/#setup，下载 NEAR AI CLI 并登录

```bash
python3 -m pip install nearai
nearai login
```

2. 配置环境变量：将 `.env.example` 复制到 `.env`

```bash
cp .env.example .env
```

## 安装并启动智能体

```bash
pnpm i && pnpm start
```

注意: 安装和运行时，Node.js 版本需要的最低版本是 v22
