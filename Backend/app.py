from flask import Flask, Response, request
from flask_cors import CORS, cross_origin
import json, sys

from getWeb import get_good_message
from getGoods import key2info

app = Flask(__name__)
CORS(app, supports_credentials=True)

@app.route("/getGood", methods = ["GET"])
def getGood():
    req = request.args.get("link")
    return Response(get_good_message(req), status=200, content_type="application/json")

@app.route("/recommend", methods = ["POST"])
def getGoods():
    req = request.get_json(silent=True, force=True)
    return Response(key2info(req["keyword"]), status=200, content_type="application/json")

app.run(host='0.0.0.0', port=80, debug=True)






