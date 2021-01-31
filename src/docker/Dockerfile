FROM jboss/keycloak
LABEL maintainer="Luki und Matti :D (und Gerald)"
COPY ./imports/realm/realm-export.json /tmp/realm-export.json
ENV KEYCLOAK_USER=admin KEYCLOAK_PASSWORD=admin KEYCLOAK_IMPORT="/tmp/realm-export.json -Dkeycloak.profile.feature.upload_scripts=enabled -Dkeycloak.migration.strategy=OVERWRITE_EXISTING"
