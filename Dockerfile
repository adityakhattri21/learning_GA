FROM node

WORKDIR /usr/share/app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm","run","dev"]