
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
    
    
    # Abrir la imagen en formato PIL
    image = Image.open(io.BytesIO(image_binary))
    
    # Convertir la imagen a un formato que rembg pueda procesar
    image_np = np.array(image)
    
    # Utilizar rembg para eliminar el fondo
    result = remove(image_np)
    
    # Convertir la imagen de nuevo a formato PIL
    result_image = Image.fromarray(result)
    
    # Guardar la imagen eliminando el fondo como base64
    buffered = io.BytesIO()
    result_image.save(buffered, format="PNG")
    base64_result = base64.b64encode(buffered.getvalue()).decode("utf-8")
    # base64_data = json.loads(base64_result)
    # base64_image = base64_data.get('data')
    return base64_result
    # return f"data:image/png;base64,{base64_result.get('data')}"