from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User


class Task(models.Model):

    owner = models.ForeignKey(User, null=False, blank=False, on_delete=models.CASCADE)
    name = models.CharField(max_length=100, null=False, blank=False, unique=True)
    description = models.CharField(max_length = 255, null=False, blank=True)
    b64_binary_file = models.TextField(null=False, blank=False)

    def __unicode__(self):
        return '<Task: %s>' % self.name

