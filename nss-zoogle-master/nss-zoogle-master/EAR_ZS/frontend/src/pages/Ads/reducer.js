import { AD_LIST_FETCHING, AD_LIST_DONE, AD_LIST_FAILED } from './actions'
import { APP_STATE } from '../../constants'

export const initialState = {
  adListState: null,
  ads: [],
  fetchError: '',
}

export default (state, action) => {
  switch (action.type) {
    case AD_LIST_FETCHING:
      return {
        ...state,
        adListState: APP_STATE.FETCHING,
      }

    case AD_LIST_DONE:
      return {
        ...state,
        adListState: APP_STATE.DONE,
        ads: action.ads,
      }

    case AD_LIST_FAILED:
      return {
        ...state,
        adListState: APP_STATE.ERROR,
        ads: [],
        fetchError: action.message,
      }

    default:
      return state
  }
}
