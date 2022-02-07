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
