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

import { adSchema } from '../validationSchemas'
import { species } from '../constants'

import Input from './shared/Input'
import TextAreaInput from './shared/TextAreaInput'
import SelectInput from './shared/SelectInput'
import { format } from 'date-fns'

const StyledFormGroup = styled(FormGroup)`
  display: grid;
  grid-template-columns: 1fr 5fr;
`

const ButtonGroup = styled.div`
  margin: 35px 0 0 0;
  display: flex;
  justify-content: center;
`

const AdForm = ({ initialValues = {}, onSubmit, isEdit }) => (
  <Card>
    <CardHeader theme="warning">
      <CardTitle>{isEdit ? 'Edit' : 'New'} Ad</CardTitle>
    </CardHeader>

    <CardBody>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={values => {
          onSubmit(values)
        }}
        validationSchema={adSchema}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ errors, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <StyledFormGroup>
              <label htmlFor="#name">Pet name</label>
              <Input id="#name" name="name" />
            </StyledFormGroup>
            <StyledFormGroup>
              <label htmlFor="#age">Pet age</label>
              <Input type="number" name="age" id="#age" />
            </StyledFormGroup>
            <StyledFormGroup>
              <label htmlFor="#sex">Pet gender</label>
              <SelectInput options={['F', 'M']} name="sex" id="#sex" />
            </StyledFormGroup>
            <StyledFormGroup>
              <label htmlFor="#species">Species</label>
              <SelectInput
                options={species.slice(1)}
                name="species"
                id="#species"
              />
            </StyledFormGroup>
            <StyledFormGroup>
              <label htmlFor="#dateCreated">Date</label>
              <Input
                type="date"
                name="dateCreated"
                id="#dateCreated"
                value={
                  initialValues.dateCreated &&
                  format(new Date(initialValues.dateCreated), 'YYYY-MM-DD')
                }
              />
            </StyledFormGroup>
            <StyledFormGroup>
              <label htmlFor="#description">Description</label>
              <TextAreaInput name="description" id="#description" />
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

export default AdForm
