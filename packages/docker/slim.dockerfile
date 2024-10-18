FROM npenin/akala as build
RUN apk add --no-cache alpine-sdk python3 linux-headers eudev-dev libusb git
RUN yarn add serialport usb
RUN yarn add @akala/pm @domojs/devices

FROM alpine
VOLUME [".akala.json", "package.json", "db"]
COPY .akala.json .akala.json
COPY --from=build /usr/local/bin/node /usr/local/bin
COPY --from=build /usr/src/akala /usr/src/akala
ENTRYPOINT ["yarn" ,"pm-fork", "pm"]
CMD ["local", "tcp", "--tcpPort=31416"]
EXPOSE 31416
