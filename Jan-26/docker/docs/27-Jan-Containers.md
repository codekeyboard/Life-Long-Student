## Persisting Data:

Conatiners are ephemeral and stateless.
ephemeral ( temporary )
A container is meant to be short lived.
You can stop it, delete it and create a new one anytime.

If the container dies, you do not “repair” it. You just start a new one from the image.

Think of it like a disposable coffee cup, not a glass mug.

Stateless = doesn’t keep data inside

Anything stored inside the container’s filesystem is lost when the container is removed.

Example:
```
docker run -it ubuntu bash
echo "hello" > test.txt
exit
docker run -it ubuntu bash
```

to persistent data:
stored data outside in the volume
volume map to logical folder

Volume:
Maps a folder on the host to a logical folder in the container 
```
Host

  |

  container

  /app

    |

    VM filesystem
```
stored in the volume where container can restart or crash 
these is still chances data can loose if VM crashes so later we can use externel type of storage  provided by cloud provider 

