'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ms from 'ms'
import { PropsWithChildren, useState } from 'react'
import { IsHydratedProvider } from './IsHydratedProvider'
import { WagmiProvider } from './WagmiProvider'

const queryClientOptions = {
  defaultOptions: {
    queries: {
      staleTime: ms('5min'),
    },
  },
}

export default function AppProviders({ children }: PropsWithChildren) {
  const [queryClient] = useState(() => new QueryClient(queryClientOptions))

  return (
    <IsHydratedProvider>
      <WagmiProvider>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </WagmiProvider>
    </IsHydratedProvider>
  )
}
