# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.views.decorators.csrf import csrf_exempt
from django.core import serializers
from django.http import HttpResponse
import json

import urlparse
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
def  personal(request):
     if request.method == 'POST':
         print(request.body)
         return HttpResponse(json.dumps({
             "status": 1,
             "data": "o8AIv5e98JLhxTAIcEhIAbT0rDlA"
         }), content_type="application/json")

