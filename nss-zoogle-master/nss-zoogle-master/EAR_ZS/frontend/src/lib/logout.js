import Cookies from 'js-cookie'
import axios from 'axios'

export default (history, updateLog) => {
  axios
    .post(`/zoogle/logout`)
    .then(() => {
      history.push('/')
      Cookies.remove('LOGGED_IN')
      updateLog()
    })
    .catch(err => console.log(err))
}
