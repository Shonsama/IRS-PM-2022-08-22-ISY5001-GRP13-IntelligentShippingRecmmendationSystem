from requests import Request, Session
from requests.exceptions import ConnectionError, Timeout, TooManyRedirects
import json

headers = {
	'Accepts': 'application/json',
	'X-CMC_PRO_API_KEY': '0d368781-65da-4770-8b1d-d5843bee02f7',
}

session = Session()
session.headers.update(headers)

def construct_coin_dct():
	url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/map'
	parameters = {
		'start': '1',
		'limit': '500',
	}
	response = session.get(url, params = parameters)
	data = json.loads(response.text)
	coindct = {}

	for item in data["data"]:
		coin_id = item["id"]
		coin_name = item["name"].lower()
		coindct[coin_name] = coin_id
	return coindct

def getprice(coinname, coindct):
	coinname = coinname.lower()
	coinid = coindct[coinname]
	url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest'
	parameters = {
		'id': coinid
	}

	response = session.get(url, params = parameters)
	data = json.loads(response.text)
	price = data["data"][str(coinid)]["quote"]["USD"]["price"]
	return "{:.2f}".format(price)
	