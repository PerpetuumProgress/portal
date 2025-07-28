FROM node:18
COPY . /portal
WORKDIR /portal
RUN npm install
RUN npm run build
CMD ["npx", "next", "start"]