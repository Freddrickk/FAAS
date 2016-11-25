from rest_framework.serializers import ModelSerializer, ReadOnlyField

from .models import Task, CrashReport

class CrashReportListSerializer(ModelSerializer):

    owner = ReadOnlyField(source='task.owner.username')
    task_name = ReadOnlyField(source='task.name')

    class Meta:
        model = CrashReport
        fields = ('id', 'task_name', 'owner', 'signal')

class TaskSerializer(ModelSerializer):

    owner = ReadOnlyField(source='owner.username')

    class Meta:
        model = Task
        fields = ('name', 'owner', 'description', 'b64_binary_file')

class TaskListSerializer(ModelSerializer):

    owner = ReadOnlyField(source='owner.username')

    class Meta:
        model = Task
        fields = ('id', 'owner', 'name', 'description')

