## Volumes:

### Cheet Sheet:

`docker create volume [volumeName]` (Create Volume)

`docker volume ls` (lists thr volume)

`docker volume inspet [volumeName]` (inspect volume info)

`docker volume rm [volumeName]` (deletes a volume)

`docker volume prune` (deletes all volume not mounted)

## Create Volume:

`docker volume create myvol`

`docker volume inspect myvol`

`docker volume ls`

run container with volume

`docker run -d --name devtest -v myvol:/app nginx:latest`

attach volume with container via -v and /app attach local folder with volume

for local we can specify local folder not for production

`docker run -d --name devtest -v d:/test:/app nginx:latest`


