# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.views.decorators.csrf import csrf_exempt
from django.core import serializers
from django.http import HttpResponse
import json
from TestModel.models import  Department

import models
from  TestModel.models import  WeiXinImage
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
         print(request.body)
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
