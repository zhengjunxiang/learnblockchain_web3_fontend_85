'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useBalance, useBlockNumber } from 'wagmi';

export default function Home() {
  const { address, isConnected, chain } = useAccount();
  const { data: balance } = useBalance({
    address: address,
  });
  const { data: blockNumber } = useBlockNumber();

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-purple-900 dark:to-gray-900">
      <main className="flex w-full max-w-4xl flex-col items-center gap-8 p-8">
        {/* Header */}
        <div className="flex w-full items-center justify-between rounded-2xl bg-white/80 p-6 shadow-lg backdrop-blur-sm dark:bg-gray-800/80">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              🌈 Web3 DApp
            </h1>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              使用 RainbowKit、Wagmi 和 Viem 构建
            </p>
          </div>
          <ConnectButton />
        </div>

        {/* Content */}
        <div className="w-full space-y-6">
          {isConnected ? (
            <>
              {/* Account Info Card */}
              <div className="rounded-2xl bg-white/80 p-6 shadow-lg backdrop-blur-sm dark:bg-gray-800/80">
                <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
                  📱 账户信息
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      钱包地址:
                    </span>
                    <code className="text-xs font-mono text-purple-600 dark:text-purple-400">
                      {address}
                    </code>
                  </div>
                  
                  {chain && (
                    <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        当前网络:
                      </span>
                      <span className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
                        {chain.name}
                        <span className="rounded-full bg-green-500 px-2 py-1 text-xs text-white">
                          ID: {chain.id}
                        </span>
                      </span>
                    </div>
                  )}

                  {balance && (
                    <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        余额:
                      </span>
                      <span className="text-lg font-bold text-gray-900 dark:text-white">
                        {parseFloat(balance.formatted).toFixed(4)} {balance.symbol}
                      </span>
                    </div>
                  )}

                  {blockNumber && (
                    <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        当前区块高度:
                      </span>
                      <span className="font-mono text-sm font-semibold text-gray-900 dark:text-white">
                        #{blockNumber.toString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Features Card */}
              <div className="rounded-2xl bg-white/80 p-6 shadow-lg backdrop-blur-sm dark:bg-gray-800/80">
                <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
                  ✨ 功能特点
                </h2>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    支持多种钱包（MetaMask、WalletConnect、Coinbase 等）
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    多链支持（Ethereum、Polygon、Arbitrum、Optimism、Base）
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    使用 Infura RPC 节点连接区块链
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    自定义 RainbowKit 主题（紫色渐变、大圆角、酷炫动画）
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    实时显示账户余额和区块高度
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <div className="rounded-2xl bg-white/80 p-12 text-center shadow-lg backdrop-blur-sm dark:bg-gray-800/80">
              <div className="mx-auto mb-4 text-6xl">🔐</div>
              <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                欢迎来到 Web3 世界
              </h2>
              <p className="mb-6 text-gray-600 dark:text-gray-400">
                请点击右上角的&quot;连接钱包&quot;按钮开始使用
              </p>
              <div className="mx-auto max-w-md space-y-2 text-left text-sm text-gray-600 dark:text-gray-400">
                <p>💡 提示：</p>
                <ul className="ml-4 list-disc space-y-1">
                  <li>确保已安装 MetaMask 或其他 Web3 钱包</li>
                  <li>连接后可以查看账户信息和余额</li>
                  <li>支持切换不同的区块链网络</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          <p>使用 Next.js 14 + TypeScript + Tailwind CSS 构建</p>
          <p className="mt-1">
            技术栈: <span className="font-semibold">RainbowKit</span> +{' '}
            <span className="font-semibold">Wagmi</span> +{' '}
            <span className="font-semibold">Viem</span>
          </p>
        </div>
      </main>
    </div>
  );
}
