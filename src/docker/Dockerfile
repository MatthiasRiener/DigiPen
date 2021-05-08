FROM jboss/keycloak
LABEL maintainer="Luki und Matti :D (und Gerald)"
COPY ./imports/realm/realm-export2.json /tmp/realm-export.json
ENV KEYCLOAK_USER=slidea KEYCLOAK_PASSWORD=soos KEYCLOAK_IMPORT="/tmp/realm-export.json -Dkeycloak.profile.feature.upload_scripts=enabled -Dkeycloak.migration.strategy=OVERWRITE_EXISTING"
