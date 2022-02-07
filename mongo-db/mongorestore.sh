#!/bin/bash

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
        mongorestore --gzip -u $MONGO_INITDB_ROOT_USERNAME -p $MONGO_INITDB_ROOT_PASSWORD --archive=$ARCHIVEPATH
    fi

else
    echo "########## Dir /db-backup not exist! Exiting ##########"
fi

echo "############### End Loading DB Dump ###############"
