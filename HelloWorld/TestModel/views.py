# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.core import serializers
from django.http import HttpResponse

from  TestModel.models import  WeiXinImage
from django.shortcuts import render

# Create your views here.
def ajax_get_data(request):
    json_data = serializers.serialize("json", WeiXinImage.objects.all())
    return HttpResponse(json_data, content_type="application/json")