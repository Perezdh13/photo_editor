from flask import Blueprint,Request
from flask_cors import CORS
from dotenv import load_dotenv


createMaskColor = Blueprint("createMaskColor",__name__)
CORS(createMaskColor)
load_dotenv()


@createMaskColor.route("/createMaskColor")
def maskColor():
    response = "Hello from python"
    
    return response