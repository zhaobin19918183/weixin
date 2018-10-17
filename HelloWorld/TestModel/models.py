# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import sys
reload(sys)
sys.setdefaultencoding('utf-8')
from django.db import models
import uuid

class Test(models.Model):
    name = models.CharField(max_length=20)


class Contact(models.Model):
    name = models.CharField(max_length=200)
    age = models.IntegerField(default=0)
    email = models.EmailField()

    def __unicode__(self):
        return self.name


class Tag(models.Model):
    contact = models.ForeignKey(Contact)
    name = models.CharField(max_length=50)

    def __unicode__(self):
        return self.name
class WeiXinImage(models.Model):

    name = models.CharField(max_length=50)
    openid = models.CharField(max_length=100)
    iamgeUrl = models.CharField(max_length=500)

    def __unicode__(self):
        return self.name

class  companyList(models.Model):
       companyName  = models.CharField(max_length=100)
       companyImage =  models.ImageField(u'图片', upload_to='media/photos/company')
       companyNumber = models.IntegerField()
       companyPhone = models.CharField(max_length=100)


class center(models.Model):
      centerName = models.CharField(max_length=100)
      centerImage = models.ImageField(u'中心头像', upload_to='media/photos/center')
      centerNumber = models.IntegerField()
# 学院表
class Department(models.Model):
    d_id = models.AutoField(primary_key=True)
    d_name = models.CharField(max_length=30)

    def __str__(self):
        return "Department<d_id=%s,d_name=%s>"%(self.d_id,
                                                self.d_name)
    class Meta:
        # 末尾不加s
        verbose_name_plural = '学校列表'

# 学生表
class Student(models.Model):
    s_id = models.AutoField(primary_key=True)
    s_name = models.CharField(max_length=30)
    department = models.ForeignKey('Department',
                                   null=True, #可以为空值
                                   related_name='student', # 反向查询用(就不_set了：d1.student_set.all() -》d1.student )
                                   on_delete=models.CASCADE)   # 外键,自动关联表的主键 级联删除

    def __str__(self):
        return "Student<s_id=%s, s_name=%s,department_id=%s >"%(self.s_id,
                                                                self.s_name,
                                                                self.department_id)

# 学生选课表
class Course(models.Model):
    c_id = models.AutoField(primary_key=True)
    c_name= models.CharField(max_length=30)
    student = models.ManyToManyField('Student',
                                     related_name='course',
                                     ) # 多对多   生成第三张关系表

    def __str__(self):
        return "Course<c_id=%s,c_name=%s,student=%s>"%(self.c_id,
                                                       self.c_name,
                                                       self.student)

    class Meta:
        # 末尾不加s
        verbose_name_plural = '学生选课表'

# 学生详情表
class Stu_detail(models.Model):
    s_id = models.OneToOneField('Student',on_delete=models.CASCADE)  # 一对一, 级联删除
    s_age = models.IntegerField()
    gender = models.BooleanField(default=1)
    city = models.CharField(max_length=30)

    def __str__(self):
        return "s_id=%s,s_age=%s,s_gender=%s"%(
                                            self.s_id,
                                            self.s_age,
                                            self.gender
        )
#个人信息表

class personal(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    MyCenterName     = models.CharField(max_length=200)
    MyCenterID       = models.IntegerField()
    MyCenterNumber   = models.IntegerField()
    MyCompanyName    = models.CharField(max_length=200)
    MyCompanyID      = models.IntegerField()
    MyCompanyNumber  = models.IntegerField()
    MyWorkRoomName   = models.CharField(max_length=200)
    MyWorkRoomID     = models.IntegerField()
    MyWorkRoomNumber = models.IntegerField()
    MyNumber         = models.IntegerField()
    Name             = models.CharField(max_length=200)
    openid           = models.CharField(max_length=200)
    allDay           = models.IntegerField()
    day              = models.IntegerField()
    image            = models.CharField(max_length=200)
    share            = models.IntegerField()
    time             = models.CharField(max_length=200)
    whetaher         = models.CharField(max_length=200)
    imageArray       = models.TextField()
    def __unicode__(self):
        return self.Name
    class Meta:
        # 末尾不加s
        verbose_name_plural = '个人信息表'





