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

export const fetchRequests = dispatch => {
  dispatch(requestRequests())

  return axios
    .get(`/zoogle/admin/shelters/requests`)
    .then(({ data }) => {
      console.log(data)
      dispatch(receiveRequests(data))
    })
    .catch(err => dispatch(fetchFailed(err)))
}

export const approveRequest = (shelterId, dispatch) => {
  return axios
    .put(`/zoogle/admin/shelters/requests/${shelterId}`)
    .then(() => {
      fetchRequests(dispatch)
    })
    .catch(err => console.log(err))
}

export const denyRequest = (shelterId, dispatch) => {
  return axios
    .delete(`/zoogle/shelters/${shelterId}`)
    .then(() => fetchRequests(dispatch))
    .catch(err => console.log(err))
}
