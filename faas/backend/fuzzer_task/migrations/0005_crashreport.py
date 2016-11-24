# -*- coding: utf-8 -*-
# Generated by Django 1.10.3 on 2016-11-21 04:17
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('fuzzer_task', '0004_auto_20161028_0859'),
    ]

    operations = [
        migrations.CreateModel(
            name='CrashReport',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('payload', models.CharField(max_length=5000)),
                ('signal', models.CharField(max_length=40)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='fuzzer_task.Task')),
            ],
        ),
    ]