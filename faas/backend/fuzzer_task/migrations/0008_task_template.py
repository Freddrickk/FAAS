# -*- coding: utf-8 -*-
# Generated by Django 1.10.3 on 2016-11-24 23:19
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fuzzer_task', '0007_auto_20161121_0526'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='template',
            field=models.TextField(default=''),
            preserve_default=False,
        ),
    ]
