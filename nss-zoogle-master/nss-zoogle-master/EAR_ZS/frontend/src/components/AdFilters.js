import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Button, FormSelect } from 'shards-react'
import { species } from '../constants'

const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Container = styled(FlexWrapper)`
  padding: 80px 15px 40px 15px;
  top: 80px;
  position: sticky;
  z-index: 1;
  background: #fff;
  border-bottom: 2px solid darkgrey;
`

const SelectWrapper = styled(FlexWrapper)`
  margin-right: 80px;
  width: 100%;
`

const StyledSelect = styled(FormSelect)`
  max-width: 120px;
`

const AdFilters = () => {
  const [animal, setAnimal] = useState(null)
  const [timePeriod, setTimePeriod] = useState(null)
  const [type, setType] = useState(null)

  const getSearchParams = () => {
    const paramObject = {}

    if (animal != null && animal !== 'all') {
      paramObject['animal'] = animal
    }
    if (timePeriod !== null && timePeriod !== 'all') {
      paramObject['timePeriod'] = timePeriod
    }
    if (type !== null && type !== 'all') {
      paramObject['type'] = type
    }

    return paramObject
  }

  return (
    <Container>
      <SelectWrapper>
        <div>Species</div>
        <StyledSelect onChange={e => setAnimal(e.target.value)}>
          {species.map(sp => (
            <option key={sp} value={sp}>
              {sp}
            </option>
          ))}
        </StyledSelect>
      </SelectWrapper>
      <SelectWrapper>
        <div>Ad type</div>
        <StyledSelect onChange={e => setType(e.target.value)}>
          <option value="all">all</option>
          <option value="missing">missing</option>
          <option value="found">found</option>
        </StyledSelect>
      </SelectWrapper>
      <SelectWrapper>
        <div>Time period</div>
        <StyledSelect onChange={e => setTimePeriod(e.target.value)}>
          <option value="all">all time</option>
          <option value="month">last month</option>
          <option value="year">last year</option>
        </StyledSelect>
      </SelectWrapper>
      <Link
        to={{
          pathname: '/',
          search: '?' + new URLSearchParams(getSearchParams()).toString(),
        }}
      >
        <Button theme="secondary">Filter</Button>
      </Link>
    </Container>
  )
}

export default AdFilters
