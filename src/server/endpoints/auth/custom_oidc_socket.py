import requests
import json

def logoutSession(refresh_token, access_token):

    f = open('client_secrets.json')
    data = json.load(f)
    client_id = data['web']['client_id']
    client_secret = data['web']['client_secret']


    headers = {'Authorization': 'Bearer %s' % (access_token)}
    data = {'client_id': client_id,'client_secret': client_secret ,'refresh_token': refresh_token}

    response = requests.post('http://localhost:8080/auth/realms/slidea/protocol/openid-connect/logout', headers=headers, data=data).text

    return response