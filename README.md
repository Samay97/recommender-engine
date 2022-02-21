[![lint and build project code](https://github.com/Samay97/recommender-engine/actions/workflows/main.yaml/badge.svg)](https://github.com/Samay97/recommender-engine/actions/workflows/main.yaml)

# recommender-engine
A recommender engine implemented in node. Project with the DHBW as a Studienarbeit

## Branch

naming `RE-[ticket-number]-[topic]`


## Commits

commit `RE-[ticket-number] [message]`


# Mongo DB
All infos for mongo

## Create new dump
To create a new dump just run:
```bash
docker exec -it <docker-container-id> bash
```
and create a new dump with
```bash
mongodump -u <user> -p <password> --gzip --archive > /db-backup/dump_`date "+%Y-%m-%d"`.gz
```

## Load new dump into db

to load a dump, simply restart the container

```bash
docker compose stop mongo && docker compose up mongo
```

## Debug VS-Code

To debbug the backend adjust the docker-compose target to `development-build-stage-debugger`

```yml
backend:
    build:
      context: ./backend/
      target: development-build-stage-debugger

```

Create a new Lauch option in vs code and replace the config with this example

```json
{
    "version": "0.2.0",
    "configurations": [  
      {
        "name": "Docker: Attach to Node",
        "type": "node",
        "request": "attach",
        "restart": true,
        "port": 9229,
        "address": "localhost",
        "localRoot": "${workspaceFolder}/backend/src/",
        "remoteRoot": "/app/src/",
        "protocol": "inspector",
      }  
    ]
  }
```
Run docker containers and after startup run vs code debugger with the new launch option
