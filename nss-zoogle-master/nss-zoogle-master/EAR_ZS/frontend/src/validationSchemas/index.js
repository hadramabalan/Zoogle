import { string, number, object, date, ref } from 'yup'
import { countries } from '../constants'

export const adSchema = object().shape({
  dateCreated: date().required('This field is required'),
  description: string().required('This field is required'),
  name: string().required(),
  age: number()
    .min(0)
    .max(25)
    .required('This field is required'),
  sex: string()
    .oneOf(['F', 'M'])
    .required('This field is required'),
  species: string()
    .oneOf(['DOG', 'CAT', 'BIRD', 'RODENT', 'OTHER'])
    .required('This field is required'),
})

export const loginSchema = object().shape({
  username: string().required('This field is required'),
  password: string().required('This field is required'),
})

export const userSchema = object().shape({
  mail: string()
    .email()
    .required('This field is required'),
  phone: string().required('This field is required'),
  firstname: string().required('This field is required'),
  lastname: string().required('This field is required'),
})

export const registrationSchema = object().shape({
  username: string().required('This field is required'),
  mail: string()
    .email()
    .required('This field is required'),
  phone: string().required('This field is required'),
  firstName: string().required('This field is required'),
  lastName: string().required('This field is required'),
  password: string().required('This field is required'),
  passwordConfirm: string()
    .oneOf([ref('password'), null], 'Passwords must match')
    .required('This field is required'),
})

export const shelterSchema = object().shape({
  name: string().required('This field is required'),
  mail: string()
    .email()
    .required('This field is required'),
  phone: string().required('This field is required'),
  street: string().required('This field is required'),
  city: string().required('This field is required'),
  country: string()
    .oneOf(countries.map(c => c.name))
    .required('This field is required'),
  zip: string().required('This field is required'),
})
