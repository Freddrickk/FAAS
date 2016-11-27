# Contains the C structures and enums
from ctypes import *


# Ptrace request types
PTRACE_TRACEME = c_int32(0)
PTRACE_PEEKTEXT = c_int32(1)
PTRACE_PEEKDATA = c_int32(2)
PTRACE_PEEKUSER = c_int32(3)
PTRACE_POKETEXT = c_int32(4)
PTRACE_POKEDATA = c_int32(5)
PTRACE_POKEUSER = c_int32(6)
PTRACE_CONT = c_int32(7)
PTRACE_KILL = c_int32(8)
PTRACE_SINGLESTEP = c_int32(9)
PTRACE_GETREGS = c_int32(12)
PTRACE_SETREGS = c_int32(13)
PTRACE_GETFPREGS = c_int32(14)
PTRACE_SETFPREGS = c_int32(15)
PTRACE_ATTACH = c_int32(16)
PTRACE_DETACH = c_int32(17)
TRACE_GETFPXREGS = c_int32(18)
PTRACE_SETFPXREGS = c_int32(19)
PTRACE_SYSCALL = c_int32(24)
PTRACE_SETOPTIONS = c_int32(0x4200)
PTRACE_GETEVENTMSG = c_int32(0x4201)
PTRACE_GETSIGINFO = c_int32(0x4202)
PTRACE_SETSIGINFO = c_int32(0x4203)
PTRACE_GETREGSET = c_int32(0x4204)
PTRACE_SETREGSET = c_int32(0x4205)
PTRACE_SEIZE = c_int32(0x4206)
PTRACE_INTERRUPT = c_int32(0x4207)
PTRACE_LISTEN = c_int32(0x4208)
PTRACE_PEEKSIGINFO = c_int32(0x4209)
PTRACE_GETSIGMASK = c_int32(0x420a)
PTRACE_SETSIGMASK = c_int32(0x420b)
PTRACE_SECCOMP_GET_FILTER = c_int32(0x420c)

pid_t = c_int32

class UserRegsStruct64(Structure):
    """Processor context for x86_64"""
    _fields_ = [
        ('r15', c_ulonglong),
        ('r14', c_ulonglong),
        ('r13', c_ulonglong),
        ('r12', c_ulonglong),
        ('rbp', c_ulonglong),
        ('rbx', c_ulonglong),
        ('r11', c_ulonglong),
        ('r10', c_ulonglong),
        ('r9', c_ulonglong),
        ('r8', c_ulonglong),
        ('rax', c_ulonglong),
        ('rcx', c_ulonglong),
        ('rdx', c_ulonglong),
        ('rsi', c_ulonglong),
        ('rdi', c_ulonglong),
        ('orig_rax', c_ulonglong),
        ('rip', c_ulonglong),
        ('cs', c_ulonglong),
        ('eflags', c_ulonglong),
        ('rsp', c_ulonglong),
        ('ss', c_ulonglong),
        ('fs_base', c_ulonglong),
        ('gs_base', c_ulonglong),
        ('ds', c_ulonglong),
        ('es', c_ulonglong),
        ('fs', c_ulonglong),
        ('gs', c_ulonglong),
    ]


class UserRegsStruct32(Structure):
    """Processor context for x86"""
    _fields_ = [
        ('ebx', c_long),
        ('ecx', c_long),
        ('edx', c_long),
        ('esi', c_long),
        ('edi', c_long),
        ('ebp', c_long),
        ('eax', c_long),
        ('xds', c_long),
        ('xes', c_long),
        ('xfs', c_long),
        ('xgs', c_long),
        ('orig_eax', c_long),
        ('eip', c_long),
        ('xcs', c_long),
        ('eflags', c_long),
        ('esp', c_long),
        ('xss', c_long),
    ]



