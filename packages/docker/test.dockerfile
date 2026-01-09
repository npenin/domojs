FROM npenin/domojs:latest-slim
RUN rm -R /akala/node_modules/
COPY ./node_modules /akala/node_modules
COPY ./.akala.json /akala/db/.akala.json
