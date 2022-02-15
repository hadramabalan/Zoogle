import React, { useState } from 'react'
import styled from 'styled-components'
import { Card, Collapse, CardBody, Button } from 'shards-react'

import AdList from './shared/AdList'

const StyledCollapse = styled(Collapse)`
  max-width: 700px;
  margin: 30px auto 50px auto;
`

const StyledCard = styled(Card)`
  margin: 10px 0;
`

const StyledCardBody = styled(CardBody)`
  display: grid;
  grid-template-columns: 1fr 2fr;
  padding: 15px;
  cursor: pointer;

  * {
    display: flex;
    align-self: center;
  }
`

const AdWrapper = styled.div`
  display: grid;
  margin-bottom: 10px;
  grid-template-columns: repeat(4, 1fr);
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;

  * {
    margin: 0 5px;
  }
`

const ShelterRow = ({ shelter, onDelete, onDeleteAd, onToggle }) => {
  const [collapseOpen, setCollapseOpen] = useState(false)

  const { name, id, ads } = shelter

  return (
    <div key={id}>
      <StyledCard
        onClick={() => {
          setCollapseOpen(!collapseOpen)
        }}
      >
        <StyledCardBody>
          <div>{name}</div>

          <ButtonWrapper>
            <Button
              onClick={e => {
                e.stopPropagation()
                onDelete(id)
              }}
              theme="danger"
            >
              Delete
            </Button>
            <Button
              href={`/shelters/${id}/edit`}
              onClick={e => e.stopPropagation()}
              theme="secondary"
            >
              Edit
            </Button>
            <Button
              href={`/shelters/${id}/requests`}
              onClick={e => e.stopPropagation()}
              theme="secondary"
            >
              Join requests
            </Button>
            <Button
              href={`/shelters/${id}/new-ad`}
              onClick={e => e.stopPropagation()}
              theme="secondary"
            >
              New ad
            </Button>
          </ButtonWrapper>
        </StyledCardBody>
      </StyledCard>
      <StyledCollapse open={collapseOpen}>
        {ads && ads.length > 0 ? (
          ads.map(ad => (
            <AdWrapper key={ad.id}>
              <AdList
                key={ad.id}
                ad={ad}
                owned
                onDelete={onDeleteAd}
                onToggle={onToggle}
              />
            </AdWrapper>
          ))
        ) : (
          <div>This shelter has not posted any ads</div>
        )}
      </StyledCollapse>
    </div>
  )
}

export default ShelterRow
