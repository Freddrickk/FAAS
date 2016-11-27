import ctypes
import os
import time
import signal

from kitty.data.report import Report
from kitty.targets import ServerTarget
from ptrace_types import *


SIGNALS = dict((k, v) for v, k in reversed(sorted(signal.__dict__.items())) if v.startswith('SIG') and not v.startswith('SIG_'))
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
        self.signals = None
        self.report = Report(name)
        self.pid = None

    def pre_test(self, test_number):
        super(LinuxProcessStdinTarget, self).pre_test(test_number)

        pipe_r, self.pipe_w = os.pipe()
        self.pid = os.fork()

        if self.pid == 0:
            os.dup2(pipe_r, 0)
            os.close(self.pipe_w)
            libc.ptrace(PTRACE_TRACEME, ctypes.c_uint32(0), None, None)
            os.execve(self.program, self.args, {})
        else:
            os.dup2(self.pipe_w, 0)
            os.close(pipe_r)

    def post_test(self, test_number):
        pass

    def _send_to_target(self, payload):
        pid, status = os.waitpid(self.pid, 0)

        os.write(self.pipe_w, payload + '\n')

        while True:
            if os.WIFEXITED(status):
                print 'Program exited with exit code {}'.format(os.WEXITSTATUS(status))
                return
            elif os.WIFSIGNALED(status):
                print 'Terminated with unhandled signal : {}'.format(os.WTERMSIG(status))
                return
            elif os.WIFSTOPPED(status):
                print "Stopped due to signal {}".format(SIGNALS[os.WSTOPSIG(status)])

            sig = os.WSTOPSIG(status)

            if sig == signal.SIGBUS or sig == signal.SIGSEGV or sig == signal.SIGSYS or sig == signal.SIGILL:
                print "#---- CRASH ----#"
                regs_report = self._get_registers_report()
                regs_report.failed()
                self.report.add('signal', SIGNALS[os.WSTOPSIG(status)])
                self.report.add('registers', regs_report)

                libc.ptrace(PTRACE_DETACH, self.pid, None, None)
                os.waitpid(self.pid, 0)
                return
            else:
                libc.ptrace(PTRACE_CONT, self.pid, None, None)

            pid, status = os.waitpid(self.pid, 0)

    def _get_registers_report(self):
        regs = self._get_registers()
        report = Report('Registers')
        report.add('rax', regs.rax)
        report.add('rbx', regs.rbx)
        report.add('rcx', regs.rcx)
        report.add('rdx', regs.rdx)
        report.add('rsi', regs.rsi)
        report.add('rdi', regs.rdi)
        report.add('r8', regs.r8)
        report.add('r9', regs.r9)
        report.add('r10', regs.r10)
        report.add('r11', regs.r11)
        report.add('r12', regs.r12)
        report.add('r13', regs.r13)
        report.add('r14', regs.r14)
        report.add('r15', regs.r15)
        report.add('rbp', regs.rbp)
        report.add('rsp', regs.rsp)
        report.add('rip', regs.rip)

        return report

    def _get_registers(self):
        regs = UserRegsStruct64()
        libc.ptrace(PTRACE_GETREGS, self.pid, None, byref(regs))

        return regs

    def _receive_from_target(self):
        pass

    def get_report(self):
        self.report = super(LinuxProcessStdinTarget, self).get_report()
        return self.report

    def teardown(self):
        super(LinuxProcessStdinTarget, self).teardown()
