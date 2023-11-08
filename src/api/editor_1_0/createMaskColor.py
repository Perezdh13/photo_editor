from flask import Blueprint,request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from PIL import Image
from io import BytesIO
import io
import cv2
import base64
import numpy as np

createMaskColor = Blueprint("createMaskColor",__name__)
CORS(createMaskColor)
load_dotenv()


@createMaskColor.route("/createMaskColor", methods=["POST"])
def maskColor():
    
    image_data = request.json.get("imageBuffer")
    image_data = image_data.split(",")[1]
    image_binary = base64.b64decode(image_data)
    
   

    image_np = np.frombuffer(image_binary, np.uint8)
    
    img = cv2.imdecode(image_np, cv2.IMREAD_COLOR)
    

    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)

  
    lower_yellow = np.array([15,50,180])
    upper_yellow = np.array([40,255,255])

  
    mask = cv2.inRange(hsv, lower_yellow, upper_yellow)
    _, mask_image = cv2.imencode('.png',mask)
    mask_base64 = base64.b64encode(mask_image).decode()
    

    result = cv2.bitwise_and(img,img, mask= mask)
    _, result_image = cv2.imencode('.png',result)
    result_base64 = base64.b64encode(result_image).decode()  
    
    
    
    
    return mask_base64
    