from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User


class Task(models.Model):

    owner = models.ForeignKey(User, null=False, blank=False, on_delete=models.CASCADE)
    name = models.CharField(max_length=100, null=False, blank=False, unique=True)
    description = models.CharField(max_length = 255, null=False, blank=True)
    b64_binary_file = models.TextField(null=False, blank=False)
    template = models.TextField(null=False, blank=False)

    def __unicode__(self):
        return '<Task: %s>' % self.name


class CrashReport(models.Model):

    task = models.ForeignKey('Task', on_delete=models.CASCADE)
    payload = models.CharField(max_length=100000, null=False, blank=False)
    signal = models.CharField(max_length=40, null=False, blank=False)

    def __unicode__(self):
        return '<CrashReport: %s : %s>' % (self.task.owner.username, self.signal)

    @classmethod
    def create(cls, task, signal, payload):
        return cls(task=task, signal=signal, payload=payload)


class Registers(models.Model):

    crash_report = models.ForeignKey('CrashReport', on_delete=models.CASCADE)
    rax = models.CharField(max_length=20, null=False, blank=False)
    rbx = models.CharField(max_length=20, null=False, blank=False)
    rcx = models.CharField(max_length=20, null=False, blank=False)
    rdx = models.CharField(max_length=20, null=False, blank=False)
    rsi = models.CharField(max_length=20, null=False, blank=False)
    rdi = models.CharField(max_length=20, null=False, blank=False)
    r8 = models.CharField(max_length=20, null=False, blank=False)
    r9 = models.CharField(max_length=20, null=False, blank=False)
    r10 = models.CharField(max_length=20, null=False, blank=False)
    r11 = models.CharField(max_length=20, null=False, blank=False)
    r12 = models.CharField(max_length=20, null=False, blank=False)
    r13 = models.CharField(max_length=20, null=False, blank=False)
    r14 = models.CharField(max_length=20, null=False, blank=False)
    r15 = models.CharField(max_length=20, null=False, blank=False)
    rbp = models.CharField(max_length=20, null=False, blank=False)
    rsp = models.CharField(max_length=20, null=False, blank=False)
    rip = models.CharField(max_length=20, null=False, blank=False)

    def __unicode__(self):
        return '<Registers: RIP : %s, RBP : %s, RSP : %s>' % (self.rip, self.rbp, self.rsp)

    @classmethod
    def create(cls, registers, crash_report):
        return cls(rax="0x%x" % registers['rax'], rbx="0x%x" % registers['rbx'], rcx="0x%x" % registers['rcx'],
                   rdx="0x%x" % registers['rdx'], rsi="0x%x" % registers['rsi'], rdi="0x%x" % registers['rdi'],
                   r8="0x%x" % registers['r8'], r9="0x%x" % registers['r9'], r10="0x%x" % registers['r10'],
                   r11="0x%x" % registers['r11'], r12="0x%x" % registers['r12'], r13="0x%x" % registers['r13'],
                   r14="0x%x" % registers['r14'], r15="0x%x" % registers['r15'], rbp="0x%x" % registers['rbp'],
                   rsp="0x%x" % registers['rsp'], rip="0x%x" % registers['rip'], crash_report=crash_report)
