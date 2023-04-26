import styled from 'styled-components'
import Page from '../components/Page'
import Subnavbar from '../components/Subnavbar'
import { Container } from '../styles/texts'
import { Hm } from '../styles/texts'
import useSmartVaultParam from '../hooks/useSmartVaultParam'
import useSmartVaulHeatMapData from '../hooks/useSmartVaulHeatMapData'
import HeatMap from '@uiw/react-heat-map'
import { CHAIN_INFO } from '../constants/chainInfo'
import Tooltip from '@uiw/react-tooltip'

const Heatmap = () => {

  const id = useSmartVaultParam()

  const chains = Object.values(CHAIN_INFO).filter(item => {
    return item.isTestnet ? null : item
  })

  return (
    <Page sidebar={false}>
      <Subnavbar active="configuration" address={id} />
      <SmartVaultsSection>
        <Container>
          <Tooltip placement="top" content={`count: ${'hola'}`}>
            <Hm>Heatmap</Hm>
          </Tooltip>
          <Wrapper>
            {chains.map((chain) => {
              return <HM address={id} chain={chain.value} name={chain.name} logo={chain.logoUrl} />
            })}
          </Wrapper>
        </Container>
      </SmartVaultsSection>
    </Page>
  )
}

const HM = ({ address, chain, name, logo }) => {
  const {heat: dataHeatmap} = useSmartVaulHeatMapData(address, chain)
  if (!dataHeatmap?.length) return null
  return (
    <div>
      <Title>
        <img width="20px" src={logo} alt={name} /> {name}
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
            <>
              <Tooltip key={props.key} placement="top" content={`${data.date} ${data.count || 0}`}>
                <rect {...props} />
              </Tooltip>
            </>
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
