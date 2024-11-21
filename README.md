# Quote Bot Modified

Telegram quote bot

修改自 https://github.com/LyoSU/quote-bot

## 内容

- 使用 `prebuilt-tdlib`, **无需自行编译 tdlib**
- 删除广告和赞助 (adv, donate)
- 删除状态统计和无意义的日志 (stats)
- 删除 AI 功能 (openai)
- 删除全局贴纸包相关功能 (globalStickerSet, ioredis)
- 更好的中文翻译
- 开箱即用 docker 镜像

## docker compose 部署

### 已有 MongoDB

下载 [docker-compose.yml](https://raw.githubusercontent.com/krau/quote-bot/main/docker-compose.yml) 文件

复制 `.env.example` 为 `.env` 并修改其中的配置项

在同目录下新建 `data/fonts` 文件夹，将字体文件放入其中

```bash
docker compose up -d
```

### 无 MongoDB

```yaml
services:
  bot:
    image: ghcr.io/krau/quote-bot:main
    restart: always
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
    env_file: .env
    command: node index.js
    depends_on:
      - mongodb
  api:
    image: ghcr.io/lyosu/quote-api:latest
    restart: always
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
    env_file: .env
    command: node index.js
    volumes:
      - ./data/fonts:/app/assets/fonts
  mongodb:
    image: mongo:latest
    restart: always
    volumes:
      - ./data/db:/data/db
```

复制 `.env.example` 为 `.env` 并修改其中的配置项

在同目录下新建 `data/fonts` 文件夹，将字体文件放入其中

```bash
docker compose up -d
```
