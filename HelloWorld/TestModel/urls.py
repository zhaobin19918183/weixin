from django.conf.urls import include, url
from TestModel import views

urlpatterns = [

    url(r'ajax_get_data/$', views.ajax_get_data),

]