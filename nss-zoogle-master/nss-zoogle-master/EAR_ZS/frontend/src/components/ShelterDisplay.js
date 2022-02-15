import React from 'react'
import styled from 'styled-components'

import { Card, CardBody, Button } from 'shards-react'

const CardWrapper = styled.div`
  max-width: 900px;
  margin: 15px auto 0 auto;
`

const StyledCard = styled(Card)`
  margin: 10px 0;
`

const StyledCardBody = styled(CardBody)`
  display: grid;
  grid-template-columns: 3fr 1fr 2fr;
  padding: 15px;

  * {
    display: flex;
    align-self: center;
  }
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;

  * {
    margin: 0 5px;
  }
`

const ShelterDisplay = ({ shelters }) => {
  return (
    <CardWrapper>
      <Card>
        <StyledCardBody>
          <div>Name</div>
          <div>Location</div>
        </StyledCardBody>
      </Card>
      {shelters.map(({ name, city, country, id }) => (
        <StyledCard key={id}>
          <StyledCardBody>
            <div>{name}</div>
            <div>
              {city}, {country}
            </div>

            <ButtonWrapper>
              <Button href={`/shelters/${id}`} theme="warning">
                See detail
              </Button>
            </ButtonWrapper>
          </StyledCardBody>
        </StyledCard>
      ))}
    </CardWrapper>
  )
}

export default ShelterDisplay
