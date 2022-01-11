#!/bin/bash

scp down.sh artem@192.168.237.128:/home/artem/down.sh
ssh artem@192.168.237.128 chmod +x /home/artem/down.sh
ssh artem@192.168.237.128 /home/artem/down.sh
ssh artem@192.168.237.128 docker-compose down
ssh artem@192.168.237.128 docker pull pelmeni/admin-front:0.1.1
ssh artem@192.168.237.128 docker pull pelmeni/admin-back:0.1.1
ssh artem@192.168.237.128 docker pull pelmeni/admin-base:0.1.1
scp docker-compose.yml artem@192.168.237.128:/home/artem/docker-compose.yml
ssh artem@192.168.237.128 docker-compose up -d