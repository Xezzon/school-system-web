FROM nginx:1.19
COPY ./dist/ /usr/share/nginx/html
COPY school-system-web.nginx.conf /etc/nginx/conf.d
EXPOSE 9210