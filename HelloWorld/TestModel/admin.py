# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin

# Register your models here.
from django.contrib import admin
from TestModel.models import Test,Contact,WeiXinImage
# Register your models here.

class ContactAdmin(admin.ModelAdmin):
    list_display = ('name', 'age', 'email')  # list
    fieldsets = (
        ['Main', {
            'fields': ('name', 'email'),
        }],
        ['Advance', {
            'classes': ('collapse',),
            'fields': ('age',),
        }]

    )
class WeiXinImageAdmin(admin.ModelAdmin):
      list_display = ('name', 'openid')  # list
admin.site.register(WeiXinImage, WeiXinImageAdmin)
admin.site.register(Contact, ContactAdmin)
admin.site.register([Test])