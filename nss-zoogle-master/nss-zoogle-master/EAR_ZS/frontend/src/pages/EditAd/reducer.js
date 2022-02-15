import { AD_FETCHING, AD_DONE, AD_FAILED } from './actions'
import { APP_STATE } from '../../constants'

export const initialState = {
  adState: null,
  ad: null,
  fetchError: '',
}

export default (state, action) => {
  switch (action.type) {
    case AD_FETCHING:
      return {
        ...state,
        adState: APP_STATE.FETCHING,
      }

    case AD_DONE:
      return {
        ...state,
        adState: APP_STATE.DONE,
        ad: action.ad,
      }

    case AD_FAILED:
      return {
        ...state,
        adState: APP_STATE.ERROR,
        ad: null,
        fetchError: action.message,
      }

    default:
      return state
  }
}

export const getAd = ({ ad }) => {
  if (ad) {
    const type = ad.shelterIdId ? 'Found' : 'Missing'
    const { animal, ...rest } = ad
    const newAd = { ...rest, ...animal }

    return { type, ...newAd }
  }

  return ad
}
