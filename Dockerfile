FROM node:20-slim AS base

# RUN rm -rf /etc/apt/sources.list && touch /etc/apt/sources.list \
#     && echo "deb http://mirrors.tuna.tsinghua.edu.cn/debian/ bullseye main contrib non-free" > /etc/apt/sources.list \
#     && echo "deb http://mirrors.tuna.tsinghua.edu.cn/debian/ bullseye-updates main contrib non-free" >> /etc/apt/sources.list \
#     && echo "deb http://mirrors.tuna.tsinghua.edu.cn/debian/ bullseye-backports main contrib non-free" >> /etc/apt/sources.list \
#     && echo "deb http://mirrors.tuna.tsinghua.edu.cn/debian-security bullseye-security main contrib non-free" >> /etc/apt/sources.list

# RUN apt-get update && apt-get install -y proxychains4 \
#     && rm -rf /var/lib/apt/lists/*

## Sharp dependencies, copy all the files for production
FROM base AS sharp
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

# If you want to build docker in China
RUN pnpm config set registry https://registry.npmmirror.com
RUN pnpm config set sharp_binary_host https://npmmirror.com/mirrors/sharp
RUN pnpm config set sharp_libvips_binary_host https://npmmirror.com/mirrors/sharp-libvips

RUN pnpm install sharp

## Install dependencies only when needed
FROM base AS builder
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

COPY package.json ./
COPY .npmrc ./

# To increase the memory limit for the Node.js process
ENV NODE_OPTIONS=--max_old_space_size=4096

# If you want to build docker in China
RUN pnpm config set registry https://registry.npmmirror.com

RUN pnpm install

COPY . .

# run build standalone for docker version
RUN pnpm run build:std

## Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=sharp --chown=nextjs:nodejs /app/node_modules/.pnpm ./node_modules/.pnpm

USER nextjs

EXPOSE 3210

# set hostname to localhost
ENV HOSTNAME "0.0.0.0"
ENV PORT 3210

# set default link urls
ENV SHOP_URL ""
ENV ABOUT_URL ""
ENV PRIVACY_URL ""

# General Variables
ENV ACCESS_CODE ""
ENV CUSTOM_MODELS ""
ENV AGENTS_INDEX_URL ""
ENV PLUGINS_INDEX_URL ""

# set default used agent config. this env had some bugs
#ENV DEFAULT_AGENT_CONFIG "model=gpt-4-1106-preview;params.max_tokens=1000;plugins=search-engine,lobe-image-designer"

# API Key selection method
ENV API_KEY_SELECT_MODE "random"

# enabled oauth provider set 1
ENV ENABLE_OAUTH_SSO ""
ENV SSO_PROVIDERS "github"
ENV GITHUB_CLIENT_ID ""
ENV GITHUB_CLIENT_SECRET ""

# enable Langfuse trace set 1
ENV ENABLE_LANGFUSE ""
ENV LANGFUSE_HOST=""
ENV LANGFUSE_SECRET_KEY ""
ENV LANGFUSE_PUBLIC_KEY ""

# OpenAI
ENV OPENAI_API_KEY ""
ENV OPENAI_PROXY_URL ""
ENV OPENAI_MODEL_LIST ""

# Azure OpenAI
ENV USE_AZURE_OPENAI ""
ENV AZURE_API_KEY ""
ENV AZURE_API_VERSION ""

# Google
ENV GOOGLE_API_KEY ""

# Zhipu
ENV ZHIPU_API_KEY ""

# Moonshot
ENV MOONSHOT_API_KEY ""

# Ollama
ENV OLLAMA_PROXY_URL ""
ENV OLLAMA_MODEL_LIST ""

# Perplexity
ENV PERPLEXITY_API_KEY ""

# Anthropic
ENV ANTHROPIC_API_KEY ""

# Mistral
ENV MISTRAL_API_KEY ""

# OpenRouter
ENV OPENROUTER_API_KEY ""
ENV OPENROUTER_MODEL_LIST ""

# 01.AI
ENV ZEROONE_API_KEY ""

# TogetherAI
ENV TOGETHERAI_API_KEY ""

# Minimax
ENV MINIMAX_API_KEY ""

# DeepSeek
ENV DEEPSEEK_API_KEY ""
#CMD ["node", "server.js"]

CMD if [ -n "$PROXY_URL" ]; then \
        export HOSTNAME="127.0.0.1"; \
        protocol=$(echo $PROXY_URL | cut -d: -f1); \
        host=$(echo $PROXY_URL | cut -d/ -f3 | cut -d: -f1); \
        port=$(echo $PROXY_URL | cut -d: -f3); \
        conf=/etc/proxychains.conf; \
        echo "strict_chain" > $conf; \
        echo "proxy_dns" >> $conf; \
        echo "remote_dns_subnet 224" >> $conf; \
        echo "tcp_read_time_out 15000" >> $conf; \
        echo "tcp_connect_time_out 8000" >> $conf; \
        echo "localnet 127.0.0.0/255.0.0.0" >> $conf; \
        echo "localnet ::1/128" >> $conf; \
        echo "[ProxyList]" >> $conf; \
        echo "$protocol $host $port" >> $conf; \
        cat /etc/proxychains.conf; \
        proxychains4 -f $conf node --no-deprecation server.js; \
    else \
        node --no-deprecation server.js; \
    fi
