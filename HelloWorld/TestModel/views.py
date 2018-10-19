# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.views.decorators.csrf import csrf_exempt
from django.core import serializers
from django.http import HttpResponse
import json
from django.core.files.base import ContentFile
from TestModel.models import  Department
import models
import imghdr
from django.core.files.uploadedfile import InMemoryUploadedFile
from io import BytesIO
from  TestModel.models import  WeiXinImage,imageList
import sys
reload(sys)
sys.setdefaultencoding('utf-8')
from django.shortcuts import render

# Create your views here.
def ajax_get_data(request):
    json_data = serializers.serialize("json", WeiXinImage.objects.all())
    status = 0
    return HttpResponse(json.dumps({
                "status": status,
                "data": json_data
            }), content_type="application/json")
@csrf_exempt
def  weixinOpenid(request):
     if request.method == 'POST':

         print(json.loads(request.body)['code'])
         code = json.loads(request.body)['code']
         status = 0
         return HttpResponse(json.dumps({
              "status": 1,
              "data": code
           }), content_type="application/json")
#增加
def  personal(request):
     if request.method == 'POST':

         school = Department()
         school.d_name =  json.loads(request.body)['name']
         school.save()
         return HttpResponse(json.dumps({
             "status": 1,
             "data": "数据保存成功"
         }), content_type="application/json")
# 修改
def  update(request):
     obj = models.Department.objects.get(d_name="家里蹲大学")
     print(obj)
     obj.d_name = json.loads(request.body)['name']
     obj.save()
     return HttpResponse(json.dumps({
        "status": 1,
        "data": "数据更改成功"
    }), content_type="application/json")
#上传图片并返回路径
@csrf_exempt
def uploadImage(request):
    if request.method == 'POST':
     imageDetail = imageList()
     imageDetail.imageName = request.POST["imageName"]
     imageDetail.image = request.FILES.get("image")
     imageDetail.save()
     imageurl =  "http://127.0.0.1:8000/media/media/photos/image/%s"%imageDetail.image
     print (imageurl)
     #http://127.0.0.1:8000/media/media/photos/image/wx8edad0fe86893d2d.o6zAJs5F1gK86YozY8ZIDHcTAevk.rehjJJ7lJc5id74064a7c466078d9baa17138d584e71.jpeg
     return HttpResponse(json.dumps({
        "status": 1,
        "data":imageurl
    }), content_type="application/json")
# @csrf_exempt
# def OpenidUtils(object):
#     def __init__(self, jscode):
#         self.url = "https://api.weixin.qq.com/sns/jscode2session"
#         self.appid = "wx8edad0fe86893d2d"
#         self.secret = "ecdf3a30517d8faae646b880bb4bc2c0"
#         self.jscode = jscode  # 前端传回的动态jscode
#
#     def get_openid(self):
#         # url一定要拼接，不可用传参方式
#         url = self.url + "?appid=" + self.appid + "&secret=" + self.secret + "&js_code=" + self.jscode + "&grant_type=authorization_code"  
#         r = requests.get(url)
#         print(r.json())
#         openid = r.json()['openid']
#
#         return openid


