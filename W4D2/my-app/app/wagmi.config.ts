import { http, createConfig } from 'wagmi';
import { mainnet, sepolia, polygon, arbitrum, optimism, base } from 'wagmi/chains';

// 在这里配置你的 Infura API Key
const INFURA_API_KEY = '5dd020ed38a74e27ac1f12fe5c871c39'; // 从 https://infura.io 获取

export const config = createConfig({
  chains: [mainnet, sepolia, polygon, arbitrum, optimism, base],
  transports: {
    [mainnet.id]: http(`https://mainnet.infura.io/v3/${INFURA_API_KEY}`),
    [sepolia.id]: http(`https://sepolia.infura.io/v3/${INFURA_API_KEY}`),
    [polygon.id]: http(`https://polygon-mainnet.infura.io/v3/${INFURA_API_KEY}`),
    [arbitrum.id]: http(`https://arbitrum-mainnet.infura.io/v3/${INFURA_API_KEY}`),
    [optimism.id]: http(`https://optimism-mainnet.infura.io/v3/${INFURA_API_KEY}`),
    [base.id]: http(`https://base-mainnet.infura.io/v3/${INFURA_API_KEY}`),
  },
});

