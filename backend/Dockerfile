FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

# Install dependencies (CI preferred for lockfile consistency)
RUN npm ci || npm install

COPY . .

EXPOSE 8000
ENV PORT=8000

CMD ["npm", "start"]