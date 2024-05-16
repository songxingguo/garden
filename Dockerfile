FROM nginx:latest
LABEL maintainer "xg.song@qq.com"
ADD ./public /usr/share/nginx/html
ADD ./nginx/garden.songxingguo.com_bundle.crt /etc/nginx/https
ADD ./nginx/garden.songxingguo.com.key /etc/nginx/https
ADD ./nginx/default.conf /etc/nginx/conf.d
WORKDIR /usr/share/nginx/html/
RUN chown -R daemon:daemon * && chmod -R 755 *
EXPOSE 80