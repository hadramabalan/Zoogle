import React from 'react'
import { connect, getIn } from 'formik'
import { FormTextarea } from 'shards-react'

const TextAreaInput = connect(
  ({ formik: { handleChange, errors, values }, name, ...props }) => (
    <FormTextarea
      onChange={getIn(handleChange)}
      value={getIn(values, name)}
      name={name}
      invalid={errors[name] ? true : false}
      {...props}
    />
  )
)

export default TextAreaInput
