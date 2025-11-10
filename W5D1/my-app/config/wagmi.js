import { http } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { injected, walletConnect } from 'wagmi/connectors'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { createAppKit } from '@reown/appkit/react'
import { RPC_URL, WALLETCONNECT_PROJECT_ID } from '@/config/contracts'

const USE_CUSTOM_RPC = true

const sepoliaConfig = USE_CUSTOM_RPC ? {
  ...sepolia,
  rpcUrls: {
    default: { http: [RPC_URL] },
    public: { http: [RPC_URL] },
  }
} : sepolia

const transports = USE_CUSTOM_RPC ? {
  [sepolia.id]: http(RPC_URL),
} : {
  [sepolia.id]: http(),
}

// 先创建基础的 connectors（用于 wagmi config）
const connectors = [
  injected(),
  walletConnect({
    projectId: WALLETCONNECT_PROJECT_ID,
    showQrModal: true,
    metadata: {
      name: 'Web3 Frontend Demo',
      description: 'Learn Web3 Frontend Development',
      url: 'https://learn-web3-frontend.com',
      icons: ['https://avatars.githubusercontent.com/u/37784886']
    }
  }),
]

// 创建 WagmiAdapter - 它会在内部创建 wagmi config
const wagmiAdapter = new WagmiAdapter({
  chains: [sepoliaConfig],
  transports,
  connectors,
  ssr: true,
  networks: [{
    ...sepoliaConfig
  }],
  projectId: WALLETCONNECT_PROJECT_ID,
})

// Appkit 网络配置
const appKitNetworks = [{
  ...sepoliaConfig,
}]

// Appkit 配置选项 - 使用 WagmiAdapter
export const appKitOptions = {
  adapters: [wagmiAdapter],
  networks: appKitNetworks,
  projectId: WALLETCONNECT_PROJECT_ID,
  metadata: {
    name: 'Web3 Frontend Demo',
    description: 'Learn Web3 Frontend Development',
    url: 'https://learn-web3-frontend.com',
    icons: ['https://avatars.githubusercontent.com/u/37784886']
  },
  features: {
    analytics: true,
    email: true,
    socials: ['google', 'github', 'apple', 'discord', 'twitter'],
    emailShowWallets: true,
  },
  themeMode: 'light',
  themeVariables: {
    '--w3m-accent': '#0070f3',
  },
}

// 创建 Appkit 实例
export const appKit = createAppKit(appKitOptions)

// 从 WagmiAdapter 获取 wagmi config
// WagmiAdapter 在构造时已经创建了内部的 wagmiConfig
export const config = wagmiAdapter.wagmiConfig