#!/bin/bash

scp down.sh artem@artem.site:/home/artem/down.sh
ssh artem@artem.site chmod +x /home/artem/down.sh
ssh artem@artem.site /home/artem/down.sh
ssh artem@artem.site docker-compose down
ssh artem@artem.site docker pull pelmeni/admin-front:0.1.1
ssh artem@artem.site docker pull pelmeni/admin-back:0.1.1
ssh artem@artem.site docker pull pelmeni/admin-base:0.1.1
scp docker-compose.yml artem@artem.site:/home/artem/docker-compose.yml
ssh artem@artem.site docker-compose up -d