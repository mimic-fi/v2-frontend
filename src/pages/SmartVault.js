import React from 'react'
import { useParams } from 'react-router-dom'
import Page from '../components/Page'
import Overview from './Overview'
import ActionHistory from './ActionHistory'
import Config from './Config'
import Subnavbar from '../components/Subnavbar'
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
        <>
          <Subnavbar
            active={params.page ? params.page : 'overview'}
            address={params.id ? params.id : id}
          />
          {renderContent()}
        </>
      )}
    </Page>
  )
}

export default SmartVault
