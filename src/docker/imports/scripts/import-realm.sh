#!/bin/bash

echo "MOIN LEUDE TRYMACS HIER!"
echo "$(nc -z keycloak 9990)"

while ! nc -z keycloak 8080; do
    sleep 1
    echo "Waiting for keycloak server startup 9990..."

    echo "$(nc -z keycloak 8080)"
done


echo "keycloak admin port available"

HOST=$(hostname -I|sed -e "s/\s//g")

echo $HOST



echo "keycloak service port available"

netstat -ant|grep LISTEN
sleep 1
pushd /opt/jboss/keycloak/bin
echo "connect to server >$HOST<"



./kcadm.sh config credentials --server http://keycloak:8080/auth --realm master --user admin --password Pa55w0rd

COUNT=$(./kcadm.sh get realms | grep slidea | wc -l)

if [[ "$COUNT." == "0." ]]
then
    ./standalone.sh -Dkeycloak.migration.action=import -Djboss.socket.binding.port-offset=100  -Dkeycloak.migration.provider=singleFile -Dkeycloak.migration.file=./custom-import.json -Dkeycloak.migration.usersExportStrategy=REALM_FILE -Dkeycloak.profile.feature.upload_scripts=enabled 
   # ./kcadm.sh create realms -f ~/jboss/startup-scripts/custom-import.json
else 
    echo "realm exists with $COUNT lines"
fi
popd
