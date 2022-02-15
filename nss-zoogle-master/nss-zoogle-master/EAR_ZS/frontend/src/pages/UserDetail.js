import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { Button, Card, CardBody, CardHeader, CardTitle } from 'shards-react'

import { APP_STATE } from '../constants'
import logout from '../lib/logout'
import withUser from '../hoc/withUser'

import Loader from '../components/shared/Loader'

const Container = styled.div`
  margin: 50px auto;
  max-width: 600px;
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;

  * {
    margin: 5px;
  }
`

const StyledCardBody = styled(CardBody)`
  padding: 15px 50px 25px 25px;
`

const UserDetail = ({ history, user, userState, updateLog }) => {
  const deleteUser = id => {
    return axios
      .delete(`/zoogle/users/${id}`)
      .then(() => logout(history, updateLog))
      .catch(err => console.log(err))
  }

  return (
    <Container>
      {userState === APP_STATE.FETCHING && <Loader />}
      {userState === APP_STATE.DONE && (
        <Card>
          <CardHeader>
            <CardTitle>Profile information</CardTitle>
          </CardHeader>
          <StyledCardBody>
            <div>
              <div>
                <strong>First name:</strong> {user.firstname}
              </div>
              <div>
                <strong>Last name:</strong> {user.lastname}
              </div>
              <strong>Phone:</strong> {user.phone}
            </div>
            <div>
              <strong>Email:</strong> {user.mail}
            </div>
            <ButtonWrapper>
              <Button theme="danger" onClick={() => deleteUser(user.id)}>
                Delete
              </Button>
              <Button theme="warning" href="/user/edit">
                Edit
              </Button>
            </ButtonWrapper>
          </StyledCardBody>
        </Card>
      )}
    </Container>
  )
}

export default withUser(UserDetail)
