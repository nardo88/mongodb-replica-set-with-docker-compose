FROM mongo:latest

# Установка необходимых пакетов
RUN apk add --no-cache mongo-tools
