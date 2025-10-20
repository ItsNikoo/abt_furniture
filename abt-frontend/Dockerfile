FROM node:22-alpine AS builder

WORKDIR /app

# Accept API base URL at build time for client bundle
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

# Сначала копируем только конфигурационные файлы
COPY package*.json ./
COPY tsconfig.json ./
COPY next.config.ts ./
COPY .env ./

# Устанавливаем зависимости
RUN npm ci

# Затем копируем остальные файлы
COPY . .

# Проверяем структуру файлов (для отладки)
RUN find . -name "react-query-client*" -type f || echo "react-query-client not found"
RUN find . -name "products*" -type f || echo "products not found"

# Сборка приложения
RUN npm run build

FROM node:22-alpine AS runner

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

WORKDIR /app

# Копируем standalone приложение
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Копируем node_modules если нужно
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
