import React from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import Page from '../components/Page'
import Overview from './Overview'
import ActionHistory from './ActionHistory'
import Config from './Config'
import SmartVaultNotFound from '../sections/SmartVaultNotFound'
import PageNotFound from './PageNotFound'
import useSmartVault from '../hooks/useSmartVault'
import useSmartVaultParam from '../hooks/useSmartVaultParam'
import usePrimitivesFromSmartVault from '../hooks/usePrimitivesFromSmartVault'

const SmartVault = ({ chain }) => {
  const id = useSmartVaultParam()
  const params = useParams()
  const smartVault = useSmartVault(id, 10)
  const smartVaultActions = usePrimitivesFromSmartVault(id, 10)

  const validPages = ['overview', 'action-history', 'config', '']
  if (params.page && !validPages.includes(params.page)) {
    return <PageNotFound id={id} />
  }

  const renderContent = () => {
    switch (params.page) {
      case 'action-history':
        return <ActionHistory />
      case 'config':
        return <Config />
      default:
        return (
          <Overview
            chain={chain}
            smartVault={smartVault}
            smartVaultActions={smartVaultActions}
          />
        )
    }
  }

  return (
    <Page>
      {!smartVault.isLoading && !smartVault?.data?.id ? (
        <SmartVaultNotFound id={id} />
      ) : (
        <SVContainer>
          <Content>{renderContent()}</Content>
        </SVContainer>
      )}
    </Page>
  )
}


const SVContainer = styled.div`
  z-index: 100;
  position: relative;
  display: flex;
  height: 100vh;
  width: 100%;
`


const Content = styled.div`
  width: 100%;
  height: 100%;
  margin-bottom: 600px;
`
export default SmartVault
