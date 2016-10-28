from django.conf.urls import url, include
from django.contrib import admin

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^api/admin/', admin.site.urls),
    url(r'^api/auth/', include('rest_auth.urls')),
    url(r'^api/auth/registration', include('rest_auth.registration.urls')),
    url(r'^api/task/', include('fuzzer_task.urls'))
]
