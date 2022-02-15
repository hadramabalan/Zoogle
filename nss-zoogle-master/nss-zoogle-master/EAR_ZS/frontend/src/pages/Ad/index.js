import React, { useEffect, useReducer } from 'react'
import styled from 'styled-components'
import { Card, CardBody, CardHeader, CardTitle } from 'shards-react'

import reducer, { initialState, getAd } from './reducer'
import { fetchAdDetail } from './actions'
import { APP_STATE } from '../../constants'

import Loader from '../../components/shared/Loader'
import CommentSection from '../../components/CommentSection'

const Container = styled.div`
  margin: 50px auto;
  max-width: 900px;
`

const CommentWrapper = styled.div`
  max-width: 700px;
  margin: 50px 0 30px 0;
`

const StyledCardBody = styled(CardBody)`
  display: grid;
  grid-template-columns: 2fr 3fr;
  padding: 15px 50px 25px 25px;
`

const Ad = ({ match, loggedIn }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const { adState, fetchError } = state
  const ad = getAd(state)

  useEffect(() => {
    fetchAdDetail(match.params.id, dispatch)
  }, [])

  return (
    <Container>
      {adState === APP_STATE.FETCHING && <Loader />}
      {adState === APP_STATE.DONE && (
        <Card>
          <CardHeader>
            <CardTitle>{`${ad.type} ${ad.animal.species}`}</CardTitle>
          </CardHeader>
          <StyledCardBody>
            <div>
              <div>
                <strong>Name:</strong> {ad.animal.name}
              </div>
              <div>
                <strong>Age:</strong> {ad.animal.age}
              </div>
              <div>
                <strong>Gender:</strong>{' '}
                {ad.animal.gender === 'M' ? 'Male' : 'Female'}
              </div>
              <br />
              <br />
              <h4>Contact information</h4>
              <br />
              <div>
                <strong>Phone:</strong>{' '}
                {ad.owner ? ad.owner.phone : ad.shelter.phone}
              </div>
              <div>
                <strong>Email:</strong>{' '}
                {ad.owner ? ad.owner.mail : ad.shelter.mail}
              </div>
            </div>
            <div>{ad.description}</div>
            {loggedIn && (
              <CommentWrapper>
                <h4>Comments</h4>
                <CommentSection match={match} />
              </CommentWrapper>
            )}
          </StyledCardBody>
        </Card>
      )}
    </Container>
  )
}

export default Ad
