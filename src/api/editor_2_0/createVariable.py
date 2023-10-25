from io import BytesIO
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
       
   
    byte_stream: BytesIO = ['public\assets\Cris.png']
    byte_array = byte_stream.getvalue()
    
    
    response = openai.Image.create_variation(
        image= byte_array,
        n=1,
        size="512x512"
    )
    return response['data'][0]['url']
