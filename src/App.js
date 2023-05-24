import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { DAppProvider } from '@usedapp/core'
import Home from './pages/Home'
import PageNotFound from './pages/PageNotFound'
import SmartVault from './pages/SmartVault'
import List from './pages/List'
import { ReactQueryDevtools } from 'react-query/devtools'
import { isDevelopment } from './constants/enviroment'
import theme from './styles/theme.js'
import Stats from './pages/Stats'
import { useChainId } from './hooks/useChainId'
import { CHAIN_INFO } from './constants/chainInfo'

const queryClient = new QueryClient()

function App() {
  const chainId = useChainId()
  const config = {
    autoConnect: false,
    readOnlyUrls: {
      1: CHAIN_INFO[1].rpc,
      5: CHAIN_INFO[5].rpc,
      10: CHAIN_INFO[10].rpc,
      137: CHAIN_INFO[137].rpc,
      100: CHAIN_INFO[100].rpc,
      42161: CHAIN_INFO[42161].rpc,
      56: CHAIN_INFO[56].rpc,
      43114: CHAIN_INFO[43114].rpc,
      250: CHAIN_INFO[250].rpc,
    },
  }

  return (
    <DAppProvider config={config}>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          {isDevelopment && <ReactQueryDevtools initialIsOpen={false} />}
          <Routes>
            <Route path="/list" element={<List />} />
            <Route path="/stats" element={<Stats />} />
            <Route
              name="configuration"
              path="/smart-vaults/:id/:page/:action"
              element={<SmartVault chain={chainId} />}
            />
            <Route
              name="action-history"
              path="/smart-vaults/:id/:page"
              element={<SmartVault chain={chainId} />}
            />
            <Route
              name="overview"
              path="/smart-vaults/:id"
              element={<SmartVault chain={chainId} />}
            />
            />
            <Route path="/" element={<Home />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </QueryClientProvider>
      </ThemeProvider>
    </DAppProvider>
  )
}

export default App
