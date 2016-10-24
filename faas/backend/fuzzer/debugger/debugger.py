# This class contains the debugger
import ctypes
import os
import time

from debugger_types import *


# Libc handle
libc = ctypes.CDLL('libc.so.6')


class BaseDebugger:
    def __init__(self):
        pass

    def run(self):
        pass


class LinuxDebugger(BaseDebugger):

    def __init__(self, program, args):
        self.program = program
        self.args = args
        self.is_active = False

    def run(self):

        if self.is_active:
            return

        pid = libc.fork()

        if pid == 0:
            # Debuggee
            self.is_active = True


            Argv = ctypes.c_char_p * 2
            argv = Argv('/bin/touch', 'a')

            libc.ptrace(PTRACE_TRACEME, ctypes.c_int32(0), None, None)
            libc.execve(ctypes.c_char_p('/bin/touch'), argv, None)


        else:
            wstatus = ctypes.c_int()
            (pid, status) = os.waitpid(pid, 0)

            if os.WIFSTOPPED(status):
                print "STOPPED"

            libc.ptrace(PTRACE_CONT, pid, None, None)

            # Debugger
            pass

    def cont(self):
        libc.ptrace(PTRACE_CONT, pid, None, None)


dbg = LinuxDebugger('../examples/vuln/', [])

dbg.run()
