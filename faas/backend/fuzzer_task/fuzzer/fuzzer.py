import time
from multiprocessing import Process, Manager

from kitty.fuzzers import ServerFuzzer
from kitty.interfaces import WebInterface
from kitty.model import *

from controller import LinuxProcessStdinController
from target import LinuxProcessStdinTarget


def _launch_fuzzing(report):
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
    print os.getcwd()
    target = LinuxProcessStdinTarget('test', '/code/fuzzer_task/fuzzer/examples/vuln', [])
    target.set_controller(controller)

    fuzzer.set_model(model)
    fuzzer.set_target(target)
    fuzzer.start()

    for elem in fuzzer.dataman.get_report_list():
        report.append(elem)


def launch_fuzzing():
    manager = Manager()
    report = manager.list()
    p = Process(target=_launch_fuzzing, args=(report,))
    p.start()
    p.join()

    return report

