
from io import BytesIO
from flask import Blueprint, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import requests
import io
import os
import json
import base64
import numpy as np
import cv2
from PIL import Image
from rembg import remove

deleteBackground = Blueprint("deleteBackground",__name__)
CORS(deleteBackground)
load_dotenv()



@deleteBackground.route("/deleteBackground", methods=["POST"])
def removeBack():
    
    image_data = request.json.get("imageBuffer")
    image_data = image_data.split(",")[1]
    image_binary = base64.b64decode(image_data)
    
    

    image_PIL = Image.open(io.BytesIO(image_binary))
    

    image_np = np.array(image_PIL)
    
   
    result = remove(image_np)
    
   
    result_image = Image.fromarray(result)
    
    
    buffered = io.BytesIO()
    result_image.save(buffered, format="PNG")
    base64_result = base64.b64encode(buffered.getvalue()).decode("utf-8")
   
    return base64_result
   