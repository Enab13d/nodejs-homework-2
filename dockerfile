FROM node

WORKDIR /app

COPY . /app/

RUN npm i

EXPOSE 3333

CMD [ "node", "server" ]