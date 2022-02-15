import React, { useEffect, useReducer } from 'react'
import styled from 'styled-components'
import axios from 'axios'

import reducer, { initialState } from './reducer'
import { fetchShelter } from './actions'
import { APP_STATE } from '../../constants'

import Loader from '../../components/shared/Loader'
import ShelterForm from '../../components/ShelterForm'

const Container = styled.div`
  margin: 50px auto;
  max-width: 600px;
`

const EditShelter = ({ match, history }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const { shelter, shelterState, fetchError } = state

  const id = match.params.shelterId

  useEffect(() => {
    fetchShelter(id, dispatch)
    //TO DO: forbid access to unauthorized users
  }, [])

  const editShelter = values => {
    axios
      .put(`/zoogle/shelters/${id}`, values)
      .then(() => history.push('/my-shelters'))
      .catch(err => console.log(err))
  }

  return (
    <Container>
      {shelterState === APP_STATE.FETCHING && <Loader />}
      {shelterState === APP_STATE.DONE && (
        <ShelterForm initialValues={shelter} onSubmit={editShelter} isEdit />
      )}
    </Container>
  )
}

export default EditShelter
