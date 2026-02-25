FROM node:20-alpine

WORKDIR /app

COPY host-app/package*.json ./host-app/
RUN npm install --prefix host-app

COPY host-app ./host-app
COPY packages ./packages

EXPOSE 5173

CMD ["npm", "run", "dev", "--prefix", "host-app", "--", "--host", "0.0.0.0", "--port", "5173"]
