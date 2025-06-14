FROM npenin/akala AS build
USER root
RUN apk add --no-cache alpine-sdk python3 linux-headers eudev-dev libusb git
USER node
COPY .yarnrc.yml /usr/src/akala/.yarnrc.yml
RUN yarn add serialport usb
RUN yarn add @akala/pm @domojs/devices

FROM alpine
RUN apk --no-cache --update add yarn npm coreutils eudev-libs eudev && \
    addgroup -g 1000 node && \
    adduser -u 1000 -G node -G dialout -s /bin/sh -D node && \
    mkdir -p /etc/udev/rules.d && \
    echo 'KERNEL=="ttyUSB[0-9]*",MODE="0660",GROUP="dialout"' > /etc/udev/rules.d/99-usb-serial.rules && \
    echo 'SUBSYSTEM=="usb",MODE="0660",GROUP="dialout"' > /etc/udev/rules.d/99-usb.rules

VOLUME ["/usr/src/akala/db"]
ENV NODE_ENV=production
WORKDIR /usr/src/akala
COPY entrypoint.sh entrypoint.sh
COPY --from=build /root /root
COPY --from=build /usr/src/akala /usr/src/akala
COPY .akala.json db/.akala.json
RUN ln -s db/.akala.json .akala.json && \
    rm yarn.lock
ENV PATH=${PATH}:./node_modules/.bin
ENTRYPOINT [ "/usr/src/akala/entrypoint.sh", "node_modules/.bin/akala" ,"pm", "start", "pm", "--keepAttached", "--configFile", "./db/.akala.json"]
CMD ["local", "tcp", "--tcpPort=31416"]
EXPOSE 31416
