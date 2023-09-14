FROM node:20-alpine
WORKDIR /client
COPY ./package*.json ./
RUN npm install
RUN npm install -g http-server
COPY . .
RUN npm run build
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]