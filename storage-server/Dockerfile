FROM node:20-alpine

WORKDIR /app

COPY package.json ./
RUN npm install --omit=dev

COPY server.js ./

VOLUME ["/app/uploads"]

EXPOSE 8787

CMD ["node", "server.js"]
