Docker file for running node app

FROM alpine -> loads image
RUN apk add -update nodejs nodejs-npm -> install nodejs and npm 
COPY . /src -> copy current folder in /src in container
WORKDIR /src
RUN npm install -> run command for npm install deps
EXPOSE 8080 -> specify port 
ENTRYPOINT ["node", "./app.js"] -> tells what to run 

BUilding 


 Node project in practive/node/contextplaceholder/backend/

 Go in command palatte ctrl+shft+p

click on docker add files

and add docker files in backend package.json 

build docker

in command palatte enetre docker build image and create image with port 3000

of by command 

`docker build -t backend:latest .`

than run image using command palatte docker run image 

selelct image  

or with commnad in terminal 

`docker run -d -p 8010:3000 --name backend_test backend:latest`

than test using curl commnad in terminal or by `docker ps` in terminal you can see runnig images check if backend_test is present and running if any error that can check by running `docker ps -a`

to stop 

run commmnad 

`docker stop backend_test`

and for again start 

`docker start backend_test`


