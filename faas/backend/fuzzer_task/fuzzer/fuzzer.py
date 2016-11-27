import base64
import stat
import subprocess
from multiprocessing import Process, Manager

from elftools.elf.elffile import ELFFile
from elftools.common.exceptions import ELFError, ELFParseError, ELFRelocationError
from kitty.fuzzers import ServerFuzzer
from kitty.interfaces import WebInterface
from kitty.model import *

from controller import LinuxProcessStdinController
from target import LinuxProcessStdinTarget
from fuzzer_exceptions.exceptions import InvalidTemplate, InvalidExecutable

READELF = 'readelf'


def _launch_fuzzing(report, name, path, args, template):
    fuzzer = ServerFuzzer()
    interface = WebInterface(host='127.0.0.1', port=26001)
    fuzzer.set_interface(interface)

    model = GraphModel()
    model.connect(template)

    controller = LinuxProcessStdinController('test_ctrl')
    target = LinuxProcessStdinTarget(name, path, args)
    target.set_controller(controller)

    fuzzer.set_model(model)
    fuzzer.set_target(target)
    fuzzer.start()

    dm = fuzzer.dataman
    ids = dm.get_report_test_ids()

    for id in ids:
        crash_report = dm.get_report_by_id(id).to_dict()

        signal = base64.b64decode(crash_report['signal'])
        payload = crash_report['payload']['raw']
        reg_report = crash_report['registers']
        registers = {}

        for reg in reg_report:
            if reg not in ["name", "status", "sub_reports"]:
                registers[reg] = reg_report[reg]

        report.append((signal, payload, registers))


def _is_valid_ELF(path):
    if os.path.isfile(path):
        if bool(os.stat(path).st_mode & stat.S_IEXEC):
            with open(path, 'rb') as f:
                # Make sure this file is an ELF
                ELFFile(f)
                return True
    return False


def launch_fuzzing(name, path, args, template, launch_proc=True):
    manager = Manager()
    report = manager.list()

    if type(template) is not str:
        raise InvalidTemplate('Template must be a string')

    err_msg = None
    valid_executable = False
    try:
        valid_executable = _is_valid_ELF(path)
    except (ELFError, ELFParseError, ELFRelocationError) as e:
        err_msg = e.message

    if not valid_executable:
        err_msg = 'File doesn\'t exist' if err_msg is None else 'Invalid ELF : {}'.format(err_msg)
        raise InvalidExecutable(err_msg)

    template_ = Template(name='Fuzzing input', fields=[
        String(template, name='user'),
    ])

    if launch_proc:
        p = Process(target=_launch_fuzzing, args=(report, name, path, args, template_))
        p.start()
        p.join()
    else:
        _launch_fuzzing(report, name, path, args, template_)

    return report


if __name__ == '__main__':
    print launch_fuzzing('test', 'examples/vuln', [], "AAAAAAA", launch_proc=False)
