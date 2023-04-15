import React, { useState } from 'react'
import styled from 'styled-components'
import Page from '../components/Page'
import Subnavbar from '../components/Subnavbar'
import { Container, BodyL } from '../styles/texts'
import useSmartVaultWithConfig from '../hooks/useSmartVaultWithConfig'
import { Hm } from '../styles/texts'
import { Skeleton } from '../styles/general'
import Table from '../components/Table/Table'
import TableRow from '../components/Table/TableRow'
import TableHeader from '../components/Table/TableHeader'
import TableCell from '../components/Table/TableCell'
import { SMART_VAULT_FUNCTIONS_HASHED } from '../utils/smartVault-utils'
import useActionMetadata from '../hooks/useActionMetadata'
import useSmartVaultMetadata from '../hooks/useSmartVaultMetadata'
import useSmartVaultParam from '../hooks/useSmartVaultParam'
import Address from '../components/Address'
import { USDC_DECIMALS } from '../constants/knownTokenDecimals'
import { formatTokenAmount } from '../utils/math-utils'
import useSmartVaulHeatMapData from '../hooks/useSmartVaulHeatMapData'

const Heatmap = () => {
  const [active, setActive] = useState(0)
  const handleClick = e => {
    const index = parseInt(e.target.id, 0)
    if (index !== active) {
      setActive(index)
    }
  }
  const id = useSmartVaultParam()
  const { data, isLoading } = useSmartVaulHeatMapData(id)
  const { data: metadata } = useSmartVaultMetadata(id)

  let index = 0
  // let pfIndex = 0
  let granteesList = []



  return (
    <Page sidebar={false}>
      <Subnavbar active="configuration" address={id} />
      <SmartVaultsSection>
        <Container>
          <Hm>Heatmap</Hm>
          

        
        </Container>
      </SmartVaultsSection>
    </Page>
  )
}


const Tabs = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 30px;
`

const Tab = styled(BodyL)`
  border: none;
  outline: none;
  cursor: pointer;
  padding: 12px 15px;
  border-radius: 50px;
  background-color: ${props => (props.active ? '#353945' : 'transparent')};
  color: ${props => (props.active ? '#FCFCFD' : '#777E90')};
  transition: all 0.1s ease-in-out;

  :hover {
    background-color: #353945;
    color: #fcfcfd;
  }
`

const Content = styled.div`
  ${props => (props.active ? '' : 'display:none')};
  p {
    margin-top: 0;
  }
`

const SmartVaultsSection = styled.section`
  height: auto;
  min-height: 1700px;
  padding-top: 80px;
  color: white;
  @media only screen and (max-width: 700px) {
    min-height: 650px;
    padding: 60px 0 0 0;
  }
`

const Row = styled(TableRow)``

const Number = styled.div`
  color: ${props => props.theme.mainDefault};
`

const Text = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 400px;
`

const TextSec = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  /* max-width: 400px; */
  color: gray;
`

const ActionDetail = styled.div`
  font-weight: 400;
  margin-top: 15px;
  p {
    margin-bottom: 5px;
  }
`

export default Config
