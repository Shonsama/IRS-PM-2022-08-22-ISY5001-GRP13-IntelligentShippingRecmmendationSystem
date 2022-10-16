from flask import Flask, Response, request
import json

from getWeb import get_good_message
from getGoods import key2info

app = Flask(__name__)

@app.route("/getGood", methods = ["POST"])
def getGood():
    req = request.get_json(silent=True, force=True)
    return Response(get_good_message(req["link"]), status=200, content_type="application/json")

@app.route("/recommend", methods = ["POST"])
def getGoods():
    req = request.get_json(silent=True, force=True)
    return Response(key2info(req["keyword"]), status=200, content_type="application/json")

app.run(host='0.0.0.0', port=80, debug=True)






