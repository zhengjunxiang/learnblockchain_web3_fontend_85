'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { AppKitProvider } from '@reown/appkit/react'
import { config, appKitOptions } from '@/config/wagmi'
import { sepolia } from 'wagmi/chains'
import '@rainbow-me/rainbowkit/styles.css'
import { useState } from 'react'

export function Web3Providers({ children }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <AppKitProvider {...appKitOptions}>
          <RainbowKitProvider initialChain={sepolia}>
            {children}
          </RainbowKitProvider>
        </AppKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}