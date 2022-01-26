FROM postgres:12.9-alpine

#COPY ./schema.sql /docker-entrypoint-initdb.d/
COPY ./base.conf /etc/

CMD ["postgres"]
#docker build -t pelmeni/admin-base:0.1.1 .
#docker push pelmeni/admin-base:0.1.1