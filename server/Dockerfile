FROM node:latest
WORKDIR /usr/spendshare
COPY package.json /usr/spendshare/
RUN npm install
COPY . /usr/spendshare
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait
EXPOSE 3000
CMD /wait && npm start
