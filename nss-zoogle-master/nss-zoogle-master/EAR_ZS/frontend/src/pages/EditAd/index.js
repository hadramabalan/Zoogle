import React, { useEffect, useReducer } from 'react'
import styled from 'styled-components'
import axios from 'axios'

import reducer, { initialState, getAd } from './reducer'
import { fetchAd } from './actions'
import { APP_STATE } from '../../constants'

import Loader from '../../components/shared/Loader'
import AdForm from '../../components/AdForm'

const Container = styled.div`
  margin: 50px auto;
  max-width: 600px;
`

const Ad = ({ match, history }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const { adState, fetchError } = state
  const ad = getAd(state)

  const id = match.params.id

  useEffect(() => {
    fetchAd(id, dispatch)
  }, [])

  const editAd = values => {
    const { type, age, sex, species, name, ...filteredValues } = values
    const animal = { name, age, sex, species }
    const newAd = { animal, ...filteredValues }

    axios
      .put(`/zoogle/ads/${id}`, newAd)
      .then(() => history.push('/my-ads'))
      .catch(err => console.log(err))
  }

  return (
    <Container>
      {adState === APP_STATE.FETCHING && <Loader />}
      {adState === APP_STATE.DONE && (
        <AdForm initialValues={ad} onSubmit={editAd} isEdit />
      )}
    </Container>
  )
}

export default Ad
