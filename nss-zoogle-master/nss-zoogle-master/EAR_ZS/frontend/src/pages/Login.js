import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import Cookies from 'js-cookie'
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

import { loginSchema } from '../validationSchemas'

import Input from '../components/shared/Input'

const Container = styled.div`
  margin: 50px auto;
  max-width: 400px;
`

const ButtonGroup = styled.div`
  margin: 35px 0 0 0;
  display: flex;
  justify-content: center;
`

const RegisterLink = styled.h6`
  margin-top: 25px;
  display: flex;
  justify-content: center;
`

const Login = ({ history, updateLog }) => {
  const loginUser = values => {
    const params = new URLSearchParams(values).toString()

    return axios
      .post(`/zoogle/loginProcess?${params}`)
      .then(res => {
        Cookies.set('LOGGED_IN', true, { path: '' })
        updateLog()
        history.replace('/')
      })
      .catch(err => console.log(err))
  }
  return (
    <Container>
      <Card>
        <CardHeader>
          <CardTitle>Log in</CardTitle>
        </CardHeader>
        <CardBody>
          <Formik
            enableReinitialize
            onSubmit={values => {
              loginUser(values)
            }}
            validationSchema={loginSchema}
            validateOnChange={false}
            validateOnBlur={false}
          >
            {({ errors, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <label htmlFor="#username">Username</label>
                  <Input id="#username" name="username" />
                </FormGroup>
                <FormGroup>
                  <label htmlFor="#password">Password</label>
                  <Input type="password" name="password" id="#password" />
                </FormGroup>

                <ButtonGroup>
                  <Button type="submit" theme="warning">
                    Log in
                  </Button>
                </ButtonGroup>
              </Form>
            )}
          </Formik>
          <RegisterLink>
            No account yet? &nbsp; <a href="/register">Register now!</a>
          </RegisterLink>
        </CardBody>
      </Card>
    </Container>
  )
}

export default Login
