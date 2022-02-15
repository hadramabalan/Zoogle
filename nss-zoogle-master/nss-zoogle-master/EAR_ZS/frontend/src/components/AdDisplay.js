import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Card, CardBody, Badge, Button } from 'shards-react'
import {
  differenceInMonths,
  format,
  differenceInCalendarISOYears,
} from 'date-fns'

const CardWrapper = styled.div`
  max-width: 900px;
  margin: 15px auto 0 auto;
`

const StyledCard = styled(Card)`
  margin: 10px 0;
`

const StyledCardBody = styled(CardBody)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 15px;

  * {
    display: flex;
    align-self: center;
  }
`

const StyledBadge = styled(Badge)`
  background: ${({ color }) => color};
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 90px;
  padding: 5px;
  max-height: 30px;
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;

  * {
    margin: 0 5px;
  }
`

const AdDisplay = ({ ads, location, owned, onDelete, onToggle }) => {
  const [stateAds, setAds] = useState(ads)
  let params = new URLSearchParams(location.search)

  useEffect(() => {
    const animal = params.get('animal')
    const timePeriod = params.get('timePeriod')
    const type = params.get('type')

    const filteredAds = ads.filter(ad => {
      const adType = ad.shelter ? 'found' : 'missing'

      return (
        (ad.animal.species === animal || animal === null) &&
        (adType === type || type === null) &&
        isInTimePeriod(ad, timePeriod)
      )
    })

    setAds(filteredAds)
  }, [params])

  const isInTimePeriod = (ad, timePeriod) => {
    const now = Date.now()
    const dateCreated = new Date(ad.dateCreated)

    switch (timePeriod) {
      case 'month':
        if (differenceInMonths(now, dateCreated) <= 1) {
          return true
        } else {
          return false
        }
      case 'year':
        if (differenceInCalendarISOYears(now, dateCreated) <= 1) {
          return true
        } else {
          return false
        }
      default:
        return true
    }
  }

  return (
    <CardWrapper>
      <Card>
        <StyledCardBody>
          <div>{owned ? 'State' : 'Type'}</div>
          <div>Species</div>
          <div>Date created</div>
        </StyledCardBody>
      </Card>
      {stateAds.map(({ animal, dateCreated, id, state, shelter }) => {
        const type = shelter ? 'found' : 'missing'

        return (
          <StyledCard key={id}>
            <StyledCardBody>
              <StyledBadge
                pill
                color={
                  (!owned && type === 'missing') ||
                  (owned && state === 'CLOSED')
                    ? '#177e83'
                    : '#8c4469'
                }
              >
                {owned ? state : type}
              </StyledBadge>

              <div>{animal.species}</div>
              <div>{format(new Date(dateCreated), 'D.M YYYY')}</div>

              {owned ? (
                <ButtonWrapper>
                  <Button onClick={() => onDelete(id)} theme="danger">
                    Delete
                  </Button>
                  <Button href={`/ads/${id}/edit`} theme="warning">
                    Edit
                  </Button>
                  <Button onClick={() => onToggle(id, state)} theme="secondary">
                    {state === 'CLOSED' ? 'Open' : 'Close'}
                  </Button>
                </ButtonWrapper>
              ) : (
                <ButtonWrapper>
                  <Button href={`/ads/${id}`} theme="warning">
                    See detail
                  </Button>
                </ButtonWrapper>
              )}
            </StyledCardBody>
          </StyledCard>
        )
      })}
    </CardWrapper>
  )
}

export default AdDisplay
