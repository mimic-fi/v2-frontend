import { QueryClient, QueryClientProvider } from 'react-query'
import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import Home from './pages/Home'
import PageNotFound from './pages/PageNotFound'
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
          <Route path="/smart-vaults/:id" element={<SmartVault />} />
          <Route path="/smart-vaults/:id/config" element={<Config />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
