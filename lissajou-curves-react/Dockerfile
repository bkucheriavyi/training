# build environment
FROM node:10.15.1 as builder
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package.json /usr/src/app/package.json
RUN npm install --silent
##Bug fix workearound https://github.com/facebook/create-react-app/issues/6334
RUN npm install terser@3.14.1 --save-dev
COPY . /usr/src/app
RUN npm run-script build

# production environment
FROM nginx:1.13.9-alpine
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]