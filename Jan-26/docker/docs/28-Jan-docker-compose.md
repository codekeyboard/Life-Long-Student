Multi Containers App:

- Frontend
- backend
- Redis Cache

Should we run each one seperately or run with single file so that all containers run at once.


Docker Compose:

Define and run Multiple containers applications.

Define using YAML files.

Run using docker CLI with the compose plugin 

Docker compose 

Docker Compose FIle:

```
version: '3.9'

service:
  webapi1:
    image: academy.azurecr.io/webapi1
    ports:
      - '8081:80'
    restart: always

  webapi2:
    service:
      webapi1:
        image: academy.azurecr.io/webapi2
        ports::
          - '8082:80'
        restart: always

  apigateway:
    image: academy.azurecr.io/apigateway
    ports:
      - '80:80'
    restart: always

```

Dcoker compose use cases:

Workload that do not requires full orchestrator.

Development and tests

Use of service that can run Docker compose. 

1- Azure app service

2- AWS ECS

3- Vistual Machine 

---

## Docker Cheat-Sheet

`docker compose build` (build the images)
and use -f is docker file is in another folder.

`docker compose start` (start the container)

`docker compose stop` (stop the container)

`docker compose up -d `  (build and start both)

`docker compose ps` (list what is running)

`docker compose rm` (remove from memory)

`docker compose down` (stop and remove)

`docker compose logs` (get the logs)

`docker compose exec [cotainer] bash` (run a command in a container)


---

## Compose V2 Commands

`docker compose --project-name test1 up -d` (run an instance as a project)

`docker compose -p test1 up -d` (run an instance as a project)-> shortcut

`docker compose ls` (list running project)

`docker comopse cp [containerID] [SRC-PATH]:[DEST-PATH]` (copy files from the container)

`docker compose cp [SRC-PATH][containerID]:[DEST-PATH]` (copy file to the container)

