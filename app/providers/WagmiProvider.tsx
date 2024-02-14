'use client'

import { RainbowKitProvider, getDefaultWallets, lightTheme } from '@rainbow-me/rainbowkit'
import { PropsWithChildren } from 'react'
import { WagmiConfig } from 'wagmi'

import { configureChains, createConfig, mainnet } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'

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

export function WagmiProvider({ children }: PropsWithChildren) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider theme={lightTheme()} chains={chains}>
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export type SupportedChain = (typeof chains)[number]
