from django.contrib import admin
from .models import Task, CrashReport, Registers

@admin.register(Task)
class TaskPageAdmin(admin.ModelAdmin):
    list_display = ('name', 'owner', 'description')
    fields = ('owner', 'name', 'description', 'b64_binary_file', 'template')

@admin.register(CrashReport)
class CrashReportPageAdmin(admin.ModelAdmin):
    list_display = ('task', 'payload', 'signal')
    fields = ('task', 'payload', 'signal')

@admin.register(Registers)
class CrashReportPageAdmin(admin.ModelAdmin):
    list_display = ('rip', 'rbp', 'rsp')
    fields = ('rax', 'rbx', 'rcx', 'rdx', 'rsi', 'rdi',
              'r8', 'r9', 'r10', 'r11', 'r12', 'r13', 'r14', 'r15',
              'rbp', 'rsp', 'rip')
