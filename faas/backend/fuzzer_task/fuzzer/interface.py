import base64
import threading
import time
import sys
import pprint
import requests
from threading import Thread

from kitty.interfaces.base import EmptyInterface


class FAASReporterThread(Thread):

    def __init__(self, args):
        super(FAASReporterThread, self).__init__(target=self._send_report_thread, args=args)

    def _send_report_thread(self, interface, token, host, port, fuzzing_done):
        logger = interface.logger
        logger.info("Report thread started")
        dataman = interface.dataman
        self._init_session(token)
        self.task_id = interface.task_id
        self.host = host
        self.port = port

        old_report_list = []
        total_report = -1
        report_list = dataman.get_report_list()
        while not fuzzing_done.is_set() or len(old_report_list) != total_report:
            for id_, _, _ in report_list:
                if id_ not in old_report_list:
                    old_report_list.append(id_)
                    report = self._format_report(dataman.get_report_by_id(id_).to_dict())
                    self._send_report(report)

            report_list = dataman.get_report_list()
            total_report = len(report_list)

        self._end_task()

    def _format_report(self, data):
        report = {}
        regs = data['registers']
        del regs["name"]
        del regs["status"]
        del regs["sub_reports"]

        for k, v in regs.items():
            regs[k] = base64.b64decode(v)

        report['task'] = self.task_id
        report['signal'] = base64.b64decode(data['signal'])
        report['payload'] = data['payload']['raw']
        report['registers'] = regs

        return report

    def _send_report(self, report):
        url = "{host}:{port}".format(host='http://{}'.format(self.host), port=self.port)
        endpoint = '/api/report/'

        try:
            r = self.session.post(url + endpoint, json=report, timeout=5)
            print(r.status_code)
        except Exception as e:
            print e.message

    def _end_task(self):
        url = "{host}:{port}".format(host='http://{}'.format(self.host), port=self.port)
        endpoint = '/api/task/stop/{}/'.format(self.task_id)

        try:
            r = self.session.delete(url + endpoint, timeout=5)
            print(r.status_code)
        except Exception as e:
            print e.message

    def _init_session(self, token):
        self.session = requests.Session()
        self.session.headers.update({'authorization': 'Token {}'.format(token)})


class FAASInterface(EmptyInterface):
    '''
    Interface for the Fuzzing-as-a-service (FAAS) project
    '''

    def __init__(self, task_id, token, host='localhost', port=8000):
        '''
        :param task_id: FAAS related Task id
        :param token: FAAS token
        :param host: FAAS API host address
        :param port: FAAS API port
        '''
        super(FAASInterface, self).__init__('Interface for FAAS')
        self.host = host
        self.port = port
        self.task_id = task_id
        self.token = token
        self.reporter = None
        self.fuzzing_done = threading.Event()

    def _start(self):
        self.reporter = FAASReporterThread(args=(self, self.token, self.host, self.port, self.fuzzing_done))
        self.reporter.start()

    def get_description(self):
        return "FAAS client running"

    def _stop(self):
        self.fuzzing_done.set()
        self.reporter.join()
