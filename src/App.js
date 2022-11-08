import { QueryClient, QueryClientProvider } from 'react-query'
import { Routes, Route } from 'react-router-dom'
import Hero from './sections/Hero'
import SmartVaults from './pages/SmartVaults'
import Primitives from './pages/Primitives'


const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<SmartVaults />} />
        <Route path="/smart-vaults" element={<SmartVaults />} />
        <Route path="/smart-vaults/:id" element={<Primitives />} />
      </Routes>
    </QueryClientProvider>
  )
}

export default App
