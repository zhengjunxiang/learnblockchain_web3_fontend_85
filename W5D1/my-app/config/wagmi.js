import { createConfig, http } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { injected, walletConnect } from 'wagmi/connectors'
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

export const config = createConfig({
  chains: [sepoliaConfig],
  transports,
  connectors,
  ssr: true,
})