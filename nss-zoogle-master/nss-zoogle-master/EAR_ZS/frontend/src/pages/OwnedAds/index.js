import React, { useEffect, useReducer } from 'react'
import styled from 'styled-components'

import reducer, { initialState } from './reducer'
import { fetchOwnedAds, deleteAd, toggleAdActive } from './actions'
import { APP_STATE } from '../../constants'

import AdDisplay from '../../components/AdDisplay'
import Loader from '../../components/shared/Loader'

const Container = styled.div`
  margin: 50px auto;
`

const MyAds = ({ location }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const { adListState, ads, fetchError } = state

  useEffect(() => {
    fetchOwnedAds(dispatch)
  }, [])

  const onDelete = id => {
    deleteAd(id, dispatch)
  }

  const onToggle = (id, isActive) => {
    toggleAdActive(id, isActive, dispatch)
  }

  return (
    <Container>
      {adListState === APP_STATE.FETCHING && <Loader />}
      {adListState === APP_STATE.DONE && (
        <AdDisplay
          ads={ads}
          location={location}
          onDelete={onDelete}
          onToggle={onToggle}
          owned
        />
      )}
    </Container>
  )
}

export default MyAds
