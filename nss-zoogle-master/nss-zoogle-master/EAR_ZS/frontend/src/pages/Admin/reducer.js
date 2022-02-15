import {
  REQUEST_LIST_FETCHING,
  REQUEST_LIST_DONE,
  REQUEST_LIST_FAILED,
} from './actions'
import { APP_STATE } from '../../constants'

export const initialState = {
  requestListState: null,
  shelters: [],
  fetchError: '',
}

export default (state, action) => {
  switch (action.type) {
    case REQUEST_LIST_FETCHING:
      return {
        ...state,
        requestListState: APP_STATE.FETCHING,
      }

    case REQUEST_LIST_DONE:
      return {
        ...state,
        requestListState: APP_STATE.DONE,
        requests: action.requests,
      }

    case REQUEST_LIST_FAILED:
      return {
        ...state,
        shelterListState: APP_STATE.ERROR,
        requests: [],
        fetchError: action.message,
      }

    default:
      return state
  }
}
