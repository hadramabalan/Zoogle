import axios from 'axios'

export const COMMENTS_FETCHING = 'COMMENT_FETCHING'
export const COMMENTS_DONE = 'COMMENT_DONE'
export const COMMENTS_FAILED = 'COMMENT_FAILED'

const requestComments = () => ({
  type: COMMENTS_FETCHING,
})

const receiveComments = comments => ({
  type: COMMENTS_DONE,
  comments,
})

const fetchFailed = message => ({
  type: COMMENTS_FAILED,
  message,
})

export const fetchComments = (id, dispatch) => {
  dispatch(requestComments())

  return axios
    .get(`/zoogle/ads/${id}/comments`)
    .then(({ data }) => dispatch(receiveComments(data)))
    .catch(err => dispatch(fetchFailed(err)))
}

export const postComment = (id, values, dispatch) => {
  dispatch(requestComments())
  const params = new URLSearchParams({ comment: values.text }).toString()

  return axios
    .post(`/zoogle/ads/${id}/comments?${params}`)
    .then(({ data }) => fetchComments(id, dispatch))
    .catch(err => dispatch(fetchFailed(err)))
}
