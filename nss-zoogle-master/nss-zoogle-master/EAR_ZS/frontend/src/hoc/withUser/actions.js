import axios from 'axios'

export const USER_FETCHING = 'USER_FETCHING'
export const USER_DONE = 'USER_DONE'
export const USER_FAILED = 'USER_FAILED'

const requestUser = () => ({
  type: USER_FETCHING,
})

const receiveUser = user => ({
  type: USER_DONE,
  user,
})

const fetchFailed = message => ({
  type: USER_FAILED,
  message,
})

export const fetchUser = dispatch => {
  dispatch(requestUser())

  return axios
    .get(`/zoogle/users/currentUser`)
    .then(({ data }) => dispatch(receiveUser(data)))
    .catch(err => dispatch(fetchFailed(err)))
}
