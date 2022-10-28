from flask import Flask, Response, request
from flask_cors import CORS, cross_origin
import json, sys

from getWeb import get_good_message
from getRecommend import recommend

app = Flask(__name__)
CORS(app, supports_credentials=True)

@app.route("/getGood", methods = ["GET"])
def getGood():
    req = request.args.get("link")
    print("start")
    return Response(get_good_message(req), status=200, content_type="application/json")

@app.route("/recommend", methods = ["POST"])
def getGoods():
    req = request.get_json()['keywords']
    
    return Response(recommend(req), status=200, content_type="application/json")

app.run(host='0.0.0.0', port=80, debug=True)






