'use client'

import { RainbowKitProvider, getDefaultWallets } from '@rainbow-me/rainbowkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ms from 'ms'
import { useHotkeys } from 'react-hotkeys-hook'
import { WagmiConfig, configureChains, createConfig, mainnet } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { DrawDate } from './components/DrawDate'
import { MaxTickets } from './components/MaxTickets'
import { Rewards } from './components/Rewards'
import { TicketPrice } from './components/TicketPrice'

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [publicProvider()],
)

const { connectors } = getDefaultWallets({
  appName: '🎟️🎉✨',
  projectId: 'a9521851059a3edef5d9cfb95932bd83',
  chains,
})

const wagmiConfig = createConfig({
  autoConnect: true,
  publicClient,
  connectors,
  webSocketPublicClient,
})

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: ms('5min'),
    },
  },
})

export default function Home() {
  useHotkeys('meta+s', () => null, { preventDefault: true })
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains}>
          <main className="flex flex-col items-center justify-center p-4 gap-2">
            <div className="fixed top-4 left-6 text-xl">
              <span>🎟️ 🎉 ✨</span>
            </div>
            <h1 className="text-2xl font-bold">Create Raffle</h1>
            <div className="h-[1px] w-[400px] bg-gray-200 mb-8" />

            <div className="flex gap-8 max-w-4xl flex-wrap">
              <div className="flex flex-col gap-4">
                <TicketPrice />
                <MaxTickets />
                <DrawDate />
              </div>
              <div className="flex flex-col gap-4">
                <Rewards />
              </div>
            </div>
          </main>
        </RainbowKitProvider>
      </WagmiConfig>
    </QueryClientProvider>
  )
}
