# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin

# Register your models here.
from django.contrib import admin
from TestModel.models import Test
# Register your models here.
admin.site.register([Test])