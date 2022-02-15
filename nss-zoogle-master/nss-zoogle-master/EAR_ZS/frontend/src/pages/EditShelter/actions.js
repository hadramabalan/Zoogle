import axios from 'axios'

export const SHELTER_FETCHING = 'SHELTER_FETCHING'
export const SHELTER_DONE = 'SHELTER_DONE'
export const SHELTER_FAILED = 'SHELTER_FAILED'

const requestShelter = () => ({
  type: SHELTER_FETCHING,
})

const receiveShelter = shelter => ({
  type: SHELTER_DONE,
  shelter,
})

const fetchFailed = message => ({
  type: SHELTER_FAILED,
  message,
})

export const fetchShelter = (id, dispatch) => {
  dispatch(requestShelter())

  return axios
    .get(`/zoogle/shelters/${id}`)
    .then(({ data }) => dispatch(receiveShelter(data)))
    .catch(err => dispatch(fetchFailed(err)))
}
