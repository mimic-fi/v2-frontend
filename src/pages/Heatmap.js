import { useState, useEffect, useMemo, useCallback } from 'react'
import styled from 'styled-components'
import Page from '../components/Page'
import Subnavbar from '../components/Subnavbar'
import { Container } from '../styles/texts'
import { Hm, Hxxs } from '../styles/texts'
import useSmartVaultParam from '../hooks/useSmartVaultParam'
import useSmartVaulHeatMapData from '../hooks/useSmartVaulHeatMapData'
import HeatMap from '@uiw/react-heat-map'
import { CHAIN_INFO } from '../constants/chainInfo'

const Heatmap = () => {
  const [count, setCount] = useState({ chain: 0 })
  const [info, setInfo] = useState(null)

  const updateChain = useCallback((name, number) => {
    setCount((prevCount) => ({ ...prevCount, [name]: number }))
  }, [])

  const calculateTotalTransactions = () => {
    return Object.values(count).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
  }

  const id = useSmartVaultParam()

  const chains = useMemo(
    () =>
      Object.values(CHAIN_INFO).filter((item) => {
        return item.isTestnet ? null : item
      }),
    []
  )

  return (
    <Page sidebar={false}>
      <Subnavbar active="configuration" address={id} />
      <SmartVaultsSection>
        <Container>
          <Hm>Heatmap</Hm>
          <Flex>
            <Hxxs color='#8b8b8b'>Transactions {calculateTotalTransactions()}</Hxxs>
            {info && <Hxxs color='#8b8b8b'>{info}</Hxxs>}
          </Flex>
          <Wrapper>
            {chains.map((chain) => {
              return <HM address={id} chain={chain.value} name={chain.name}
                shortName={chain.shortName}
                logo={chain.logoUrl}
                setInfo={setInfo}
                updateChain={updateChain} />
            })}
          </Wrapper>
        </Container>
      </SmartVaultsSection>
    </Page>
  )
}

const HM = ({ address, chain, name, logo, updateChain, shortName, setInfo }) => {
  const { heat: dataHeatmap } = useSmartVaulHeatMapData(address, chain)
  useEffect(() => {
    updateChain(shortName, dataHeatmap?.length)
    // eslint-disable-next-line
  }, [dataHeatmap?.length])

  if (!dataHeatmap?.length) return null
  return (
    <div>
      <Title>
        <img width="20px" src={logo} alt={name} /> {name} ({dataHeatmap?.length})
      </Title>
      <HeatMap
        width="100%"
        height="240px"
        value={dataHeatmap}
        rectSize={20}
        legendCellSize={0}
        startDate={new Date('2023/01/01')}
        endDate={new Date()}
        style={{ color: '#fff', }}
        panelColors={{
          0: '#dbd3ff',
          2: '#b3a3f7',
          4: '#9380e2',
          10: '#7c6acb',
          20: '#5542a9',
          30: '#000',
        }}

        rectRender={(props, data) => {
          return (
            <rect {...props} onMouseOver={() => setInfo(`${data.date} -> ${data.count || 0}`)} />
          )
        }}
      />
    </div>
  )
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
`

const Flex = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  color: #8b8b8b !important;
  min-height: 100px;
  flex-direction: column;
`

const Title = styled.div`
  display: flex;
  align-items: center;
  img {
    margin-right: 10px;
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

export default Heatmap
