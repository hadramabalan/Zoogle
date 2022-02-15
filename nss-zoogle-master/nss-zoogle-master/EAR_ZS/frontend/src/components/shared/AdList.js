import React, { Fragment } from 'react'
import styled from 'styled-components'
import { Badge, Button } from 'shards-react'
import { format } from 'date-fns'

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

const AdList = ({ ad, owned, onDelete, onToggle }) => {
  const { animal, state, dateCreated, shelterId, id } = ad
  const type = shelterId ? 'found' : 'missing'

  return (
    <Fragment>
      <StyledBadge
        pill
        color={
          (!owned && type === 'missing') || (owned && state === 'CLOSED')
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
            {state !== 'CLOSED' ? 'Close' : 'Open'}
          </Button>
        </ButtonWrapper>
      ) : (
        <ButtonWrapper>
          <Button href={`/ads/${id}`} theme="warning">
            See detail
          </Button>
        </ButtonWrapper>
      )}
    </Fragment>
  )
}

export default AdList
