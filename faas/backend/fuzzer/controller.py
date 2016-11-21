from kitty.controllers.base import BaseController
from kitty.data.report import Report


class LinuxProcessStdinController(BaseController):

    def __init__(self, name, logger=None):
        super(LinuxProcessStdinController, self).__init__(name, logger)
        self.report = Report(name)

    def pre_test(self, test_number):
        super(LinuxProcessStdinController, self).post_test()

    def post_test(self):
        super(LinuxProcessStdinController, self).post_test()

    def teardown(self):
        super(LinuxProcessStdinController, self).teardown()
