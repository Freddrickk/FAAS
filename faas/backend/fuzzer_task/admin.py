from django.contrib import admin
from .models import Task

@admin.register(Task)
class TaskPageAdmin(admin.ModelAdmin):
    list_display = ('name', 'owner', 'description')
    fields = ('owner', 'name', 'description', 'b64_binary_file')


