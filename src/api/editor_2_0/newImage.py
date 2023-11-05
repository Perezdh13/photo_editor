from io import BytesIO
from flask import Blueprint, request,send_file
from flask_cors import CORS
from dotenv import load_dotenv
import os
import requests
import openai
import base64
from PIL import Image

app1 = Blueprint("app1",__name__)
CORS(app1)
load_dotenv()
openai.api_key = os.getenv("API_KEY")


@app1.route("/newImage")
def CreateImage():
    custom_prompt = request.args.get("prompt")
    
    
    if custom_prompt is not None:
        response = openai.Image.create(
            prompt=custom_prompt,
            n=1,
            size="512x512"
        )
        image = requests.get(response['data'][0]['url'])
        image_data = image.content
        image_base64 = f"data:image/png;base64,{base64.b64encode(image_data).decode('utf-8')}"
 
        return image_base64
       # return {image_data, send_file(BytesIO(response['data'][0]),mimetype='image/png')}
    else:
        return "El parámetro 'prompt' no se proporcionó en la solicitud."

 