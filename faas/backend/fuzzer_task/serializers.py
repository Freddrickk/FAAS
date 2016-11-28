from rest_framework.serializers import ModelSerializer, ReadOnlyField

from .models import Task, CrashReport, Registers


class CrashReportListSerializer(ModelSerializer):

    owner = ReadOnlyField(source='task.owner.username')
    task_name = ReadOnlyField(source='task.name')

    class Meta:
        model = CrashReport
        fields = ('id', 'task_name', 'owner', 'signal')


class RegisterSerializer(ModelSerializer):

    crash_id = ReadOnlyField(source='crash_report.id')

    class Meta:
        model = Registers
        fields = ('id', 'crash_id', 'rax', 'rbx', 'rcx', 'rdx', 'rsi', 'rdi', 'r8', 'r9', 'r10',
                  'r11', 'r12', 'r13', 'r14', 'r15', 'rbp', 'rsp', 'rip')


class CrashReportSerializer(ModelSerializer):

    task_id = ReadOnlyField(source='task.id')
    registers = RegisterSerializer()

    class Meta:
        model = CrashReport
        fields = ('id', 'task_id', 'payload', 'signal', 'registers')


class TaskSerializer(ModelSerializer):

    owner = ReadOnlyField(source='owner.username')

    class Meta:
        model = Task
        fields = ('name', 'owner', 'description', 'b64_binary_file', 'template')


class TaskListSerializer(ModelSerializer):

    owner = ReadOnlyField(source='owner.username')

    class Meta:
        model = Task
        fields = ('id', 'owner', 'name', 'description')

