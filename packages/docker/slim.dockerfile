FROM npenin/akala AS build
USER root
RUN apk add --no-cache alpine-sdk python3 linux-headers eudev-dev libusb git
USER node
RUN yarn add serialport usb
RUN yarn add @akala/pm @domojs/devices

FROM alpine
RUN apk --no-cache --update add yarn coreutils eudev && \
    addgroup -g 1000 node && \
    adduser -u 1000 -G node -s /bin/sh -D node
VOLUME ["/usr/src/akala/db"]
ENV NODE_ENV=production
WORKDIR /usr/src/akala
COPY entrypoint.sh entrypoint.sh
COPY --from=build /root /root
COPY --from=build /usr/src/akala /usr/src/akala
COPY .akala.json db/.akala.json
COPY .yarnrc.yml /usr/src/akala/.yarnrc.yml
RUN ln -s db/.akala.json .akala.json
ENV PATH=${PATH}:./node_modules/.bin
ENTRYPOINT [ "/usr/src/akala/entrypoint.sh", "node_modules/.bin/akala" ,"pm", "start", "pm", "--keepAttached", "--configFile", "./db/.akala.json"]
CMD ["local", "tcp", "--tcpPort=31416"]
EXPOSE 31416
