import React, { useEffect, useReducer } from 'react'

import reducer, { initialState } from './reducer'
import { fetchUser } from './actions'

export default WrappedComponent => {
  const WithUser = props => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const { userState, user, fetchError } = state

    useEffect(() => {
      fetchUser(dispatch)
    }, [])

    return <WrappedComponent user={user} userState={userState} {...props} />
  }

  return WithUser
}
