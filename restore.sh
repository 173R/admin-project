#!/bin/bash

git pull
git checkout $1

docker-compose down
docker volume rm $(docker volume ls -q)
docker-compose up -d
docker cp dump.sql data_base:/dump.sql
sleep 7
docker exec data_base psql -U artemdb -f dump.sql data_gav
