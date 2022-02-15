import React from 'react'
import styled from 'styled-components'
import axios from 'axios'

import AdForm from '../components/AdForm'

const Container = styled.div`
  margin: 50px auto;
  max-width: 600px;
`

const CreateAd = ({ history, match }) => {
  const submitNewAd = values => {
    const shelterId = match.params.shelterId
    const { age, sex, species, name, ...rest } = values
    const animal = { name, age, sex, species }
    const newAd = shelterId
      ? { shelter: { id: shelterId }, state: 'ACTIVE', animal, ...rest }
      : { state: 'ACTIVE', animal, ...rest }

    axios
      .post(`/zoogle/ads`, newAd)
      .then(() => history.push('/'))
      .catch(err => console.log(err))
  }

  return (
    <Container>
      <AdForm onSubmit={submitNewAd} />
    </Container>
  )
}

export default CreateAd
