FROM node:12.17.0-alpine

WORKDIR /app
COPY package*.json ./
COPY . .
RUN ls
RUN npm install
RUN npm run build

FROM node:12.17.0-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY --from=0 /app/build ./build
EXPOSE 3000
CMD node /app/build/index.js