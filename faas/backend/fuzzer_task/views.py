from rest_framework.generics import ListCreateAPIView, RetrieveAPIView
from rest_framework.response import Response

from .models import Task
from .serializers import TaskSerializer, TaskListSerializer

class TaskList(ListCreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    def list(self, request):
        serializer = TaskListSerializer(self.get_queryset(), many=True)
        return Response(serializer.data)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class TaskDetail(RetrieveAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

