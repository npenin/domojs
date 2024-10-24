FROM npenin/akala AS build
RUN apk add --no-cache alpine-sdk python3 linux-headers eudev-dev libusb git
RUN yarn add serialport usb
RUN yarn add @akala/pm @domojs/devices

FROM alpine
RUN ["apk", "--no-cache", "--update", "add", "yarn", "coreutils", "eudev" ] 
VOLUME ["db"]
ENV NODE_ENV=production
COPY .akala.json .akala.json
COPY --from=build /usr/src/akala /usr/src/akala
ENV PATH=${PATH}:./node_modules/.bin
WORKDIR /usr/src/akala
ENTRYPOINT [ "node_modules/.bin/akala" ,"pm", "start", "pm", "--keepAttached"]
CMD ["local", "tcp", "--tcpPort=31416"]
EXPOSE 31416
