#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Tue Oct 18 18:57:02 2022

@author: manyeongsoh
"""
import json
import urllib.request #发送请求
from urllib import parse #URL编码
key = "" # Enter your own Amap API key on https://lbs.amap.com/api/webservice/guide/create-project/get-key

def getLoc(i):
    
    url1 = "https://restapi.amap.com/v3/geocode/geo?key=" + key + "&address=" + i + "&city=" + i
    
    newUrl1 = parse.quote(url1, safe="/:=&?#+!$,;'@()*[]")
    #发送请求
    response1 = urllib.request.urlopen(newUrl1)
    #读取数据
    data1 = response1.read()
    #解析json数据
    jsonData1 = json.loads(data1)
    #geocodes→0→location得到经纬度，写入字典
    return [i, jsonData1['geocodes'][0]['location']]

def getDuration(origin, des):
    url2= "https://restapi.amap.com/v3/direction/driving?key=" + key + "&origin=" + origin[1] + "&destination=" + des[1] + "&extensions=all"

    newUrl2 = parse.quote(url2, safe="/:=&?#+!$,;'@()*[]")
    #发送请求
    response2 = urllib.request.urlopen(newUrl2)
    #接收数据
    data2 = response2.read()
    #解析json文件
    jsonData2 = json.loads(data2)
    #从json文件中提取距离
    duration = int(int(jsonData2['route']['paths'][0]['duration']) / (3600*8) + 1)
    #字典dict_route中追加数据
    return [origin[0], des[0], duration]


with open("cityList.json", encoding="utf-8") as f:
    cityList = json.load(f)
with open("centerList.json", encoding="utf-8") as f:
    centerList = json.load(f)

durlist = []
for m in cityList:
    for n in centerList:
        item = getDuration(m,n)
        print(item)        

