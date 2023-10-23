from flask import Flask, request
from flask_cors import CORS
from dotenv import load_dotenv
import os
import openai

app = Flask(__name__)
CORS(app)
load_dotenv()
openai.api_key = os.getenv("API_KEY")


@app.route("/newImage",methods=("GET","POST"))
def Home():
    custom_prompt = request.args.get("prompt")
    print(custom_prompt)
    
    if custom_prompt is not None:
        response = openai.Image.create(
            prompt="una casa amarilla",
            n=1,
            size="1024x1024"
        )
        return response['data'][0]['url']
    else:
        return "El parámetro 'prompt' no se proporcionó en la solicitud."

    