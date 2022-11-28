import { QueryClient, QueryClientProvider } from 'react-query'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import PageNotFound from './pages/PageNotFound'
import SmartVault from './pages/SmartVault'
import List from './pages/List'
import { ReactQueryDevtools } from 'react-query/devtools'
import { isDevelopment } from './constants/enviroment'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {isDevelopment && <ReactQueryDevtools initialIsOpen={false} />}
      <Routes>
        <Route
          path="/list"
          element={<List />}
        />
        <Route path="/smart-vaults/:id" element={<SmartVault />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </QueryClientProvider>
  )
}

export default App
