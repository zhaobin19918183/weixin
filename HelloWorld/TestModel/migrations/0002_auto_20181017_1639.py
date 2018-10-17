# -*- coding: utf-8 -*-
# Generated by Django 1.11.16 on 2018-10-17 08:39
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('TestModel', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='personal',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('MyCenterName', models.CharField(max_length=200)),
                ('MyCenterID', models.IntegerField()),
                ('MyCenterNumber', models.IntegerField()),
                ('MyCompanyName', models.CharField(max_length=200)),
                ('MyCompanyID', models.IntegerField()),
                ('MyCompanyNumber', models.IntegerField()),
                ('MyWorkRoomName', models.CharField(max_length=200)),
                ('MyWorkRoomID', models.IntegerField()),
                ('MyWorkRoomNumber', models.IntegerField()),
                ('MyNumber', models.IntegerField()),
                ('Name', models.CharField(max_length=200)),
                ('openid', models.CharField(max_length=200)),
                ('allDay', models.IntegerField()),
                ('day', models.IntegerField()),
                ('image', models.CharField(max_length=200)),
                ('share', models.IntegerField()),
                ('time', models.CharField(max_length=200)),
                ('whetaher', models.CharField(max_length=200)),
                ('imageArray', models.TextField(editable=False)),
            ],
            options={
                'verbose_name_plural': '\u4e2a\u4eba\u4fe1\u606f\u8868',
            },
        ),
        migrations.AlterModelOptions(
            name='course',
            options={'verbose_name_plural': '\u5b66\u751f\u9009\u8bfe\u8868'},
        ),
    ]
