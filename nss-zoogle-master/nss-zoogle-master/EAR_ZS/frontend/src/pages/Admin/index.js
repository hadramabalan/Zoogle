import React, { useEffect, useReducer } from 'react'
import styled from 'styled-components'
import { Button, Card, CardBody } from 'shards-react'

import reducer, { initialState } from './reducer'
import { fetchRequests, approveRequest, denyRequest } from './actions'
import { APP_STATE } from '../../constants'

import Loader from '../../components/shared/Loader'

const Container = styled.div`
  margin: 50px auto;
  max-width: 900px;
`

const StyledCard = styled(Card)`
  margin: 10px 0;
`

const StyledCardBody = styled(CardBody)`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 15px 30px;
  cursor: pointer;

  * {
    display: flex;
    align-items: center;
  }
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  * {
    margin: 0 5px;
  }
`

const CardWrapper = styled.div`
  max-width: 900px;
  margin: 15px auto 0 auto;
`

const Admin = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const { requestListState, requests, fetchError } = state

  useEffect(() => {
    fetchRequests(dispatch)
  }, [])

  const onApprove = id => {
    approveRequest(id, dispatch)
  }

  const onDeny = id => {
    denyRequest(id, dispatch)
  }

  return (
    <Container>
      {requestListState === APP_STATE.FETCHING && <Loader />}
      {requestListState === APP_STATE.DONE && (
        <>
          <CardWrapper>
            {requests.length > 0 &&
              requests.map(({ id, name, city, country }) => (
                <StyledCard key={id}>
                  <StyledCardBody>
                    <div>{name}</div>
                    <div>
                      {city}, {country}
                    </div>
                    <ButtonWrapper>
                      <Button onClick={() => onDeny(id)} theme="danger">
                        Deny
                      </Button>
                      <Button onClick={() => onApprove(id)} theme="secondary">
                        Approve
                      </Button>
                    </ButtonWrapper>
                  </StyledCardBody>
                </StyledCard>
              ))}
          </CardWrapper>
        </>
      )}
    </Container>
  )
}

export default Admin
