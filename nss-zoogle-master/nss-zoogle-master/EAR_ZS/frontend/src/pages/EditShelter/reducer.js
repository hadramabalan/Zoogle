import { SHELTER_FETCHING, SHELTER_DONE, SHELTER_FAILED } from './actions'
import { APP_STATE } from '../../constants'

export const initialState = {
  shelterState: null,
  shelter: null,
  fetchError: '',
}

export default (state, action) => {
  switch (action.type) {
    case SHELTER_FETCHING:
      return {
        ...state,
        shelterState: APP_STATE.FETCHING,
      }

    case SHELTER_DONE:
      return {
        ...state,
        shelterState: APP_STATE.DONE,
        shelter: action.shelter,
      }

    case SHELTER_FAILED:
      return {
        ...state,
        shelterState: APP_STATE.ERROR,
        shelter: null,
        fetchError: action.message,
      }

    default:
      return state
  }
}
