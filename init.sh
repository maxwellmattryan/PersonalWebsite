#!/bin/bash

convertsecs() {
    ((m = (${1} % 3600) / 60))
    ((s = ${1} % 60))
    printf "%02dm %02ds\n" $m $s
}

POSTGRES_PORT=5432
POSTGRES_DB=mattmaxwell
POSTGRES_PASSWORD=password
POSTGRES_CONTAINER_NAME=mattmaxwell-db

REDIS_PORT=6379
REDIS_CONTAINER_NAME=mattmaxwell-mailer-queue

start_time=$(date +%s)

START=1
STEPS=2

echo -e "Initializing Docker containers...\n"

if [ ! "$(docker ps -q -f name=$POSTGRES_CONTAINER_NAME)" ]; then
    if [ "$(docker ps -aq -f status=exited -f name=$POSTGRES_CONTAINER_NAME)" ]; then
        docker rm $POSTGRES_CONTAINER_NAME
    fi
    docker run -p $POSTGRES_PORT:$POSTGRES_PORT --name $POSTGRES_CONTAINER_NAME -e POSTGRES_USER="$POSTGRES_USER" -e POSTGRES_PASSWORD="$POSTGRES_PASSWORD" -e POSTGRES_DB="$POSTGRES_DB" -d postgres
    echo -e "\t[✔]: Initiated PostgreSQL container named \"$POSTGRES_CONTAINER_NAME\" @ port $POSTGRES_PORT"
else
    echo -e "\t[✔]: PostgreSQL container is already running"
fi

if [ ! "$(docker ps -q -f name=$REDIS_CONTAINER_NAME)" ]; then
    if [ "$(docker ps -aq -f status=exited -f name=$REDIS_CONTAINER_NAME)" ]; then
        docker rm $REDIS_CONTAINER_NAME
    fi
    docker run -p $REDIS_PORT:$REDIS_PORT --name $REDIS_CONTAINER_NAME -d redis
    echo -e "\t[✔]: Initiated Redis container named \"$REDIS_CONTAINER_NAME\" @ port $REDIS_PORT\n"
else
    echo -e "\t[✔]: Redis container is already running\n"
fi

echo -e "[Success]: Initialized Docker containers for application\n"

end_time=$(date +%s)
execution_time=$(expr $end_time - $start_time)
echo -e "Total build and deployment time elapsed: $(convertsecs $execution_time)"
