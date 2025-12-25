FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

# Install dependencies (CI preferred for lockfile consistency)
RUN npm ci || npm install

COPY . .

RUN npm run build

EXPOSE 3000
ENV PORT=3000

CMD ["npm", "run", "start"]