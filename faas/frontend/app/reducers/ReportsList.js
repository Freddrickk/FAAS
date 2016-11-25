import { FETCH_REPORTS_LIST, UPDATE_REPORTS_LIST } from '../actions/ReportsList'

const initialState = {
	fetching: false,
	fetched: false,
	ReportsList: [],
	error: null
}

const ReportsList = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_REPORTS_LIST: {
			return {...state, fetching: true}
			break;
		}

  case UPDATE_REPORTS_LIST:
    return Object.assign({}, state, {ReportsList: action.newList})
    break;

  }
  return state
}

export default ReportsList;
