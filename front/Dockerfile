FROM nginx:1.21.4

RUN ["mkdir", "/var/www"]
RUN ["mkdir", "/var/www/front"]
RUN ["rm", "/etc/nginx/conf.d/default.conf"]
RUN mkdir /run/php
RUN apt update
RUN apt -y install phppgadmin php-fpm
RUN ln -s /usr/share/phppgadmin /var/www/front/phppgadmin
#RUN apt -y install systemctl


COPY ./dist/front/* /var/www/front/
COPY ./getman.site.conf /etc/nginx/conf.d/
COPY ./www.conf /etc/php/7.4/fpm/pool.d/
COPY ./config.inc.php /var/www/front/phppgadmin/conf/

COPY ./start.sh ./bin/start.sh
RUN chmod +x /bin/start.sh
CMD ["start.sh"]

#Команда запускается при запуске контейнера, deamon off нужен для того что бы контейнер продолжил работать после запуска.
#ENTRYPOINT ["nginx", "-g", "daemon off;"]
#Для сборки: docker build -t pelmeni/admin-front:0.1.1 .  собирается образ контейнера, -t - имя образа, "." - все пути относительно данной дериктории
