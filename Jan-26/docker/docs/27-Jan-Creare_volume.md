## Create Volume :

docker volume create myvol (createa)

docker volume ls (list volume)

docker run -d --name voltest -v myvol:/app nginx:latest

docker exec -it voltest bash (connect to insrance via bash)

apt-get update 

apt-get install nano 

cd app

nano text.txt 

write something in text.txt and save it 

write exit to exit bash 

and stop container and remove 

docker stop voltest 

docker rm voltest

run it again 

docker run -d --name voltest -v myvol:/app nginx:latest

and go in instance agian using bash in /app check is text.txt exist 

### clearup:
docker stop voltest 

docker rm voltest

docker volume rm myvol

