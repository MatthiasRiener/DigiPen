FROM solr:latest
COPY ./imports/scripts/import-realm.sh /docker-entrypoint-initdb.d/init.sh
COPY ./imports/realm/realm-export.json /root/jboss/startup-scripts/realm-import.json
USER root
RUN apt-get update \
  && DEBIAN_FRONTEND=noninteractive apt-get install -y \
    net-tools \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*