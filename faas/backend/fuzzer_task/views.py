import os
from rest_framework.generics import ListCreateAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Task, CrashReport
from .serializers import TaskSerializer, TaskListSerializer

from .fuzzer.fuzzer import launch_fuzzing


class TaskList(ListCreateAPIView):
    """
    List all the task when using method GET and will create a new
    fuzzing task on POST
    """
    permission_classes = (IsAuthenticated,)
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    def list(self, request):
        serializer = TaskListSerializer(self.get_queryset(), many=True)
        return Response(serializer.data)

    def perform_create(self, serializer):
        task = serializer.save(owner=self.request.user)
        #print self.request.data['name']

        for signal, payload in launch_fuzzing('test', '/code/fuzzer_task/fuzzer/examples/vuln', []):
            cr = CrashReport.create(task, signal, payload)
            cr.save()




class TaskDetail(RetrieveAPIView):
    """
    Will show information on a task including the binary file in base 64
    """
    permission_classes = (IsAuthenticated,)
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
