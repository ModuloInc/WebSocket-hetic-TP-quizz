FROM node:20-alpine

WORKDIR /app

COPY player-app/package*.json ./player-app/
RUN npm install --prefix player-app

COPY player-app ./player-app
COPY packages ./packages

EXPOSE 5174

CMD ["npm", "run", "dev", "--prefix", "player-app", "--", "--host", "0.0.0.0", "--port", "5174"]
