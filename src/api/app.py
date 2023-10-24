from flask import Flask
from editor_2_0.newImage import app1
from editor_2_0.createVariable import createVariable


app = Flask(__name__)

# Registra los blueprints en la aplicación principal
app.register_blueprint(app1)
app.register_blueprint(createVariable)


if __name__ == "__main__":
    app.run(debug=True, port=5000)
