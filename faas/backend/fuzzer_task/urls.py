from django.conf.urls import url, include
from django.contrib import admin

from . import views

urlpatterns = [
    url(r'^$', views.TaskList.as_view()),
    url(r'^(?P<pk>[0-9]+)/$', views.TaskDetail.as_view()),
]
