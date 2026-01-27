
## What is Docker?

Docker is a platform that lets you package an application with everything it needs, including code, libraries and dependencies, and run it anywhere as a container.

**In short**
Build once → Run anywhere

```
Your App
   ↓
Docker Image
   ↓
Run Image
   ↓
Docker Container
```

---

## Using Docker on Debian

### Basic Setup Steps

1. Install Docker from the official Docker website for Debian
2. Create an account on Docker Hub to store and download images
3. Install an IDE such as Visual Studio Code for working with Dockerfiles and projects
4. Many ready-made images are available on Docker Hub. You can download them and customize them for your needs

---

## Basic Docker Terminal Commands

### Docker Info

| Command          | Purpose                                     |
| ---------------- | ------------------------------------------- |
| `docker info`    | Shows details about the Docker installation |
| `docker version` | Shows the installed Docker version          |
| `docker login`   | Log in to Docker Hub                        |

---

### Running and Stopping Containers

| Command                        | Purpose                                     |
| ------------------------------ | ------------------------------------------- |
| `docker pull [imageName]`      | Download an image from Docker Hub           |
| `docker run [imageName]`       | Run an image as a container                 |
| `docker run -d [imageName]`    | Run container in detached mode (background) |
| `docker start [containerName]` | Start a stopped container                   |
| `docker ps`                    | List running containers                     |
| `docker ps -a`                 | List all containers (running and stopped)   |
| `docker stop [containerName]`  | Stop a running container                    |
| `docker kill [containerName]`  | Force stop a container                      |

---

### Resource Limits

| Command                            | Purpose                          |
| ---------------------------------- | -------------------------------- |
| `docker run --memory="256m" nginx` | Limit container memory to 256 MB |
| `docker run --cpus=".5" nginx`     | Limit container CPU usage        |

---

### Cleaning Up Docker

| Command                        | Purpose                                           |
| ------------------------------ | ------------------------------------------------- |
| `docker rm [containerName]`    | Remove a stopped container                        |
| `docker rm $(docker ps -a -q)` | Remove all stopped containers                     |
| `docker images`                | List all images                                   |
| `docker rmi [imageName]`       | Delete an image                                   |
| `docker system prune -a`       | Remove all unused images, containers and networks |

---

## Building

tag is the version tag for the image

`docker build -t [name:tag]` (build an image using docker file located in same folder)

`docker build -t [name:tag] -f [fileName]` (build an image using docker file located in different folder)

`docker tag [imageName] [name:tag] `(tag and existing image) (change tage of exisitng image)

