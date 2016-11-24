from rest_framework.serializers import ModelSerializer, ReadOnlyField

from .models import Task

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

