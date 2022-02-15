import axios from 'axios'

export const SHELTER_LIST_FETCHING = 'AD_LIST_FETCHING'
export const SHELTER_LIST_DONE = 'AD_LIST_DONE'
export const SHELTER_LIST_FAILED = 'AD_LIST_FAILED'

const requestShelters = () => ({
  type: SHELTER_LIST_FETCHING,
})

const receiveShelters = shelters => ({
  type: SHELTER_LIST_DONE,
  shelters,
})

const fetchFailed = message => ({
  type: SHELTER_LIST_FAILED,
  message,
})

export const fetchShelters = dispatch => {
  dispatch(requestShelters())

  return axios
    .get(`/zoogle/shelters/employed`)
    .then(({ data }) => fetchShelterAds(data, dispatch))
    .catch(err => dispatch(fetchFailed(err)))
}

export const deleteShelter = (id, dispatch) => {
  return axios
    .delete(`/zoogle/shelters/${id}`)
    .then(() => fetchShelters(dispatch))
    .catch(err => console.log(err))
}

export const deleteAd = (id, dispatch) => {
  return axios
    .delete(`/zoogle/ads/${id}`)
    .then(() => fetchShelters(dispatch))
    .catch(err => console.log(err))
}

export const toggleAdActive = (id, isActive, dispatch) => {
  const newState = isActive === 'CLOSED' ? 'ACTIVE' : 'CLOSED'
  const ad = axios.get(`/zoogle/ads/${id}`).catch(err => console.log(err))

  ad.then(({ data }) => {
    const { state, shelter, ...oldData } = data

    return axios
      .put(`/zoogle/ads/${id}`, { state: newState, ...oldData })
      .then(() => fetchShelters(dispatch))
      .catch(err => console.log(err))
  }).catch(err => console.log(err))
}

const fetchShelterAds = (shelters, dispatch) => {
  const promises = shelters.map(shelter => {
    return axios
      .get(`/zoogle/shelters/${shelter.id}/ads`)
      .then(({ data }) => (shelter.ads = data))
  })

  Promise.all([promises])
    .then(dispatch(receiveShelters(shelters)))
    .catch(err => fetchFailed(err))
}
