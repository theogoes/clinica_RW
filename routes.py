from main import app
from flask import render_template

@app.route("/")
def homepage():

    return render_template("index.html")

@app.route("/simulacao")
def simulacao():
    return render_template("simulacao.html")

@app.route("/cadastro")
def cadastro():
    return render_template("cadastro.html")

