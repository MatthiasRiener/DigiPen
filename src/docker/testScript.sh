
docker stop keycloak
docker rm keycloak

docker run -d --name keycloak jboss/keycloak

CONTAINER_ID=$(docker ps -aqf "name=keycloak" | head -1)
echo $CONTAINER_ID

echo "WAITING FOR KEYCLOAK TO START UP :D"
sleep 20

docker commit $CONTAINER_ID friesimatts/keycloak

echo "IMAGE WAS CREATED SUCESFULLY :D"

echo "STARTING COMPOSERU"

docker-compose up


