# ──────────────────────────────────────────────
# Build de producción para NestJS
# ──────────────────────────────────────────────
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# ──────────────────────────────────────────────
# Imagen final liviana
# ──────────────────────────────────────────────
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY package*.json ./
COPY .env .env
RUN npm install --omit=dev

EXPOSE 3269
ENV NODE_ENV=production
CMD ["node", "dist/main.js"]