import React, { useState } from 'react'
import styled from 'styled-components'
import Page from '../components/Page'
import Subnavbar from '../components/Subnavbar'
import { Container, BodyL } from '../styles/texts'
import Split from '../components/Split'
import useSmartVaultParam from '../hooks/useSmartVaultParam'
import GeneralConfig from '../sections/GeneralConfig'
import sv from '../assets/configMenu/sv.svg'

const Config = () => {
  const [active, setActive] = useState(0)
  const handleClick = e => {
    const index = parseInt(e.target.id, 0)
    if (index !== active) {
      setActive(index)
    }
  }
  const id = useSmartVaultParam()

  return (
    <Page sidebar={false}>
      <Subnavbar active="configuration" address={id} />
      <ConfigSection>
        <Container>
          <Split
            primary={<GeneralConfig />}
            secondary={
              <Tabs>
                <Title>SMART VAULT</Title>
                <Tab onClick={handleClick} active={active === 0} id={0}>
                  <img src={sv} alt="smart vault" />
                  General
                </Tab>
                <br />
                <Title>ACTIONS</Title>
                <Tab onClick={handleClick} active={active === 1} id={1}>
                  <img
                    src={sv}
                    alt="smart vault"
                  />
                  General
                </Tab>
                <Tab onClick={handleClick} active={active === 1} id={1}>
                  <img src={sv} alt="smart vault" />
                  General
                </Tab>
                <Tab onClick={handleClick} active={active === 1} id={1}>
                  <img src={sv} alt="smart vault" />
                  General
                </Tab>
                <Tab onClick={handleClick} active={active === 1} id={1}>
                  <img src={sv} alt="smart vault" />
                  General
                </Tab>
                <Tab onClick={handleClick} active={active === 1} id={1}>
                  <img src={sv} alt="smart vault" />
                  General
                </Tab>
              </Tabs>
            }
          />
        </Container>
      </ConfigSection>
    </Page>
  )
}

const Title = styled.div`
  font-family: 'GTWalsheimPro';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 32px;
  color: #a5a1b7;
`

const Tabs = styled.div``

const Tab = styled(BodyL)`
  border: none;
  outline: none;
  cursor: pointer;
  padding: 10px 15px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  margin: 13px 0;
  background-color: ${props => (props.active ? '#5542A9' : 'transparent')};
  color: ${props => (props.active ? '#FCFCFD' : ' #a5a1b7')};
  transition: all 0.2s ease-in-out;
  img {
    padding-right: 7px;
    filter: hue-rotate(270deg) brightness(90%);
  }

  :hover {
    background-color: ${props => (props.active ? '#5542A9' : '#5542a970')};
    color: #fcfcfd;
  }
`

const ConfigSection = styled.section`
  height: auto;
  min-height: 1700px;
  padding-top: 80px;
  color: white;
  td {
    max-width: 446px;
  }
  @media only screen and (max-width: 700px) {
    min-height: 650px;
    padding: 60px 0 0 0;
  }
`

export default Config
