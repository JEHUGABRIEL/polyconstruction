import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient } from '@tanstack/react-query'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'
import './index.css'
import './i18n.js'
import App from './App.jsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      gcTime: 1000 * 60 * 60 * 24, // 24h avant garbage collection
      staleTime: 1000 * 60 * 30, // 30min avant revalidation
    },
  },
})

const persister = createAsyncStoragePersister({
  storage: window.localStorage,
  key: 'liam-query-cache',
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister,
        maxAge: 1000 * 60 * 60 * 24, // 24h max dans localStorage
      }}
    >
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen bg-white">
          <div className="w-10 h-10 border-2 border-brand-500/20 border-t-brand-500 rounded-full animate-spin" />
        </div>
      }>
        <App />
      </Suspense>
    </PersistQueryClientProvider>
  </StrictMode>,
)
