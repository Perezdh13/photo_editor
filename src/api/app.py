from flask import Flask
from editor_2_0.newImage import app1
from editor_2_0.createVariable import createVariable
from editor_2_0.deleteBackground import deleteBackground
from editor_1_0.createMaskColor import createMaskColor
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

app.register_blueprint(app1)
app.register_blueprint(createVariable)
app.register_blueprint(deleteBackground)
app.register_blueprint(createMaskColor)


if __name__ == "__main__":
    app.run(debug=True, port=5000)
