import React from 'react'
import styled from 'styled-components'
import { Formik } from 'formik'
import {
  Button,
  CardHeader,
  CardTitle,
  Card,
  CardBody,
  Form,
  FormGroup,
} from 'shards-react'

import { shelterSchema } from '../validationSchemas'
import { countries } from '../constants'

import Input from './shared/Input'
import SelectInput from './shared/SelectInput'

const StyledFormGroup = styled(FormGroup)`
  display: grid;
  grid-template-columns: 1fr 3fr;

  * {
    display: flex;
    align-items: center;
  }
`

const ButtonGroup = styled.div`
  margin: 35px 0 0 0;
  display: flex;
  justify-content: center;
`

const ShelterForm = ({ initialValues = {}, onSubmit, isEdit }) => (
  <Card>
    <CardHeader theme="warning">
      <CardTitle>{isEdit ? 'Edit ' : 'New '}shelter</CardTitle>
    </CardHeader>

    <CardBody>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={values => {
          onSubmit(values)
        }}
        validationSchema={shelterSchema}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ errors, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <StyledFormGroup>
              <label htmlFor="#name">Shelter name</label>
              <Input id="#name" name="name" />
            </StyledFormGroup>
            <StyledFormGroup>
              <label htmlFor="#phone">Phone number</label>
              <Input name="phone" id="#phone" />
            </StyledFormGroup>
            <StyledFormGroup>
              <label htmlFor="#mail">E-mail address</label>
              <Input name="mail" id="#mail" />
            </StyledFormGroup>
            <StyledFormGroup>
              <label htmlFor="#street">Street</label>
              <Input name="street" id="#street" />
            </StyledFormGroup>
            <StyledFormGroup>
              <label htmlFor="#city">City</label>
              <Input name="city" id="#city" />
            </StyledFormGroup>
            <StyledFormGroup>
              <label htmlFor="#country">Country</label>
              <SelectInput
                name="country"
                id="#country"
                options={countries.map(c => c.name)}
              />
            </StyledFormGroup>
            <StyledFormGroup>
              <label htmlFor="#zip">ZIP code</label>
              <Input name="zip" id="#zip" />
            </StyledFormGroup>
            <ButtonGroup>
              <Button type="submit" theme="warning">
                {isEdit ? 'Save' : 'Create'}
              </Button>
            </ButtonGroup>
          </Form>
        )}
      </Formik>
    </CardBody>
  </Card>
)

export default ShelterForm
