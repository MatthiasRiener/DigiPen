from colorthief import ColorThief
from io import BytesIO
import requests

def url_to_palette(url):
    fd = requests.get(url)
    f = BytesIO(fd.content)
    color_thief = ColorThief(f)
    palette = color_thief.get_palette(quality=1)
    return palette


pal = url_to_palette('https://media.contentapi.ea.com/content/dam/gin/images/2017/01/the-simpsons-game-key-art.jpg.adapt.crop191x100.628p.jpg')
print(pal)


