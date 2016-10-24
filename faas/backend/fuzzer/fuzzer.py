from katnip.targets import application
from kitty.model import *


email_input = Template(name='Email', fields=[
    String('fred', name='user'),
    Delimiter('@', name='at'),
    String('gmail', name='domain'),
    Delimiter('.', name='dot'),
    String('com', name='tld')
])

target = application.ApplicationTarget('Vuln', 'examples/vuln', None)

