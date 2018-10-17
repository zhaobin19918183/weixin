from django.conf.urls import include, url
from TestModel import views

urlpatterns = [

    url(r'ajax_get_data/$', views.ajax_get_data),
    url(r'weixinOpenid/$', views.weixinOpenid),
    url(r'personal/$', views.personal),
    url(r'update/$', views.update),


]