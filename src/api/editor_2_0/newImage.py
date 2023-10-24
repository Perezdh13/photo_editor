from flask import Blueprint, request
from flask_cors import CORS
from dotenv import load_dotenv
import os
import openai

app1 = Blueprint("app1",__name__)
CORS(app1)
load_dotenv()
openai.api_key = os.getenv("API_KEY")


@app1.route("/newImage")
def CreateImage():
    custom_prompt = request.args.get("prompt")
    print(custom_prompt)
    
    if custom_prompt is not None:
        response = openai.Image.create(
            prompt=custom_prompt,
            n=1,
            size="1024x1024"
        )
        return response['data'][0]['url']
    else:
        return "El parámetro 'prompt' no se proporcionó en la solicitud."

 