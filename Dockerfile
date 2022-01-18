FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY ./tsconfig.json ./tsconfig.json
COPY ./src ./src
COPY ./doc ./doc
RUN mkdir -p ./logs/

CMD ["npm", "run", "start"]

