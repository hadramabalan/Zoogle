import {
  SHELTER_LIST_FETCHING,
  SHELTER_LIST_DONE,
  SHELTER_LIST_FAILED,
} from './actions'
import { APP_STATE } from '../../constants'

export const initialState = {
  shelterListState: null,
  shelters: [],
  fetchError: '',
}

export default (state, action) => {
  switch (action.type) {
    case SHELTER_LIST_FETCHING:
      return {
        ...state,
        shelterListState: APP_STATE.FETCHING,
      }

    case SHELTER_LIST_DONE:
      return {
        ...state,
        shelterListState: APP_STATE.DONE,
        shelters: action.shelters,
      }

    case SHELTER_LIST_FAILED:
      return {
        ...state,
        shelterListState: APP_STATE.ERROR,
        shelters: [],
        fetchError: action.message,
      }

    default:
      return state
  }
}
