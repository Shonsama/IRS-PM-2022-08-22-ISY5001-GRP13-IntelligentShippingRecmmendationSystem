from urllib import request
from bs4 import BeautifulSoup
import json


def get_good_message(url):
    # 重构请求头
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:6.0) Gecko/20100101 Firefox/6.0'}
    # 创建请求对应
    req = request.Request(url=url, headers=headers)
    # 获取响应对象
    res = request.urlopen(req)
    # 获取响应内容
    html = res.read().decode("utf-8")
    soup = BeautifulSoup(html, 'html.parser')

    name = soup.find("span", class_="a-size-large product-title-word-break")
    print(name.text)

    img = soup.find("div", class_="imgTagWrapper").find('img')
    src = img.get("src")
    print(src)

    data = [{'name': name.text, 'img': src}]
    return json.dumps(data)