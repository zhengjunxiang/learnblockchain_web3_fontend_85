'use client'
import { useState } from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAppKit } from '@reown/appkit/react'

export default function ConnectWalletDemo() {
  const [activeDemo, setActiveDemo] = useState('walletconnect')
  const { address, isConnected } = useAccount()
  const { connectors, connect } = useConnect()
  const { disconnect } = useDisconnect()
  const { open } = useAppKit()

  const walletConnectConnector = connectors.find(c => c.id === 'walletConnect')
  // Appkit 连接器可能有不同的 ID，查找包含 'reown' 或 'appkit' 的连接器
  const appKitConnector = connectors.find(c =>
    c.id.toLowerCase().includes('reown') ||
    c.id.toLowerCase().includes('appkit') ||
    c.name?.toLowerCase().includes('appkit')
  )

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>钱包连接工具演示</h1>

      {isConnected && (
        <div style={{
          padding: '15px',
          backgroundColor: '#e8f4fd',
          borderRadius: '8px',
          marginBottom: '30px'
        }}>
          <p><strong>已连接:</strong> {address?.slice(0, 6)}...{address?.slice(-4)}</p>
          <button onClick={() => disconnect()} style={disconnectButtonStyle}>
            断开连接
          </button>
        </div>
      )}

      <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
        <button
          onClick={() => setActiveDemo('walletconnect')}
          style={{
            ...tabStyle,
            backgroundColor: activeDemo === 'walletconnect' ? '#0070f3' : '#f5f5f5',
            color: activeDemo === 'walletconnect' ? 'white' : '#333'
          }}
        >
          WalletConnect
        </button>
        <button
          onClick={() => setActiveDemo('rainbowkit')}
          style={{
            ...tabStyle,
            backgroundColor: activeDemo === 'rainbowkit' ? '#0070f3' : '#f5f5f5',
            color: activeDemo === 'rainbowkit' ? 'white' : '#333'
          }}
        >
          RainbowKit
        </button>
        <button
          onClick={() => setActiveDemo('appkit')}
          style={{
            ...tabStyle,
            backgroundColor: activeDemo === 'appkit' ? '#0070f3' : '#f5f5f5',
            color: activeDemo === 'appkit' ? 'white' : '#333'
          }}
        >
          Appkit
        </button>
      </div>

      {activeDemo === 'walletconnect' && (
        <div style={cardStyle}>
          <h2>WalletConnect</h2>
          <p style={{ color: '#666', marginBottom: '20px' }}>
            使用 Wagmi 的 useConnect hook 连接 WalletConnect
          </p>
          {!isConnected && walletConnectConnector ? (
            <button
              onClick={() => connect({ connector: walletConnectConnector })}
              style={buttonStyle}
            >
              连接 WalletConnect
            </button>
          ) : isConnected ? (
            <p style={{ color: '#10b981' }}>✅ 已连接</p>
          ) : (
            <p style={{ color: '#ef4444' }}>WalletConnect 连接器未找到</p>
          )}
        </div>
      )}

      {activeDemo === 'rainbowkit' && (
        <div style={cardStyle}>
          <h2>RainbowKit</h2>
          <p style={{ color: '#666', marginBottom: '20px' }}>
            使用 RainbowKit 的 ConnectButton 组件
          </p>
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            <ConnectButton />
            <ConnectButton.Custom>
              {({ account, chain, openConnectModal, openAccountModal, mounted }) => {
                const ready = mounted
                const connected = ready && account && chain

                return (
                  <div
                    {...(!ready && {
                      'aria-hidden': true,
                      style: {
                        opacity: 0,
                        pointerEvents: 'none',
                      },
                    })}
                  >
                    {!connected ? (
                      <button onClick={openConnectModal} style={buttonStyle}>
                        自定义连接按钮
                      </button>
                    ) : (
                      <button onClick={openAccountModal} style={{ ...buttonStyle, backgroundColor: '#10b981' }}>
                        {account.displayName}
                      </button>
                    )}
                  </div>
                )
              }}
            </ConnectButton.Custom>
          </div>
        </div>
      )}

      {activeDemo === 'appkit' && (
        <div style={cardStyle}>
          <h2>Appkit</h2>
          <p style={{ color: '#666', marginBottom: '20px' }}>
            使用 Appkit 的 useAppKit hook 打开连接弹窗，支持多种连接方式（钱包、邮箱、社交登录等）
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {!isConnected ? (
              <>
                <button
                  onClick={() => open()}
                  style={buttonStyle}
                >
                  打开 Appkit 连接弹窗
                </button>
                {appKitConnector && (
                  <button
                    onClick={() => connect({ connector: appKitConnector })}
                    style={{ ...buttonStyle, backgroundColor: '#10b981' }}
                  >
                    直接连接 Appkit 连接器
                  </button>
                )}
              </>
            ) : (
              <div>
                <p style={{ color: '#10b981', marginBottom: '15px' }}>✅ 已连接</p>
                <button
                  onClick={() => open()}
                  style={{ ...buttonStyle, backgroundColor: '#6b7280' }}
                >
                  打开账户管理
                </button>
              </div>
            )}
          </div>
          <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
            <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>
              <strong>Appkit 特性：</strong>
            </p>
            <ul style={{ fontSize: '12px', color: '#6b7280', margin: '10px 0 0 0', paddingLeft: '20px' }}>
              <li>支持多种钱包连接（MetaMask、WalletConnect 等）</li>
              <li>支持邮箱登录和社交登录（Google、GitHub、Apple 等）</li>
              <li>支持智能合约钱包</li>
              <li>美观的 UI 界面</li>
            </ul>
          </div>
        </div>
      )}

      <div style={{ marginTop: '40px', textAlign: 'center' }}>
        <a href="/" style={linkStyle}>返回首页</a>
      </div>
    </div>
  )
}

const buttonStyle = {
  padding: '12px 24px',
  backgroundColor: '#0070f3',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: '600',
}

const disconnectButtonStyle = {
  ...buttonStyle,
  backgroundColor: '#ef4444',
  marginTop: '10px',
}

const tabStyle = {
  padding: '12px 24px',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: '600',
}

const cardStyle = {
  padding: '30px',
  backgroundColor: 'white',
  borderRadius: '12px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
}

const linkStyle = {
  color: '#0070f3',
  textDecoration: 'none',
  padding: '10px 20px',
  border: '1px solid #0070f3',
  borderRadius: '5px',
}