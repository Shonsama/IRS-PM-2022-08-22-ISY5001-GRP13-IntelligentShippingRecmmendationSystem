#input: keywords
#output: Goods Infomation

import requests
import re
import json


def getHTMLText(url):
    kv = {'cookie':'cna=uzbZFQE5phkCAbSmqtio2LHe; uc3=lg2=URm48syIIVrSKA%3D%3D&id2=UNQ0Ua0Cdm6Nmg%3D%3D&vt3=F8dBy3KxInaJCM5XHy4%3D&nk2=1peahdsGZqE%3D; lgc=%5Cu5730%5Cu72F1%5Cu9B54%5Cu5C0A; t=454bfa0a6915ffc903e4de573ad84478; uc4=id4=0%40UgP%2Fq%2BNWf0Gjonb93EjYpdLA5KH5&nk4=0%401CYhJiguVgGn6lO0jCLhAdL3tA%3D%3D; tracknick=%5Cu5730%5Cu72F1%5Cu9B54%5Cu5C0A; _cc_=UIHiLt3xSw%3D%3D; tg=0; enc=9FQgGvIlZeZ%2B0nrhjsdQF14CVSaxAfP3MV33ppYm73Qiqd3W%2FTSPHDh5WO0EFFo2Dyfzjt%2BlXJw9Ax2uJyKkrw%3D%3D; hng=CN%7Czh-CN%7CCNY%7C156; mt=ci=11_1; thw=cn; cookie2=1fc37d339c95527f97c8e0742f23e269; v=0; _tb_token_=3eb17bb9a7e04; x=e%3D1%26p%3D*%26s%3D0%26c%3D0%26f%3D0%26g%3D0%26t%3D0%26__ll%3D-1%26_ato%3D0; uc1=cookie14=UoTaHYeaRCMWZA%3D%3D; isg=BLW1YLRhBCL4cWCbGfOpotJ0yjFl-llPnxZHPzfacSx7DtUA_4J5FMMMWJKdVYH8; l=cBOy3W2IqiDmHgwEBOCahurza77OSBdYYuPzaNbMi_5Qx6T1-e7Ok8lQbF96VjWdtBLB4KijACp9-etuZy0YDEK-g3fP.'
          ,'user-agent':'Mozilla/5.0'}                                   #伪造游客
    try:
        r = requests.get(url, headers=kv,timeout=30)                   
        r.raise_for_status()                                             #不是200，产生异常
        r.encoding = r.apparent_encoding                                    
        return r.text
    except:
        return ""


def parsePage(ilt, html, price):
    try:
        plt = re.findall(r'\"view_price\"\:\"[\d\.]*\"', html)              #以列表类型返回形如  "view_price":"186.2" ,反斜杠\" \"表示"view_price"      
        tlt = re.findall(r'\"raw_title\"\:\".*?\"', html)                   #以列表类型返回形如  "raw_title":"小米手机"(最小匹配，输出最短字符串)
        lct = re.findall(r'\"item_loc\"\:\".*?\"', html)                    #以列表类型返回形如  "raw_title":"小米手机"(最小匹配，输出最短字符串
        pic = re.findall(r'\"pic_url\"\:\".*?\"', html)
        web = re.findall(r'\"detail_url\"\:\".*?\"', html)
        for i in range(0,len(plt)+1): 
            loc = lct[i].split(':')[1].split('"')[1].split(" ")
            newloc = loc[len(loc) - 1]
            item = [
                eval(plt[i].split(':')[1]),              #详见淘宝商品信息爬虫（1）
                eval(tlt[i].split(':')[1]),
                newloc,
                eval(pic[i].split(':')[1]),
                eval(web[i].split(':')[1])
            ]
            ilt.append(item)
            price += float(eval(plt[i].split(':')[1]))
    except:
        print("")

#123



def key2info(keywords):
    goods = keywords
    depth = 2
    start_url = 'https://s.taobao.com/search?q=' + goods
    infoList = []
    price = 0
    for i in range(depth):                                    #循环2次
        try:
            url = start_url + '&s=' + str(44 * i)             #淘宝商品页面列表从0,44,88。
            html = getHTMLText(url)                          #两个函数
            parsePage(infoList, html, price)
        except:
            continue
    if len(infoList) == 0:
        return []
    average = price/len(infoList)
    resList = []
    for item in infoList:
        if float(item[0]) >= (average * 0.8):
            resList.append(item)
    goodLocList = {}
    for item in resList:
        if goodLocList.get(item[2]) == None or goodLocList.get(item[2])[0] > item[0]:
                goodLocList.setdefault(item[2],item)
    return list(goodLocList.values())

def list2info(keywords):
    goodList = []
    for i in keywords:
        good = key2info(i)
        goodList.append(good)
    return goodList