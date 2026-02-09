docker compose build


docker compose up -d 

docker compose ps to check running containers


for checking logs 

docker compose logs -f 

for backend 

docker compose log -f backend

same for frontend and db individually 

docker compose down for stopping 

when docker compose down it will remove volumes it will still there 

you can check by docker compose vomues

to remove them  you can use the docker extension added in vs code 

or by 

docker volume rm [volumename]