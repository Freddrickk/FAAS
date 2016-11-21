from django.contrib import admin
from .models import Task, CrashReport

@admin.register(Task)
class TaskPageAdmin(admin.ModelAdmin):
    list_display = ('name', 'owner', 'description')
    fields = ('owner', 'name', 'description', 'b64_binary_file')

@admin.register(CrashReport)
class CrashReportPageAdmin(admin.ModelAdmin):
    list_display = ('task', 'payload', 'signal')
    fields = ('task', 'payload', 'signal')



