import React from 'react'
import styled from 'styled-components'
import { Link, useParams } from 'react-router-dom'
import { Container, BodyM } from '../styles/texts'

const Subnavbar = ({ active }) => {
  const params = useParams()
  return (
    <SubnavbarSection>
      <SubnavbarContainer>
        <Link to={`/smart-vaults/${params.id}/`}>
          <BodyM className={active === 'overview' ? 'active' : ''}>
            Overview
          </BodyM>
        </Link>
        <Link to={`/smart-vaults/${params.id}/action-history/`}>
          <BodyM className={active === 'history' ? 'active' : ''}>
            History
          </BodyM>
        </Link>
        <Link to={`/smart-vaults/${params.id}/config/`}>
          <BodyM className={active === 'configuration' ? 'active' : ''}>
            Configuration
          </BodyM>
        </Link>
      </SubnavbarContainer>
    </SubnavbarSection>
  )
}

const SubnavbarSection = styled.section`
  z-index: 100;
  width: 100%;
  margin: auto;
  .active {
    color: #a996ff;
  }
`

const SubnavbarContainer = styled(Container)`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 40px;
  padding 0;
`

export default Subnavbar
