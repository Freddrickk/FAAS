from katnip.targets import application
from kitty.model import *
from kitty.fuzzers import ServerFuzzer
from kitty.interfaces import WebInterface
from kitty.model import *
from kitty.targets import ServerTarget

import controller
import target


email_input = Template(name='Email', fields=[
    String('fred', name='user'),
    Delimiter('@', name='at'),
    String('gmail', name='domain'),
    Delimiter('.', name='dot'),
    String('com', name='tld')
])


fuzzer = ServerFuzzer()
fuzzer.set_interface(WebInterface(host='127.0.0.1', port=26001))

model = GraphModel()
model.connect(email_input)

controller = controller.LinuxProcessStdinController('test_ctrl')
target = target.LinuxProcessStdinTarget('test', 'examples/vuln', [])
target.set_controller(controller)


fuzzer.set_model(model)
fuzzer.set_target(target)
fuzzer.set_delay_between_tests(0.51)

fuzzer.set_delay_between_tests(1)
fuzzer.start()




