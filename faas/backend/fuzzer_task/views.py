import base64
import os
import stat
import tempfile

from rest_framework.generics import ListCreateAPIView, RetrieveAPIView, ListAPIView
from rest_framework.exceptions import ParseError
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Task, CrashReport
from .serializers import TaskSerializer, TaskListSerializer, CrashReportListSerializer
from .fuzzer.fuzzer import launch_fuzzing
from .fuzzer.exceptions.template import InvalidTemplate

class CrashReportList(ListAPIView):
    """
    List all the crash reports done by the fuzzer
    """
    permission_classes = (IsAuthenticated,)
    queryset = CrashReport.objects.all()
    serializer_class = CrashReportListSerializer

    def list(self, request):
        serializer = self.serializer_class(self.get_queryset(), many=True)
        return Response(serializer.data)


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

        bin_path = self._create_bin_file(task.b64_binary_file)

        # If the template is invalid, remove the task from the database
        try:
            crash_reports = launch_fuzzing(task.name, bin_path, [], task.template.encode('latin-1'))
        except InvalidTemplate:
            task.delete()
            raise ParseError('Invalid template')

        for signal, payload in crash_reports:
            cr = CrashReport.create(task, signal, payload)
            cr.save()

        os.remove(bin_path)

    def _create_bin_file(self, b64_binary_file):
        fd, path = tempfile.mkstemp()
        os.write(fd, base64.b64decode(b64_binary_file))
        os.close(fd)
        os.chmod(path, stat.S_IEXEC)

        return path


class TaskDetail(RetrieveAPIView):
    """
    Will show information on a task including the binary file in base 64
    """
    permission_classes = (IsAuthenticated,)
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
