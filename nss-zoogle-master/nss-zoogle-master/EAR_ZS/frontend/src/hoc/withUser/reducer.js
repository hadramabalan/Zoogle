import { USER_FETCHING, USER_DONE, USER_FAILED } from './actions'
import { APP_STATE } from '../../constants'

export const initialState = {
  userState: null,
  user: null,
  fetchError: '',
}

export default (state, action) => {
  switch (action.type) {
    case USER_FETCHING:
      return {
        ...state,
        userState: APP_STATE.FETCHING,
      }

    case USER_DONE:
      return {
        ...state,
        userState: APP_STATE.DONE,
        user: action.user,
      }

    case USER_FAILED:
      return {
        ...state,
        userState: APP_STATE.ERROR,
        user: null,
        fetchError: action.message,
      }

    default:
      return state
  }
}
