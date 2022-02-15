import React from 'react'
import { connect, getIn } from 'formik'
import { FormInput } from 'shards-react'

const Input = connect(
  ({ formik: { handleChange, errors, values }, name, ...props }) => (
    <FormInput
      onChange={getIn(handleChange)}
      value={getIn(values, name)}
      name={name}
      invalid={errors[name] ? true : false}
      {...props}
    />
  )
)

export default Input
