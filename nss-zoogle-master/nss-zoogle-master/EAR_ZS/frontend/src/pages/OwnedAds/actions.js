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

export const fetchOwnedAds = dispatch => {
  dispatch(requestAds())

  return axios
    .get(`/zoogle/ads/owned`)
    .then(({ data }) => dispatch(receiveAds(data)))
    .catch(err => dispatch(fetchFailed(err)))
}

export const deleteAd = (id, dispatch) => {
  return axios
    .delete(`/zoogle/ads/${id}`)
    .then(() => fetchOwnedAds(dispatch))
    .catch(err => console.log(err))
}

export const toggleAdActive = (id, isActive, dispatch) => {
  const newState = isActive === 'CLOSED' ? 'ACTIVE' : 'CLOSED'
  const ad = axios.get(`/zoogle/ads/${id}`).catch(err => console.log(err))

  ad.then(({ data }) => {
    const { state, user, ...oldData } = data

    axios
      .put(`/zoogle/ads/${id}`, { state: newState, ...oldData })
      .then(() => fetchOwnedAds(dispatch))
      .catch(err => console.log(err))
  })
}
