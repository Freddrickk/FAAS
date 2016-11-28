from django.conf.urls import url

from . import views

urlpatterns = [

    url(r'^task/$', views.TaskList.as_view()),
    url(r'^task/(?P<pk>[0-9]+)/$', views.TaskDetail.as_view()),
    url(r'^report/$', views.CrashReportList.as_view()),
]
