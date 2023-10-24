from flask import Blueprint, request
from flask_cors import CORS
from dotenv import load_dotenv
import os
import openai

createVariable = Blueprint("createVariable",__name__)
CORS(createVariable)
load_dotenv()
openai.api_key = os.getenv("API_KEY")

@createVariable.route("/createVariable")
def createImageVariable():
    actual_image = 'http://localhost:3000/_next/image/public/Cris.png'
    print(actual_image)
    
    if actual_image is not None:
        response = openai.Image.create_variation(
            image= actual_image,
            n=1,
            size="1024x1024"
        )
        return response['data'][0]['url']
    else:
        return "No hay imagen de referencia"