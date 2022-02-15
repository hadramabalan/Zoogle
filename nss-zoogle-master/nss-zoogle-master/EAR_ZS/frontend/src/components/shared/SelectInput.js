import React from 'react'
import { connect, getIn } from 'formik'
import { FormSelect } from 'shards-react'

const SelectInput = connect(
  ({ formik: { handleChange, values, errors }, options, name, ...props }) => (
    <FormSelect
      onChange={getIn(handleChange)}
      value={getIn(values, name)}
      name={name}
      invalid={errors[name] ? true : false}
      {...props}
    >
      <option value="">Select</option>
      {options.map(o => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </FormSelect>
  )
)

export default SelectInput
