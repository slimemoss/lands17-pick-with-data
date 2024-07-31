import base64
import json
from io import BytesIO

from PIL import Image

image = Image.open('Mana.png')

width, height = image.size

color = ['wu', 'wb', 'ub', 'ur', 'br', 'bg', 'wr', 'rg', 'wg', 'ug']

res = {}
for i, c in enumerate(color):
    w = (width + 5) / 10
    h = height / 7
    x = w * i
    y = h * 3

    cropped = image.crop((x, y, x+w, y+h))
    buffered = BytesIO()
    cropped.save(buffered, format="PNG")

    img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")

    res[c] = img_str

print(json.dumps(res))
