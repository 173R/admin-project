FROM postgres:12.9-alpine

COPY ./schema.sql /docker-entrypoint-initdb.d/

CMD ["postgres"]
#docker build -t pelmeni/admin-base:0.1.0 .