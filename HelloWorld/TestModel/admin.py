# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.utils.safestring import mark_safe
from django.contrib import admin

# Register your models here.
from django.contrib import admin
from TestModel.models import Test,Contact,WeiXinImage ,companyList,center,Department,Student,Course,Stu_detail,personal
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



class companyAdmin(admin.ModelAdmin):
    # list_display = ('companyName', 'companyImage', 'companyNumber')  # list

    def upload_img(self, obj):
        try:
            img = mark_safe('<img src="%s" width="200px" height="200px" />' % (obj.companyImage.url,))
        except Exception as e:
            img = ''
        return img

    upload_img.short_description = '公司头像'
    upload_img.allow_tags = True

    list_display = ['companyName', 'companyNumber', 'upload_img']
    readonly_fields = ['upload_img']


class centerAdmin(admin.ModelAdmin):
    # list_display = ('companyName', 'companyImage', 'companyNumber')  # list

    def upload_img(self, obj):
        try:
            img = mark_safe('<img src="%s" width="200px" height="200px" />' % (obj.centerImage.url,))
        except Exception as e:
            img = ''
        return img

    upload_img.short_description = '公司头像'
    upload_img.allow_tags = True

    list_display = ['centerName', 'centerNumber', 'upload_img']
    readonly_fields = ['upload_img']


class WeiXinImageAdmin(admin.ModelAdmin):
      list_display = ('name', 'openid')  # list


class personalAdmin(admin.ModelAdmin):
    def upload_img(self, obj):
        try:
            img = mark_safe('<img src="%s" width="200px" height="200px" />' % (obj.image,))
        except Exception as e:
            img = ''
        return img
    upload_img.allow_tags = True

    list_display = ['Name', 'openid', 'upload_img']
    readonly_fields = ['upload_img']

admin.site.register(WeiXinImage, WeiXinImageAdmin)
admin.site.register(Contact, ContactAdmin)
admin.site.register([Test])
admin.site.register(companyList,companyAdmin)
admin.site.register(center,centerAdmin)
admin.site.register(Department)
admin.site.register(Student)
admin.site.register(Course)
admin.site.register(Stu_detail)
admin.site.register(personal,personalAdmin)
