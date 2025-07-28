FROM node:16
COPY . /portal
WORKDIR /portal
RUN npm install
RUN npm run build
CMD ["npx", "next", "start"]