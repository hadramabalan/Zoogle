import React, { useEffect, useReducer } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { Card, Button, CardBody, CardHeader, CardTitle } from 'shards-react'

import reducer, { initialState } from './reducer'
import { fetchShelter } from './actions'
import { APP_STATE } from '../../constants'

import Loader from '../../components/shared/Loader'

const Container = styled.div`
  margin: 50px auto;
  max-width: 900px;
`

const StyledCardBody = styled(CardBody)`
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 15px 50px 25px 25px;
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: baseline;
`

const ShelterDetail = ({ match }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const { shelterState, shelter, fetchError } = state

  const shelterId = match.params.shelterId

  useEffect(() => {
    fetchShelter(match.params.shelterId, dispatch)
  }, [])

  const requestToJoin = () => {
    axios
      .post(`/zoogle/shelters/${shelterId}/employees`)
      .catch(err => console.log(err))
  }

  return (
    <Container>
      {shelterState === APP_STATE.FETCHING && <Loader />}
      {shelterState === APP_STATE.DONE && (
        <Card>
          <CardHeader>
            <CardTitle>{shelter.name}</CardTitle>
          </CardHeader>
          <StyledCardBody>
            <div>
              <h3>Contact information</h3>
              <div>
                <strong>Phone:</strong> {shelter.phone}
              </div>
              <div>
                <strong>E-mail:</strong> {shelter.mail}
              </div>
              <br />

              <h3>Address</h3>
              <div>
                <strong>Street:</strong> {shelter.street}
              </div>
              <div>
                <strong>City:</strong> {shelter.city}
              </div>
              <div>
                <strong>ZIP code:</strong> {shelter.zip}
              </div>
              <div>
                <strong>Country:</strong> {shelter.country}
              </div>
            </div>
            <ButtonWrapper>
              <Button theme="secondary" onClick={requestToJoin}>
                Join
              </Button>
            </ButtonWrapper>
          </StyledCardBody>
        </Card>
      )}
    </Container>
  )
}

export default ShelterDetail
