from rest_framework.exceptions import ParseError
from rest_framework.serializers import ModelSerializer, ReadOnlyField, PrimaryKeyRelatedField

from .models import Task, CrashReport, Registers


class RegisterSerializer(ModelSerializer):

    crash_id = ReadOnlyField(source='crash_report.id')

    class Meta:
        model = Registers
        fields = ('crash_id', 'rax', 'rbx', 'rcx', 'rdx', 'rsi', 'rdi', 'r8', 'r9', 'r10',
                  'r11', 'r12', 'r13', 'r14', 'r15', 'rbp', 'rsp', 'rip')


class CrashReportListSerializer(ModelSerializer):

    owner = ReadOnlyField(source='task.owner.username')
    task_name = ReadOnlyField(source='task.name')

    class Meta:
        model = CrashReport
        fields = ('id', 'task_name', 'owner', 'signal')


class CrashReportSerializer(ModelSerializer):

    task = PrimaryKeyRelatedField(many=False, queryset=Task.objects.all())
    registers = RegisterSerializer(many=True, required=False)

    class Meta:
        model = CrashReport
        fields = ('payload', 'signal', 'task', 'registers')

    def create(self, validated_data):
        regs = validated_data.get(u'registers')
        if regs is None or not RegisterSerializer(data=regs).is_valid():
            raise ParseError("'registers' field invalid or missing")

        crash_report = CrashReport.create(validated_data[u'task'],
                                          validated_data[u'signal'], validated_data[u'payload'])
        crash_report.save()

        regs = Registers.create(regs, crash_report)
        regs.save()
        return crash_report


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

