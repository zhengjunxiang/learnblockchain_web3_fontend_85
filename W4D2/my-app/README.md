# Web3 DApp - RainbowKit 钱包连接

这是一个使用 **RainbowKit**、**Wagmi** 和 **Viem** 构建的现代化 Web3 应用，支持多钱包连接和多链切换。

## 🎯 项目特点

- ✅ **RainbowKit** 集成 - 美观的钱包连接 UI
- ✅ **Wagmi v2** - 最新的 React Hooks for Ethereum
- ✅ **Viem** - 类型安全的以太坊库
- ✅ **Infura RPC** - 企业级区块链节点服务
- ✅ **个性化主题** - 紫色渐变 + 大圆角 + 酷炫动画
- ✅ **实时数据** - 账户余额、区块高度实时更新
- ✅ **多链支持** - Ethereum、Polygon、Arbitrum、Optimism、Base
- ✅ **响应式设计** - 完美支持移动端和桌面端
- ✅ **深色模式** - 自动适配系统主题

## 📦 已安装的依赖

```json
{
  "@rainbow-me/rainbowkit": "^2.2.9",
  "@tanstack/react-query": "^5.90.5",
  "viem": "^2.38.4",
  "wagmi": "^2.18.2"
}
```

## 🚀 快速开始

### 1. 获取 WalletConnect Project ID（必需）

RainbowKit 2.0+ 版本需要 WalletConnect Project ID：

1. 访问 [WalletConnect Cloud](https://cloud.walletconnect.com)
2. 注册/登录账号
3. 创建新项目
4. 复制 Project ID

打开 `app/providers.tsx`，在第 19 行替换：

```typescript
projectId: 'YOUR_WALLETCONNECT_PROJECT_ID', // 👈 替换这里
```

### 2. 获取 Infura API Key（可选但推荐）

使用 Infura 可以获得更稳定快速的节点连接：

1. 访问 [Infura](https://app.infura.io)
2. 注册并创建项目
3. 复制 API Key

打开 `app/wagmi.config.ts`，在第 5 行替换：

```typescript
const INFURA_API_KEY = 'YOUR_INFURA_API_KEY'; // 👈 替换这里
```

> **注意**：如果不配置 Infura，项目会使用公共 RPC 节点，可能会有速率限制。

### 3. 启动项目

```bash
# 安装依赖（如果还没安装）
npm install

# 启动开发服务器
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000)

## 🎨 自定义 RainbowKit 主题

在 `app/providers.tsx` 中已配置个性化主题：

```typescript
<RainbowKitProvider
  theme={darkTheme({
    accentColor: '#7b3ff2',        // 主题色：紫色
    accentColorForeground: 'white', // 前景色：白色
    borderRadius: 'large',          // 圆角：大
    fontStack: 'system',            // 字体：系统字体
    overlayBlur: 'small',           // 背景模糊：小
  })}
  coolMode                          // 酷炫模式（彩虹效果）
>
```

### 可自定义参数：

| 参数 | 选项 | 说明 |
|------|------|------|
| `accentColor` | 任何十六进制颜色 | 主题色 |
| `accentColorForeground` | 颜色值 | 文字颜色 |
| `borderRadius` | `'none'` \| `'small'` \| `'medium'` \| `'large'` | 圆角大小 |
| `fontStack` | `'rounded'` \| `'system'` | 字体样式 |
| `overlayBlur` | `'none'` \| `'small'` \| `'large'` | 背景模糊 |
| `coolMode` | boolean | 酷炫动画效果 |

## 🌐 支持的区块链网络

- **Ethereum Mainnet** - 以太坊主网
- **Ethereum Sepolia** - 以太坊测试网
- **Polygon** - Polygon 主网（低 gas 费）
- **Arbitrum** - Arbitrum One（Layer 2）
- **Optimism** - Optimism 主网（Layer 2）
- **Base** - Coinbase Base 链（Layer 2）

## 💡 功能特性

### 钱包连接
- 支持 MetaMask、WalletConnect、Coinbase Wallet、Rainbow 等多种钱包
- 一键连接，自动切换网络
- 美观的钱包选择界面

### 实时数据显示
- 钱包地址
- 当前网络名称和 ID
- 账户余额（实时更新）
- 当前区块高度

### 用户界面
- 现代化的渐变背景
- 玻璃拟态设计（backdrop-blur）
- 流畅的动画效果
- 完全响应式布局

## 📂 项目结构

```
W4D2/my-app/
├── app/
│   ├── components/          # 组件目录
│   ├── providers.tsx        # RainbowKit & Wagmi 配置
│   ├── wagmi.config.ts      # Wagmi 配置（Infura RPC）
│   ├── layout.tsx           # 根布局
│   ├── page.tsx             # 主页面
│   └── globals.css          # 全局样式
├── package.json
├── SETUP.md                 # 详细配置指南
├── 配置步骤.md              # 中文配置步骤
└── README.md                # 本文件
```

## 🛠 核心文件说明

### `app/providers.tsx`
配置 RainbowKit 和 Wagmi 的 Provider 组件，包括：
- WalletConnect Project ID
- 支持的区块链网络
- RainbowKit 主题定制
- React Query 配置

### `app/wagmi.config.ts`
配置 Wagmi 的网络传输层，使用 Infura RPC：
- Ethereum Mainnet
- Sepolia Testnet
- Polygon
- Arbitrum
- Optimism
- Base

### `app/page.tsx`
主页面组件，展示：
- ConnectButton（钱包连接按钮）
- 账户信息卡片
- 功能特点说明
- 欢迎界面（未连接时）

## 📱 使用指南

### 连接钱包

1. 点击右上角"连接钱包"按钮
2. 选择你的钱包（推荐 MetaMask）
3. 在钱包中确认连接
4. 连接成功！

### 切换网络

1. 点击右上角的钱包地址按钮
2. 在下拉菜单中点击当前网络
3. 选择要切换的网络
4. 在钱包中确认切换

### 断开连接

1. 点击右上角的钱包地址按钮
2. 选择"Disconnect"

## 🧪 测试网络

如果想在测试网上试用：

### Sepolia 测试网
- 免费测试币水龙头：https://sepoliafaucet.com/
- 区块浏览器：https://sepolia.etherscan.io/

## ❓ 常见问题

**Q: 为什么连接钱包按钮不显示？**
- 检查是否配置了 WalletConnect Project ID
- 查看浏览器控制台是否有错误

**Q: MetaMask 显示"Wrong Network"？**
- 在 MetaMask 中切换到支持的网络
- 或在应用中点击网络切换

**Q: 看不到余额？**
- 确保钱包中有余额
- 等待几秒让数据加载
- 刷新页面试试

**Q: 如何获取测试币？**
- 访问 Sepolia 水龙头获取免费测试 ETH
- 测试币仅在测试网有效

**Q: 想要更改主题颜色？**
- 编辑 `app/providers.tsx` 中的 `accentColor`
- 可以使用任何十六进制颜色代码

## 🔐 安全提示

- ⚠️ 永远不要分享你的私钥或助记词
- ⚠️ 定期备份你的钱包
- ⚠️ 主网操作需要真实 ETH，请谨慎
- ⚠️ 建议先在测试网测试

## 🎓 学习资源

- [RainbowKit 官方文档](https://www.rainbowkit.com/)
- [Wagmi 官方文档](https://wagmi.sh/)
- [Viem 官方文档](https://viem.sh/)
- [Infura 官方文档](https://docs.infura.io/)

## 📸 截图说明

连接钱包成功后，你会看到：

- 🌈 个性化的紫色主题
- 📱 钱包地址和网络信息
- 💰 实时更新的账户余额
- 📊 当前区块高度
- ✨ 酷炫的动画效果

## 💻 技术栈

- **Next.js 16** - React 框架
- **TypeScript** - 类型安全
- **Tailwind CSS 4** - 样式框架
- **RainbowKit 2.2** - 钱包连接 UI
- **Wagmi 2.18** - React Hooks for Ethereum
- **Viem 2.38** - TypeScript Ethereum library
- **TanStack Query 5** - 数据获取和缓存

## 📄 许可

MIT License

## 🙏 致谢

感谢以下开源项目：
- RainbowKit 团队
- Wagmi 团队
- Viem 团队
- Next.js 团队

---

祝你使用愉快！如有问题，请查看 `SETUP.md` 或 `配置步骤.md` 获取详细帮助。🚀
