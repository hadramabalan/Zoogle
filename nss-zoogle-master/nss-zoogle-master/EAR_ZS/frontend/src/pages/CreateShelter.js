import React from 'react'
import styled from 'styled-components'
import axios from 'axios'

import ShelterForm from '../components/ShelterForm'

const Container = styled.div`
  margin: 50px auto;
  max-width: 600px;
`

const CreateShelter = ({ history, match }) => {
  const submitNewShelter = values => {
    axios
      .post(`/zoogle/shelters`, { active: true, approved: false, ...values })
      .then(() => history.push('/my-shelters'))
      .catch(err => console.log(err))
  }

  return (
    <Container>
      <ShelterForm onSubmit={submitNewShelter} />
    </Container>
  )
}

export default CreateShelter
