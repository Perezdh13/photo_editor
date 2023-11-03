from io import BytesIO
from flask import Blueprint, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
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
    
    with open("image.png","wb") as f:
        f.write(image_binary)
    
    image = Image.open("image.png")
    width, height = 256, 256
    image = image.resize((width, height))

# Convert the image to a BytesIO object
    byte_stream = BytesIO()
    image.save(byte_stream, format='PNG')
    byte_array = byte_stream.getvalue()
    
    response = openai.Image.create_variation(
            image = byte_array, 
            n=1,
            size="1024x1024"
        )
    return response['data'][0]['url']
    

