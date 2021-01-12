import numpy as np
from PIL import Image
import requests
from io import BytesIO

def img_from_url(url):
    response = requests.get(url)
    img = Image.open(BytesIO(response.content)).convert('RGB')
    return img

def palette(img):
    arr = np.asarray(img)
    palette, index = np.unique(asvoid(arr).ravel(), return_inverse=True)
    palette = palette.view(arr.dtype).reshape(-1, arr.shape[-1])
    count = np.bincount(index)
    order = np.argsort(count)
    return palette[order[::-1]]

def asvoid(arr):
    arr = np.ascontiguousarray(arr)
    return arr.view(np.dtype((np.void, arr.dtype.itemsize * arr.shape[-1])))

img = img_from_url('https://images.theconversation.com/files/305837/original/file-20191209-90562-nsnsun.jpg?ixlib=rb-1.1.0&rect=284%2C696%2C1934%2C965&q=45&auto=format&w=1356&h=668&fit=crop')

print(palette(img))
