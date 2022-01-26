#!/bin/bash

docker build -t pelmeni/admin-base:0.1.1 .
docker push pelmeni/admin-base:0.1.1
cd ../
./deploy.sh
cd data_base