FROM node:lts-alpine

# делаем каталог 'app' текущим рабочим каталогом
WORKDIR /app

# копируем оба 'package.json' и 'package-lock.json' (если есть)
COPY package*.json ./

# устанавливаем зависимости проекта
RUN npm install

# копируем файлы и каталоги проекта в текущий рабочий каталог (т.е. в каталог 'app')
COPY . .

# задаем адрес API как переменную окружения
ARG VITE_APP_API_URL
ENV VITE_APP_API_URL=$VITE_APP_API_URL

# собираем приложение для production с минификацией
RUN npm run build
