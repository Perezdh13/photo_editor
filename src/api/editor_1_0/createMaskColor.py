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
    color = request.json.get("colorHSV")
    print(color)
    #color = np.array([25,126,237])
    range_tolerance_H = 15
    range_tolerance_S = 126
    range_tolerance_V = 126
   

    image_np = np.frombuffer(image_binary, np.uint8)
    
    img = cv2.imdecode(image_np, cv2.IMREAD_COLOR)
    

    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)

  
    lower_bound = np.array([0, 0, 0])
    upper_bound = np.array([255, 255, 255])

    lower_yellow = np.clip(color - np.array([range_tolerance_H, range_tolerance_S, range_tolerance_V]), lower_bound, upper_bound)
    upper_yellow = np.clip(color + np.array([range_tolerance_H, range_tolerance_S, range_tolerance_V]), lower_bound, upper_bound)
   


  
    mask = cv2.inRange(hsv, lower_yellow, upper_yellow)
    _, mask_image = cv2.imencode('.png',mask)
    mask_base64 = base64.b64encode(mask_image).decode()
    

    result = cv2.bitwise_and(img,img, mask= mask)
    _, result_image = cv2.imencode('.png',result)
    result_base64 = base64.b64encode(result_image).decode()  
    
    
    mask_options = jsonify(Mask = mask_base64,Result = result_base64)
   
    return mask_options
    