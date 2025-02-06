from main import app
from db.db import insertInfos
from flask import render_template
from flask import request
import json


@app.route("/")
def homepage():
    return render_template("index.html")

@app.route("/simulacao")
def simulacao():
    return render_template("simulacao.html")

@app.route("/cadastro")
def cadastro():
    return render_template("cadastro.html")

@app.route("/insertdata", methods=['POST'])
async def insertdata():
    output = request.get_json()
    outpu_ditc = json.loads(output)
    res = await insertInfos(outpu_ditc)
    print(res)

