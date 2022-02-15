import axios from 'axios'

export const AD_LIST_FETCHING = 'AD_LIST_FETCHING'
export const AD_LIST_DONE = 'AD_LIST_DONE'
export const AD_LIST_FAILED = 'AD_LIST_FAILED'

const requestAds = () => ({
  type: AD_LIST_FETCHING,
})

const receiveAds = ads => ({
  type: AD_LIST_DONE,
  ads,
})

const fetchFailed = message => ({
  type: AD_LIST_FAILED,
  message,
})

export const fetchAds = dispatch => {
  dispatch(requestAds())

  return axios
    .get(`/zoogle/ads`)
    .then(({ data }) => {
      console.log(data)
      dispatch(receiveAds(data))
    })
    .catch(err => dispatch(fetchFailed(err)))
}
