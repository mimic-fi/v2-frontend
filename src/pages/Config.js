import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import styled from 'styled-components'
import Page from '../components/Page'
import Subnavbar from '../components/Subnavbar'
import { Container, BodyM } from '../styles/texts'
import Split from '../components/Split'
import GeneralConfig from '../sections/GeneralConfig'
import ActionConfig from '../sections/ActionConfig'
import useSmartVaultParam from '../hooks/useSmartVaultParam'
import useSmartVault from '../hooks/useSmartVault'
import useActionMetadata from '../hooks/useActionMetadata'
import sv from '../assets/configMenu/sv.svg'

const Config = () => {
  const params = useParams()
  const [active, setActive] = useState(params.action || 0)
  const id = useSmartVaultParam()
  const smartVault = useSmartVault(id, 10)

  const handleClick = e => {
    const index = e.target.id
    if (index !== active) {
      setActive(index)
    }
  }

  return (
    <Page sidebar={false}>
      <Subnavbar active="configuration" address={id} />
      <ConfigSection>
        <Container>
          <Split
            primary={
              params.action !== undefined ? (
                <ActionConfig action={params.action} />
              ) : (
                <GeneralConfig />
              )
            }
            secondary={
              <Tabs>
                <Title>SMART VAULT</Title>
                <Link to={'/smart-vaults/' + params.id + '/config/'}>
                  <Tab onClick={handleClick} active={active === 0} id={0}>
                    <img src={sv} alt="smart vault" />
                    General
                  </Tab>
                </Link>
                <br />
                <Title>ACTIONS</Title>
                {smartVault?.data?.actions?.map((action, i) => {
                  return (
                    <TabAction
                      action={action}
                      index={action.id}
                      key={action.id}
                      handleClick={handleClick}
                      active={active}
                    />
                  )
                })}
              </Tabs>
            }
          />
        </Container>
      </ConfigSection>
    </Page>
  )
}

const TabAction = ({ action, index, handleClick, active }) => {
  const metadata = useActionMetadata(action.id)
  const params = useParams()
  return (
    <Link to={'/smart-vaults/' + params.id + '/config/' + action.id}>
      <Tab
        onClick={handleClick}
        active={active === index}
        key={index}
        id={index}
      >
        <img src={metadata.data?.icon} alt="smart vault" />
        {metadata.data?.title}
      </Tab>
    </Link>
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

const Tab = styled(BodyM)`
  border: none;
  outline: none;
  cursor: pointer;
  padding: 10px 15px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  margin: 13px 0;
  background-color: ${props => (props.active ? '#5542A9' : 'transparent')};
  color: #fcfcfd;
  transition: all 0.2s ease-in-out;
  img {
    padding-right: 7px;
    height: 24px;
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
