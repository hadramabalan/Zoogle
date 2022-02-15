import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { Formik } from 'formik'
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
} from 'shards-react'

import { APP_STATE } from '../constants'
import { userSchema } from '../validationSchemas'

import Input from '../components/shared/Input'
import Loader from '../components/shared/Loader'

const Container = styled.div`
  margin: 50px auto;
  max-width: 400px;
`

const ButtonGroup = styled.div`
  margin: 35px 0 0 0;
  display: flex;
  justify-content: center;
`

const StyledFormGroup = styled(FormGroup)`
  display: grid;
  grid-template-columns: 1fr 2fr;
  margin: 20px 0;

  label {
    font-weight: 600;
  }
`

const EditUser = ({ history, user, userState }) => {
  const editUser = (id, values) => {
    return axios
      .put(`/zoogle/users/${id}`, values)
      .then(() => history.push('/user'))
      .catch(err => console.log(err))
  }

  return (
    <Container>
      {userState === APP_STATE.FETCHING && <Loader />}
      {userState === APP_STATE.DONE && (
        <Card>
          <CardHeader>
            <CardTitle>Edit User</CardTitle>
          </CardHeader>
          <CardBody>
            <Formik
              enableReinitialize
              initialValues={user}
              onSubmit={values => {
                editUser(user.id, values)
              }}
              validationSchema={userSchema}
              validateOnChange={false}
              validateOnBlur={false}
            >
              {({ errors, handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                  <StyledFormGroup>
                    <label htmlFor="#mail">E-mail</label>
                    <Input name="mail" id="#mail" />
                  </StyledFormGroup>
                  <StyledFormGroup>
                    <label htmlFor="#firstname">First name</label>
                    <Input id="#firstname" name="firstname" />
                  </StyledFormGroup>
                  <StyledFormGroup>
                    <label htmlFor="#lastName">Last name</label>
                    <Input id="#lastname" name="lastname" />
                  </StyledFormGroup>
                  <StyledFormGroup>
                    <label htmlFor="#phone">Phone</label>
                    <Input name="phone" id="#phone" />
                  </StyledFormGroup>

                  <ButtonGroup>
                    <Button type="submit" theme="warning">
                      Save
                    </Button>
                  </ButtonGroup>
                </Form>
              )}
            </Formik>
          </CardBody>
        </Card>
      )}
    </Container>
  )
}

export default EditUser
