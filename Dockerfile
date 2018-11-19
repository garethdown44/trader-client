FROM node:8.9.4

EXPOSE 8080

COPY . .

RUN npm install
RUN node build-html.js
RUN node build.js

CMD node dist-server.js