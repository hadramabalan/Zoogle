import axios from 'axios'

export const AD_FETCHING = 'AD_LIST_FETCHING'
export const AD_DONE = 'AD_LIST_DONE'
export const AD_FAILED = 'AD_LIST_FAILED'

const requestAd = () => ({
  type: AD_FETCHING,
})

const receiveAd = ad => ({
  type: AD_DONE,
  ad,
})

const fetchFailed = message => ({
  type: AD_FAILED,
  message,
})

export const fetchAd = (id, dispatch) => {
  dispatch(requestAd())

  return axios
    .get(`/zoogle/ads/${id}`)
    .then(({ data }) => {
      console.log(data)
      dispatch(receiveAd(data))
    })
    .catch(err => dispatch(fetchFailed(err)))
}
