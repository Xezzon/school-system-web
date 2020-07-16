FROM nginx
COPY ./dist/ /usr/share/nginx/html
COPY school-system-web.nginx.conf /etc/nginx/conf.d
EXPOSE 9210