import { QueryClient, QueryClientProvider } from 'react-query'
import Hero from './sections/Hero'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Hero />
      </div>
    </QueryClientProvider>
  )
}

export default App
