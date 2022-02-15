import React, { useEffect, useReducer } from 'react'
import styled from 'styled-components'

import reducer, { initialState } from './reducer'
import { fetchAds } from './actions'
import { APP_STATE } from '../../constants'

import AdDisplay from '../../components/AdDisplay'
import AdFilters from '../../components/AdFilters'
import Loader from '../../components/shared/Loader'

const Container = styled.div`
  margin: 0 auto;
  max-width: 1000px;
  position: relative;
`

const Ads = ({ location }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const { adListState, ads, fetchError } = state

  useEffect(() => {
    fetchAds(dispatch)
  }, [])

  return (
    <Container>
      {adListState === APP_STATE.FETCHING && <Loader />}
      {adListState === APP_STATE.DONE && (
        <>
          <AdFilters />
          <AdDisplay ads={ads} location={location} />
        </>
      )}
    </Container>
  )
}

export default Ads
