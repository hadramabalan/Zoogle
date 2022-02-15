import React, { useEffect, useReducer } from 'react'
import styled from 'styled-components'

import reducer, { initialState } from './reducer'
import { fetchShelters } from './actions'
import { APP_STATE } from '../../constants'

import ShelterDisplay from '../../components/ShelterDisplay'
import Loader from '../../components/shared/Loader'

const Container = styled.div`
  margin: 50px auto;
`

const Shelters = ({ location }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const { shelterListState, shelters, fetchError } = state

  useEffect(() => {
    fetchShelters(dispatch)
  }, [])

  return (
    <Container>
      {shelterListState === APP_STATE.FETCHING && <Loader />}
      {shelterListState === APP_STATE.DONE && (
        <ShelterDisplay shelters={shelters} location={location} />
      )}
    </Container>
  )
}

export default Shelters
