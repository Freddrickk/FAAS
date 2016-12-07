import base64
import os
import stat
import tempfile
import subprocess


from rest_framework.generics import ListCreateAPIView, RetrieveAPIView
from rest_framework.exceptions import ParseError
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Task, CrashReport, Registers
from .serializers import TaskSerializer, TaskListSerializer, CrashReportListSerializer, CrashReportSerializer, RegisterSerializer
from .fuzzer.fuzzer import is_valid_binary


class CrashReportList(ListCreateAPIView):
    """
    List all the crash reports done by the fuzzer
    """
    permission_classes = (IsAuthenticated,)
    queryset = CrashReport.objects.all()
    serializer_class = CrashReportSerializer

    def list(self, request):
        serializer = CrashReportListSerializer(self.get_queryset(), many=True)
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

        if not is_valid_binary(bin_path):
            raise ParseError('Invalid binary file')

        args = list()
        args.append('python fuzzer_task/fuzzer/fuzzer.py')
        args.append('--binary {}'.format(bin_path))
        args.append('--template {}'.format(task.template.encode('utf-8')))
        args.append('--task-id {}'.format(task.pk))
        args.append('--token {}'.format(self.request.auth.key))
        args = [arg for s in args for arg in s.split(' ')]

        # Launch the fuzzing task in the background
        subprocess.Popen(args)

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
