import { QueryClient, QueryClientProvider } from 'react-query'
import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import Home from './pages/Home'
import PageNotFound from './pages/PageNotFound'
import ActionHistory from './pages/ActionHistory'
import SmartVault from './pages/SmartVault'
import List from './pages/List'
import Config from './pages/Config'
import { ReactQueryDevtools } from 'react-query/devtools'
import { isDevelopment } from './constants/enviroment'
import theme from './styles/theme.js'

const queryClient = new QueryClient()

function App() {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        {isDevelopment && <ReactQueryDevtools initialIsOpen={false} />}
        <Routes>
          <Route path="/list" element={<List />} />
          <Route name="history" path="/smart-vaults/:id/action-history" element={<ActionHistory />} />
          <Route name="overview" path="/smart-vaults/:id" element={<SmartVault />} />
          <Route name="configuration" path="/smart-vaults/:id/config" element={<Config />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
