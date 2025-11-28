import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./index.css";
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider } from 'react-router-dom'
import { queryClient } from './app/queryClient.ts'
import GlobalErrorBoundary from './app/GlobalErrorBoundary.tsx';
import { Toaster } from 'react-hot-toast';
import { router } from './app/router.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster position='top-right'></Toaster>
      <GlobalErrorBoundary>
        <RouterProvider router={router} />
      </GlobalErrorBoundary>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
)
