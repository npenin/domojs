# FROM alpine:latest
# WORKDIR /root
# RUN apk add --no-cache curl dosfstools e2fsprogs e2fsprogs-extra parted util-linux xz
# COPY ./alpinekiosk.sh /root/alpinekiosk.sh
# CMD /root/alpinekiosk.sh

FROM ubuntu
WORKDIR /root
RUN apt-get --update -y install curl dosfstools parted fdisk
COPY ./alpinekiosk.sh /root/alpinekiosk.sh
CMD /root/alpinekiosk.sh