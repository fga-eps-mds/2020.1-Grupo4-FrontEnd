FROM node:13.12.0-alpine as build
WORKDIR /

ENV NODE_ENV=production

RUN npm install react-scripts@3.4.1 -g --silent

COPY package*.json ./
RUN npm ci --silent

COPY . ./
EXPOSE 3000

CMD ["npm", "start"]