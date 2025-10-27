'use client';

import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
  darkTheme,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  sepolia,
} from 'wagmi/chains';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

// 配置 Wagmi，使用 Infura RPC
const config = getDefaultConfig({
  appName: 'Web3 DApp',
  projectId: '428ed73e74f6734023cf4e5232253d90', // 从 https://cloud.walletconnect.com 获取
  chains: [mainnet, polygon, optimism, arbitrum, base, sepolia],
  ssr: true, // 如果你的 dApp 使用服务端渲染 (SSR)
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: '#7b3ff2',
            accentColorForeground: 'white',
            borderRadius: 'large',
            fontStack: 'system',
            overlayBlur: 'small',
          })}
          coolMode
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

