#########################
### build environment ###
#########################

# base image
FROM node:dubnium as builder

# set working directory
RUN mkdir -p /usr/src/dws-web-client
WORKDIR /usr/src/dws-web-client

# install and cache app dependencies
COPY package*.json /usr/src/dws-web-client/
RUN npm install

# add app
COPY . /usr/src/dws-web-client/

# generate build
RUN npm run-script build:prod

##################
### production ###
##################

# base image
FROM nginx:1.15-alpine

# Removing nginx default page
RUN rm -rf /usr/share/nginx/html/*

# Copying nginx configuration.
COPY /nginx/nginx.conf /etc/nginx/conf.d/default.conf

# copy artifact build from the 'build environment'
COPY --from=builder /usr/src/dws-web-client/dist /usr/share/nginx/html

# expose port 80
EXPOSE 80

# run nginx
CMD ["nginx", "-g", "daemon off;"]
