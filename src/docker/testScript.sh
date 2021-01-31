
echo $PWD
docker-compose up -d
docker stop keycloak

containerName="keycloak"
if docker ps -a --format '{{.Names}}' | grep -Eq "^${containerName}\$"; then
    docker start keycloak
    echo "restarting keycloak..."
else
  docker run -p 8080:8080 -e KEYCLOAK_USER=admin -e KEYCLOAK_PASSWORD=admin -e KEYCLOAK_IMPORT="/tmp/realm-export.json -Dkeycloak.profile.feature.upload_scripts=enabled" -v "$(pwd)/imports/realm/realm-export.json:/tmp/realm-export.json" --name keycloak jboss/keycloak
fi


echo "script beendet..."
docker stop $(docker ps -a -q)