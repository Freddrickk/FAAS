# -*- coding: utf-8 -*-
# Generated by Django 1.10.3 on 2016-12-16 03:25
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fuzzer_task', '0009_registers'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='pid',
            field=models.PositiveIntegerField(default=0),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='task',
            name='state',
            field=models.CharField(choices=[('r', 'Running'), ('e', 'Ended'), ('k', 'Killed')], default='e', max_length=1),
            preserve_default=False,
        ),
    ]
