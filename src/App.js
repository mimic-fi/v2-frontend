import { QueryClient, QueryClientProvider } from 'react-query'
import { Routes, Route } from 'react-router-dom'
import Hero from './sections/Hero'
import Home from './pages/Home'
import SmartVault from './pages/SmartVault'


const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/smart-vaults/:id" element={<SmartVault />} />
      </Routes>
    </QueryClientProvider>
  )
}

export default App
