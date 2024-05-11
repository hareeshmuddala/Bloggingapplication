FROM node:22.1.0-bullseye-slim
WORKDIR /app

COPY  package.json /app/

RUN npm install

COPY . /app/

CMD [ "npm", "run", "dev" ]