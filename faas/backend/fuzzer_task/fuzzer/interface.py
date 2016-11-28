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

    def _send_report_thread(self, interface, session_id, token, host, port, fuzzing_done):
        logger = interface.logger
        logger.info("Report thread started")
        dataman = interface.dataman
        self._init_session(session_id, token)
        self.report_it = interface.report_id
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

    def _format_report(self, data):
        report = {}
        regs = data['registers']
        del regs["name"]
        del regs["status"]
        del regs["sub_reports"]

        report['registers'] = regs
        report['signal'] = base64.b64decode(data['signal'])
        report['payload'] = data['payload']['raw']

        return report

    def _send_report(self, report):
        url = "{host}:{port}".format(host='http://{}'.format(self.host), port=self.port)
        endpoint = '/api/report/'

        #print "Try send report sent..."
        #pprint.pprint(self.session.cookies)
        #pprint.pprint(report)
        try:
            self.session.post(url + endpoint, report, timeout=1)
        except Exception as e:
            print 'timeout'

    def _init_session(self, session_id, token):
        self.session = requests.Session()
        self.session.cookies.set('sessionid', session_id)
        self.session.cookies.set('token', token)


class FAASInterface(EmptyInterface):
    '''
    Interface for the Fuzzing-as-a-service (FAAS) project
    '''

    def __init__(self, report_id, session_id, token, host='localhost', port=8080):
        '''
        :param report_id: FAAS Crash report id
        :param session_id: FAAS session id
        :param token: FAAS token
        :param host: FAAS API host address
        :param port: FAAS API port
        '''
        super(FAASInterface, self).__init__('Interface for FAAS')
        self.host = host
        self.port = port
        self.report_id = report_id
        self.session_id = session_id
        self.token = token
        self.reporter = None
        self.fuzzing_done = threading.Event()

    def _start(self):
        self.reporter = FAASReporterThread(args=(self, self.session_id, self.token, self.host, self.port, self.fuzzing_done))
        self.reporter.start()

    def get_description(self):
        return "FAAS client running"

    def _stop(self):
        self.fuzzing_done.set()
        self.reporter.join()
