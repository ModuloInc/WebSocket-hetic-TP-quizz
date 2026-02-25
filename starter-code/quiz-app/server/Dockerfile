FROM node:20-alpine

WORKDIR /app

COPY server/package*.json ./server/
RUN npm install --prefix server

COPY server ./server
COPY packages ./packages

EXPOSE 3001

CMD ["npm", "run", "dev", "--prefix", "server"]
