import axios from 'axios'

export const REQUEST_LIST_FETCHING = 'REQUEST_LIST_FETCHING'
export const REQUEST_LIST_DONE = 'REQUEST_LIST_DONE'
export const REQUEST_LIST_FAILED = 'REQUEST_LIST_FAILED'

const requestRequests = () => ({
  type: REQUEST_LIST_FETCHING,
})

const receiveRequests = requests => ({
  type: REQUEST_LIST_DONE,
  requests,
})

const fetchFailed = message => ({
  type: REQUEST_LIST_FAILED,
  message,
})

export const fetchRequests = (id, dispatch) => {
  dispatch(requestRequests())

  return axios
    .get(`/zoogle/shelters/${id}/employees/requests`)
    .then(({ data }) => dispatch(receiveRequests(data)))
    .catch(err => dispatch(fetchFailed(err)))
}

export const handleRequest = (shelterId, userId, state, dispatch) => {
  return axios
    .put(`/zoogle/shelters/${shelterId}/employees/${userId}/${state}`)
    .then(() => fetchRequests(shelterId, dispatch))
    .catch(err => console.log(err))
}
