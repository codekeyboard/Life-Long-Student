Run Nginx Container:

`docker run -d -p 8080:80 --name nginxserver nginx `

nginx server would start runing on local port 8080 maps to tcp/80.

`docker ps`

`docker images`

`docker container exec -it nginxserver bash` (go inside shell for that container)

`docker stop nginxserver` 

`docker rm nginxserver` (removed from memoery)

`docker rmi nginx` (remove image)
