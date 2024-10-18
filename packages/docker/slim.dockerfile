FROM npenin/akala as build
RUN apk add --no-cache alpine-sdk python3 linux-headers eudev-dev libusb git
RUN yarn add serialport usb
RUN yarn add @akala/pm @domojs/devices

FROM alpine
VOLUME ["db"]
COPY .akala.json .akala.json
COPY --from=build /usr/local/bin/node /usr/local/bin
COPY --from=build /usr/local/bin/yarn /usr/local/bin
COPY --from=build /usr/src/akala /usr/src/akala
ENV PATH=./node_modules/.bin:${PATH}
WORKDIR /usr/src/akala
ENTRYPOINT ["yarn", "akala" ,"pm", "start", "pm", "--keepAttached"]
CMD ["local", "tcp", "--tcpPort=31416"]
EXPOSE 31416
