from io import BytesIO
from flask import Blueprint, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import requests
import os
import io
import openai
import base64
from PIL import Image

createVariable = Blueprint("createVariable",__name__)
CORS(createVariable)
load_dotenv()
openai.api_key = os.getenv("API_KEY")

 
@createVariable.route("/createVariable", methods=["POST"])
def createImageVariable():
    
    image_data = request.json.get("imageBuffer")
    image_data = image_data.split(",")[1]
    image_binary = base64.b64decode(image_data)
    
    image = Image.open(io.BytesIO(image_binary))
    width, height = 256, 256
    image = image.resize((width, height))


    byte_stream = BytesIO()
    image.save(byte_stream, format='PNG')
    byte_array = byte_stream.getvalue()
    
    response = openai.Image.create_variation(
            image = byte_array, 
            n=1,
            size="1024x1024"
        )
    image = requests.get(response['data'][0]['url'])
    image_data = image.content
    image_base64 = f"data:image/png;base64,{base64.b64encode(image_data).decode('utf-8')}"
 
    return image_base64
    

