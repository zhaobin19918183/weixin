# -*- coding:UTF-8 -*- ＃必须在第一行或者第二行
# -*- coding:gb2312 -*- ＃必须在第一行或者第二行
# -*- coding:GBK -*- ＃必须在第一行或者第二行
from django.http import HttpResponse
from django.shortcuts import render

# def hello(request):
#     return HttpResponse("Hello world !django ")
def hello(request):
    context          = {}
    context['hello'] = 'Hello World! 后台测试模板'
    return render(request, 'hello.html', context)