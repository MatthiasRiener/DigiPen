import requests
import json

def logoutSession(refresh_token, access_token):

    f = open('server_secrets.json')
    data = json.load(f)
    client_id = data['web']['client_id']
    client_secret = data['web']['client_secret']


    headers = {'Authorization': 'Bearer %s' % (access_token)}
    r_data = {'client_id': client_id,'client_secret': client_secret ,'refresh_token': refresh_token}

    response = requests.post(data['web']['issuer'] + "/protocol/openid-connect/logout", headers=headers, data=r_data).text

    return response