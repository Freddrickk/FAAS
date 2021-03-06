from __future__ import print_function
import argparse
import os
import stat
import sys

from elftools.elf.elffile import ELFFile
from elftools.common.exceptions import ELFError, ELFParseError, ELFRelocationError
from kitty.fuzzers import ServerFuzzer
from kitty.model import *

from controller import LinuxProcessStdinController
from interface import FAASInterface
from target import LinuxProcessStdinTarget


def launch_fuzzing(name, path, args, template, token, report_id):
    fuzzer = ServerFuzzer()
    interface = FAASInterface(report_id, token)
    fuzzer.set_interface(interface)

    model = GraphModel()
    model.connect(template)

    controller = LinuxProcessStdinController('test_ctrl')
    target = LinuxProcessStdinTarget(name, path, args)
    target.set_controller(controller)

    fuzzer.set_model(model)
    fuzzer.set_target(target)
    fuzzer.set_delay_between_tests(0.2)
    fuzzer.start()

    interface.stop()
    fuzzer.stop()


def is_valid_binary(path):
    if os.path.isfile(path):
        if bool(os.stat(path).st_mode & stat.S_IEXEC):
            with open(path, 'rb') as f:
                try:
                    # Make sure this file is an ELF
                    ELFFile(f)
                    return True
                except (ELFError, ELFParseError, ELFRelocationError):
                    pass
    return False


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Fuzzer for the FAAS project')
    parser.add_argument('--binary', '-b', required=True, help='The path of the binary to fuzz')
    parser.add_argument('--argv', '-a', required=False, nargs='*', help='Arguments for the fuzzee binary')
    parser.add_argument('--template', '-t', required=True, help='The fuzzing template')
    parser.add_argument('--token', '-k', required=True, help='FAAS token')
    parser.add_argument('--task-id', '-r', required=True, type=int, help='Id of the related Task')

    args = parser.parse_args()

    if not is_valid_binary(args.binary):
        print('Invalid binary file', file=sys.stderr)
        sys.exit(-1)

    template_ = Template(name='Fuzzing input', fields=[
        String(args.template, name='user'),
    ])
    argv = [] if args.argv is None else args.argv

    launch_fuzzing('Fuzzing Task', args.binary, argv, template_, args.token, args.task_id)
