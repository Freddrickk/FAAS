import { FETCH_REPORTS_LIST, UPDATE_REPORTS_LIST, FETCH_CRASH_REPORT_DETAIL, UPDATE_CRASH_REPORT_DETAIL } from '../actions/ReportsList'

const initialState = {
	fetching: false,
	fetched: false,
	ReportsList: [],
	error: null,
	currentCrashReport: null
}

const ReportsList = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_REPORTS_LIST: {
			return {...state, fetching: true}
			break;
		}

		 case UPDATE_REPORTS_LIST: {
		    return Object.assign({}, state, {ReportsList: action.newList})
		    break;

		 }

		case UPDATE_CRASH_REPORT_DETAIL: {
		  	return Object.assign({}, state, {currentCrashReport: action.newCrashReportDetail})
		  	break;
		 }}

  		return state
}

export default ReportsList;
