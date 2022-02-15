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
    .get(`/zoogle/shelters`)
    .then(({ data }) => dispatch(receiveShelters(data)))
    .catch(err => dispatch(fetchFailed(err)))
}
