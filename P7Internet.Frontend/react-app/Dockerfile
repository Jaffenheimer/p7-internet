FROM node:alpine
COPY ["P7Internet.Frontend/", "P7Internet.Frontend/"]
WORKDIR P7Internet.Frontend/react-app/

RUN npm install
RUN npm run-script build

#Copy files from GitHub to nginx container
FROM nginx:alpine

WORKDIR /src

COPY ["P7Internet.Frontend/react-app/public", "/usr/share/nginx/"]
# COPY P7Internet.Frontend/react-app/build/ 

# CMD ["npm", "start"]
