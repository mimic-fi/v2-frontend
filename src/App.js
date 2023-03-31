import { QueryClient, QueryClientProvider } from 'react-query'
import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { DAppProvider, Mainnet, Goerli } from '@usedapp/core'
import { getDefaultProvider } from 'ethers'
import Home from './pages/Home'
import PageNotFound from './pages/PageNotFound'
import ActionHistory from './pages/ActionHistory'
import SmartVault from './pages/SmartVault'
import List from './pages/List'
import Config from './pages/Config'
import { ReactQueryDevtools } from 'react-query/devtools'
import { isDevelopment } from './constants/enviroment'
import theme from './styles/theme.js'
import Stats from './pages/Stats'
import { useChainId } from './hooks/useChainId'

const queryClient = new QueryClient()

function App() {
  const chainId = useChainId()
  console.log('chain', chainId)
  const config = {
    autoConnect: false,
    readOnlyChainId: [Mainnet.chainId],
    readOnlyUrls: {
      [Mainnet.chainId]: getDefaultProvider('mainnet'),
      [Goerli.chainId]: getDefaultProvider('goerli'),
    },
  }
  
  // // 137: CHAIN_INFO[137].rpc,
  // // 100: CHAIN_INFO[100].rpc,
  // // 42161: CHAIN_INFO[42161].rpc,
  // // 56: CHAIN_INFO[56].rpc,
  // // 43114: CHAIN_INFO[43114].rpc,
  // // 250: CHAIN_INFO[250].rpc
  // const config = {
  //   autoConnect: false,
  //   readOnlyChainId: chainId,
  //   readOnlyUrls: {
  //     [Mainnet.chainId]: getDefaultProvider('mainnet'),
  //     [Goerli.chainId]: getDefaultProvider('goerli'),
  //     10: CHAIN_INFO[10].rpc,
  //   },
  // }

  return (
    <DAppProvider config={config}>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          {isDevelopment && <ReactQueryDevtools initialIsOpen={false} />}
          <Routes>
            <Route path="/list" element={<List />} />
            <Route path="/stats" element={<Stats />} />
            <Route
              name="history"
              path="/smart-vaults/:id/action-history"
              element={<ActionHistory />}
            />
            <Route
              name="overview"
              path="/smart-vaults/:id"
              element={<SmartVault />}
            />
            <Route
              name="configuration"
              path="/smart-vaults/:id/config"
              element={<Config />}
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
