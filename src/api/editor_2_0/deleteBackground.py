
from flask import Blueprint, request,send_file
from flask_cors import CORS
from dotenv import load_dotenv
import os
import openai

deleteBackground = Blueprint("deleteBackground",__name__)
CORS(deleteBackground)
load_dotenv()
openai.api_key = os.getenv("API_KEY")


@app1.route("/deleteBackground")
def removeBack():
    