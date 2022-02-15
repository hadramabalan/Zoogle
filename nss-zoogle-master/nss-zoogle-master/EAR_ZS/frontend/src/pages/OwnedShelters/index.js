import React, { useEffect, useReducer } from 'react'
import styled from 'styled-components'
import { Button } from 'shards-react'

import reducer, { initialState } from './reducer'
import {
  fetchShelters,
  deleteShelter,
  deleteAd,
  toggleAdActive,
} from './actions'
import { APP_STATE } from '../../constants'

import Loader from '../../components/shared/Loader'
import ShelterRow from '../../components/ShelterRow'

const Container = styled.div`
  margin: 50px auto;
  max-width: 900px;
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 0 20px 40px 0;
`

const CardWrapper = styled.div`
  max-width: 900px;
  margin: 15px auto 0 auto;
`

const OwnedShelters = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const { shelterListState, shelters, fetchError } = state

  useEffect(() => {
    fetchShelters(dispatch)
  }, [])

  const onDelete = id => {
    deleteShelter(id, dispatch)
  }

  const onDeleteAd = id => {
    deleteAd(id, dispatch)
  }

  const onToggle = (id, isActive) => {
    toggleAdActive(id, isActive, dispatch)
  }

  return (
    <Container>
      <ButtonWrapper>
        <Button href="/new-shelter" pill theme="warning">
          Create new
        </Button>
      </ButtonWrapper>
      {shelterListState === APP_STATE.FETCHING && <Loader />}
      {shelterListState === APP_STATE.DONE && (
        <CardWrapper>
          {shelters.map(shelter => (
            <ShelterRow
              key={shelter.id}
              shelter={shelter}
              onDelete={onDelete}
              onDeleteAd={onDeleteAd}
              onToggle={onToggle}
            />
          ))}
        </CardWrapper>
      )}
    </Container>
  )
}

export default OwnedShelters
