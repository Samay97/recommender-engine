#!/bin/bash
set -e

echo "############### trying to create database and users ###############"

if [ -n "${MONGO_INITDB_ROOT_USERNAME:-}" ] && [ -n "${MONGO_INITDB_ROOT_PASSWORD:-}" ] && [ -n "${dbUser:-}" ] && [ -n "${dbPwd:-}" ]; then
mongo -u $MONGO_INITDB_ROOT_USERNAME -p $MONGO_INITDB_ROOT_PASSWORD<<EOF
db=db.getSiblingDB('recommender');
use recommender;
db.createUser({
  user:  '$dbUser',
  pwd: '$dbPwd',
  roles: [{
    role: 'readWrite',
    db: 'recommender'
  }]
});
EOF
else
    echo "MONGO_INITDB_ROOT_USERNAME,MONGO_INITDB_ROOT_PASSWORD,dbUser and dbPwd must be provided. Some of these are missing, hence exiting database and user creatioin"
    exit 403
fi

echo "############### Start Loading DB Dump ###############"

DIR="/db-backup"
if [ -d "$DIR" ]; then
    echo "############### Dir /db-backup exist ###############"

    LATEST=$(ls $DIR | tail -n 1)

     if [ -z "$LATEST" ]; then
         echo "############### No file in /db-backup ###############"
     else
         echo "############### Restore $LATEST ###############"
         ARCHIVEPATH="$DIR/$LATEST"        
         mongorestore --gzip -u $dbUser -p $dbPwd --archive=$ARCHIVEPATH --db recommender
     fi
 else
     echo "########## Dir /db-backup not exist! Exiting ##########"
 fi

echo "############### End Loading DB Dump ###############"
