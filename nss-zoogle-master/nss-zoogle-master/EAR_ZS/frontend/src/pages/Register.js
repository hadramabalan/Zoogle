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

import Input from '../components/shared/Input'
import { registrationSchema } from '../validationSchemas'

const Container = styled.div`
  margin: 50px auto;
  max-width: 400px;
`

const ButtonGroup = styled.div`
  margin: 35px 0 0 0;
  display: flex;
  justify-content: center;
`

const Register = ({ history }) => {
  const registerUser = values => {
    const { passwordConfim, ...filteredValues } = values
    const params = new URLSearchParams(filteredValues).toString()

    return axios
      .post(`/zoogle/register?${params}`, {})
      .then(({ data }) => history.push('/login'))
      .catch(err => console.log(err))
  }

  return (
    <Container>
      <Card>
        <CardHeader>
          <CardTitle>Register</CardTitle>
        </CardHeader>
        <CardBody>
          <Formik
            enableReinitialize
            onSubmit={values => {
              registerUser(values)
            }}
            validationSchema={registrationSchema}
            validateOnChange={false}
            validateOnBlur={false}
          >
            {({ errors, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <FormGroup>
                    <label htmlFor="#username">Username</label>
                    <Input id="#username" name="username" />
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="#password">Password</label>
                    <Input type="password" name="password" id="#password" />
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="#passwordConfirm">Confirm password</label>
                    <Input
                      type="password"
                      name="passwordConfirm"
                      id="#passwordConfirm"
                    />
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="#mail">E-mail Address</label>
                    <Input name="mail" id="#mail" />
                  </FormGroup>
                  <label htmlFor="#firstName">First name</label>
                  <Input id="#firstName" name="firstName" />
                </FormGroup>
                <FormGroup>
                  <label htmlFor="#lastName">Last name</label>
                  <Input id="#lastName" name="lastName" />
                </FormGroup>
                <FormGroup>
                  <label htmlFor="#phone">Phone</label>
                  <Input name="phone" id="#phone" />
                </FormGroup>

                <ButtonGroup>
                  <Button type="submit" theme="warning">
                    Register
                  </Button>
                </ButtonGroup>
              </Form>
            )}
          </Formik>
        </CardBody>
      </Card>
    </Container>
  )
}

export default Register
