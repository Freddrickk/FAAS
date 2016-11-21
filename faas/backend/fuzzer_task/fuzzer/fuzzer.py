import base64
import time
from multiprocessing import Process, Manager

from kitty.fuzzers import ServerFuzzer
from kitty.interfaces import WebInterface
from kitty.model import *

from controller import LinuxProcessStdinController
from target import LinuxProcessStdinTarget


def launch_in_main_thread(report, name, path, args):
    _launch_fuzzing(report, name, path, args)


def _launch_fuzzing(report, name, path, args):
    email_input = Template(name='Email', fields=[
        String('fred', name='user'),
        Delimiter('@', name='at'),
        String('gmail', name='domain'),
        Delimiter('.', name='dot'),
        String('com', name='tld')
    ])

    fuzzer = ServerFuzzer()
    interface = WebInterface(host='127.0.0.1', port=26001)
    fuzzer.set_interface(interface)

    model = GraphModel()
    model.connect(email_input)

    controller = LinuxProcessStdinController('test_ctrl')
    target = LinuxProcessStdinTarget(name, path, args)
    target.set_controller(controller)

    fuzzer.set_model(model)
    fuzzer.set_target(target)
    fuzzer.start()

    dm = fuzzer.dataman
    ids = dm.get_report_test_ids()

    for id in ids:
        crash_report = dm.get_report_by_id(id).to_dict()['crash']
        signal = base64.b64decode(crash_report['signal'])
        payload = crash_report['payload']
        report.append((signal, payload))


def launch_fuzzing(name, path, args):
    manager = Manager()
    report = manager.list()
    p = Process(target=_launch_fuzzing, args=(report, name, path, args))
    p.start()
    p.join()

    return report


if __name__ == '__main__':
    launch_in_main_thread([], 'test', 'examples/vuln', [])
