import ctypes
import os
import time
from signal import SIGSTOP, SIGTRAP

from kitty.data.report import Report
from kitty.targets import ServerTarget
import ptrace.debugger
from ptrace.debugger.process_event import ProcessExit


libc = ctypes.CDLL('libc.so.6')


class LinuxProcessStdinTarget(ServerTarget):

    def __init__(self, name, program, args, logger=None):
        """
        program : Target program name
        args : Target command line arguments
        """
        super(LinuxProcessStdinTarget, self).__init__(name, logger)
        self.program = program
        self.args = args
        self.is_active = False
        self.process = None
        self.dbg = None
        self.signals = None
        self.report = Report(name)
        self.pid = None

    def pre_test(self, test_number):
        super(LinuxProcessStdinTarget, self).pre_test(test_number)

        self.dbg = ptrace.debugger.PtraceDebugger()

        if self.is_active:
            return

        self.pid = os.fork()

        if self.pid == 0:
            self.is_active = True
            libc.ptrace(ctypes.c_uint32(0), ctypes.c_uint32(0), None, None)
            os.execve(self.program, self.args, {})

        else:
            self.process = self.dbg.addProcess(self.pid, is_attached=False)

    def post_test(self, test_number):
        pass

    def _send_to_target(self, payload):
        if self.pid == 0:
            return

        with open('/proc/{}/fd/0'.format(self.pid), 'w') as f:
            f.write(payload + '\n')

        self.process.cont()
        self.signals = self.process.waitSignals(SIGSTOP, SIGTRAP)
        try:
            self.process.cont()
            self.signals = self.process.waitSignals()

            print self.signals
        except Exception as e:
            pass

    def _receive_from_target(self):
        pass

    def get_report(self):
        self.report = super(LinuxProcessStdinTarget, self).get_report()
        self.report.add('signals', self.signals)

        return self.report

    def teardown(self):
        super(LinuxProcessStdinTarget, self).teardown()
        self.dbg.deleteProcess(self.pid)
