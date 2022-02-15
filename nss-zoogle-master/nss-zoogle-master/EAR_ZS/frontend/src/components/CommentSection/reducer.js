import { COMMENTS_FETCHING, COMMENTS_DONE, COMMENTS_FAILED } from './actions'
import { APP_STATE } from '../../constants'

export const initialState = {
  commentListState: null,
  comments: [],
  fetchError: '',
}

export default (state, action) => {
  switch (action.type) {
    case COMMENTS_FETCHING:
      return {
        ...state,
        commentListState: APP_STATE.FETCHING,
      }

    case COMMENTS_DONE:
      return {
        ...state,
        commentListState: APP_STATE.DONE,
        comments: action.comments,
      }

    case COMMENTS_FAILED:
      return {
        ...state,
        commentListState: APP_STATE.ERROR,
        comments: [],
        fetchError: action.message,
      }

    default:
      return state
  }
}

export const getAd = ({ ad }) => {
  const type = ad && ad.shelterIdId ? 'Found' : 'Missing'

  return { type, ...ad }
}
