# W5D1 - Viem 区块链操作演示

这个项目演示了如何使用 Viem 库与以太坊区块链进行交互。

## 功能特性

### 1. ETH 转账
- 向任意地址转账 ETH
- 支持自定义转账金额

### 2. 读取 ERC20 合约信息
- 合约地址：`0xa7d726B7F1085F943056C2fB91abE0204eC6d6DA`
- 读取内容：
  - 代币名称和符号
  - 合约发行方（owner）
  - 总供应量（totalSupply）
  - 发行上限（cap）
  - 指定地址的持币数量

### 3. Mint ERC20 代币
- 向自己的账户 mint 代币
- 支持最多 mint 10,000 枚代币
- 自动在 mint 后查询新的余额

### 4. 查询代币余额
- 实时查询当前账户的 ERC20 代币余额
- 显示代币符号和详细数量

## 技术栈

- **Next.js 16** - React 框架
- **Viem** - 以太坊交互库
- **TypeScript** - 类型安全
- **Tailwind CSS** - 样式框架
- **Sepolia 测试网** - 测试网络

## 安装和运行

```bash
# 进入项目目录
cd W5D1/my-app

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问 http://localhost:3000 查看应用。

## 使用说明

### 第一步：设置账户
1. 在"账户设置"区域输入你的私钥（必须以 `0x` 开头）
2. 点击"设置账户"按钮
3. 系统会显示你的账户地址

**注意：请使用测试网账户，不要使用主网私钥！**

### 第二步：ETH 转账
1. 输入目标地址
2. 输入转账金额（ETH）
3. 点击"发送 ETH"
4. 等待交易确认

### 第三步：读取合约信息
1. 点击"读取合约信息"按钮
2. 系统会显示：
   - 代币名称和符号
   - 合约发行方地址
   - 总供应量
   - 发行上限
   - 你的当前余额

### 第四步：Mint 代币
1. 输入要 mint 的数量（1-10000）
2. 点击"Mint 代币"按钮
3. 等待交易确认
4. 系统会自动查询新的余额

### 第五步：查询余额
1. 点击"查询余额"按钮
2. 查看你的 ERC20 代币余额

## 代码结构

```
app/
  ├── page.tsx          # 主页面，包含所有 Viem 操作
  ├── layout.tsx        # 应用布局
  └── globals.css       # 全局样式
```

## Viem 核心功能使用

### 创建客户端
```typescript
// 公共客户端（用于读取）
const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(),
});

// 钱包客户端（用于写入）
const walletClient = createWalletClient({
  account: acc,
  chain: sepolia,
  transport: http(),
});
```

### 读取合约
```typescript
const balance = await publicClient.readContract({
  address: ERC20_ADDRESS,
  abi: ERC20_ABI,
  functionName: "balanceOf",
  args: [account],
});
```

### 写入合约
```typescript
const hash = await walletClient.writeContract({
  address: ERC20_ADDRESS,
  abi: ERC20_ABI,
  functionName: "mint",
  args: [account, parseEther(amount)],
});
```

### 转账 ETH
```typescript
const hash = await walletClient.sendTransaction({
  to: toAddress,
  value: parseEther(amount),
});
```

## 安全提示

⚠️ **重要提示**
- 这个应用仅用于学习和测试目的
- 不要在生产环境中使用
- 不要输入主网私钥
- 建议使用 Sepolia 测试网
- 可以从水龙头获取测试 ETH：https://sepoliafaucet.com/

## 测试网配置

- **网络**：Sepolia Testnet
- **Chain ID**：11155111
- **RPC URL**：使用 Viem 的默认配置
- **区块浏览器**：https://sepolia.etherscan.io/

## ERC20 合约信息

- **合约地址**：`0xa7d726B7F1085F943056C2fB91abE0204eC6d6DA`
- **网络**：Sepolia Testnet
- **功能**：
  - 标准 ERC20 功能
  - Mint 功能（需要权限）
  - Cap 限制

## 常见问题

### 1. 交易失败怎么办？
- 检查账户是否有足够的 ETH 支付 gas
- 确认使用的是 Sepolia 测试网
- 检查合约地址是否正确

### 2. 无法 mint 代币？
- 确认你的账户有 mint 权限
- 检查是否超过了发行上限
- 确认 mint 数量在 1-10000 之间

### 3. 余额显示为 0？
- 等待交易确认（可能需要几秒到几分钟）
- 刷新页面重新查询
- 检查区块浏览器确认交易状态

## 资源链接

- [Viem 文档](https://viem.sh/)
- [Next.js 文档](https://nextjs.org/docs)
- [Sepolia 测试网水龙头](https://sepoliafaucet.com/)
- [以太坊开发文档](https://ethereum.org/developers)

## License

MIT

