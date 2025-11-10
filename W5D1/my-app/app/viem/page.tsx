"use client";

import { useState, useEffect } from "react";
import {
  createPublicClient,
  createWalletClient,
  http,
  parseEther,
  formatEther,
  type Address,
} from "viem";
import { sepolia } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";
import { CONTRACTS } from "@/config/contracts";

const ERC20_ADDRESS = CONTRACTS.ERC20TOKEN.address as Address;
const ERC20_ABI = CONTRACTS.ERC20TOKEN.abi;

export default function Home() {
  const [privateKey, setPrivateKey] = useState<string>("");
  const [account, setAccount] = useState<Address | null>(null);
  const [toAddress, setToAddress] = useState<string>("");
  const [ethAmount, setEthAmount] = useState<string>("0.01");
  const [mintAmount, setMintAmount] = useState<string>("1000");

  // 合约信息
  const [contractOwner, setContractOwner] = useState<string>("");
  const [totalSupply, setTotalSupply] = useState<string>("");
  const [cap, setCap] = useState<string>("");
  const [balance, setBalance] = useState<string>("");
  const [tokenName, setTokenName] = useState<string>("");
  const [tokenSymbol, setTokenSymbol] = useState<string>("");

  // 状态信息
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [showNotification, setShowNotification] = useState<boolean>(false);

  // 创建公共客户端
  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(),
  });

  // 当有新消息时显示通知，5秒后自动隐藏
  useEffect(() => {
    if (message) {
      setShowNotification(true);
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // 从私钥获取账户
  const handleSetPrivateKey = () => {
    try {
      if (!privateKey.startsWith("0x")) {
        setMessage("私钥必须以 0x 开头");
        return;
      }
      const acc = privateKeyToAccount(privateKey as `0x${string}`);
      setAccount(acc.address);
      setMessage(`账户地址: ${acc.address}`);
    } catch (error) {
      setMessage(
        `错误: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  };

  // 1. 转账 ETH
  const handleTransferETH = async () => {
    if (!privateKey || !toAddress) {
      setMessage("请输入私钥和目标地址");
      return;
    }

    setLoading(true);
    setMessage("正在转账...");

    try {
      const acc = privateKeyToAccount(privateKey as `0x${string}`);
      const walletClient = createWalletClient({
        account: acc,
        chain: sepolia,
        transport: http(),
      });

      const hash = await walletClient.sendTransaction({
        to: toAddress as Address,
        value: parseEther(ethAmount),
      });

      setMessage(`转账成功! 交易哈希: ${hash}`);
    } catch (error) {
      setMessage(
        `转账失败: ${error instanceof Error ? error.message : String(error)}`
      );
    } finally {
      setLoading(false);
    }
  };

  // 2. 读取 ERC20 合约信息
  const handleReadContract = async () => {
    setLoading(true);
    setMessage("正在读取合约信息...");

    try {
      // 读取代币名称
      const name = await publicClient.readContract({
        address: ERC20_ADDRESS,
        abi: ERC20_ABI,
        functionName: "name",
      });
      setTokenName(name as string);

      // 读取代币符号
      const symbol = await publicClient.readContract({
        address: ERC20_ADDRESS,
        abi: ERC20_ABI,
        functionName: "symbol",
      });
      setTokenSymbol(symbol as string);

      // 读取合约所有者
      const owner = await publicClient.readContract({
        address: ERC20_ADDRESS,
        abi: ERC20_ABI,
        functionName: "owner",
      });
      setContractOwner(owner as string);

      // 读取总供应量
      const supply = await publicClient.readContract({
        address: ERC20_ADDRESS,
        abi: ERC20_ABI,
        functionName: "totalSupply",
      });
      setTotalSupply(formatEther(supply as bigint));

      // 读取发行上限
      const capValue = await publicClient.readContract({
        address: ERC20_ADDRESS,
        abi: ERC20_ABI,
        functionName: "cap",
      });
      setCap(formatEther(capValue as bigint));

      // 如果有账户，读取余额
      if (account) {
        const bal = await publicClient.readContract({
          address: ERC20_ADDRESS,
          abi: ERC20_ABI,
          functionName: "balanceOf",
          args: [account],
        });
        setBalance(formatEther(bal as bigint));
      }

      setMessage("合约信息读取成功!");
    } catch (error) {
      setMessage(
        `读取失败: ${error instanceof Error ? error.message : String(error)}`
      );
    } finally {
      setLoading(false);
    }
  };

  // 3. Mint 代币
  const handleMintToken = async () => {
    if (!privateKey || !account) {
      setMessage("请先设置私钥");
      return;
    }

    const amount = parseFloat(mintAmount);
    if (amount <= 0 || amount > 10000) {
      setMessage("Mint 数量必须在 1 到 10000 之间");
      return;
    }

    setLoading(true);
    setMessage("正在检查权限并 Mint 代币...");

    try {
      // 先检查是否是owner
      // const owner = await publicClient.readContract({
      //   address: ERC20_ADDRESS,
      //   abi: ERC20_ABI,
      //   functionName: "owner",
      // });

      // if ((owner as string).toLowerCase() !== account.toLowerCase()) {
      //   setMessage(`❌ Mint 失败: 只有合约 owner 才能 mint 代币。\n当前账户: ${account}\n合约 Owner: ${owner}\n\n💡 提示: 请使用合约 owner 的私钥，或者联系合约管理员授予权限。`);
      //   setLoading(false);
      //   return;
      // }

      // 检查是否会超过cap
      const currentSupply = await publicClient.readContract({
        address: ERC20_ADDRESS,
        abi: ERC20_ABI,
        functionName: "totalSupply",
      });

      if (parseFloat(mintAmount) > (currentSupply as bigint)) {
        setMessage(
          `❌ Mint 失败: 会超过发行上限！\n当前供应量: ${formatEther(
            currentSupply as bigint
          )}`
        );
        setLoading(false);
        return;
      }

      setMessage("权限验证通过，正在提交交易...");

      const acc = privateKeyToAccount(privateKey as `0x${string}`);
      const walletClient = createWalletClient({
        account: acc,
        chain: sepolia,
        transport: http(),
      });

      const hash = await walletClient.writeContract({
        address: ERC20_ADDRESS,
        abi: ERC20_ABI,
        functionName: "mint",
        args: [parseEther(mintAmount)],
      });

      setMessage(`✅ Mint 成功! 交易哈希: ${hash}\n\n正在等待交易确认...`);

      // 等待交易确认后查询余额
      setTimeout(() => {
        handleQueryBalance();
        setMessage(`✅ Mint 成功! 交易哈希: ${hash}\n\n余额已更新！`);
      }, 5000);
    } catch (error) {
      let errorMsg = "未知错误";

      if (error instanceof Error && error.message) {
        if (error.message.includes("insufficient funds")) {
          errorMsg = "账户余额不足，无法支付 gas 费用";
        } else if (error.message.includes("user rejected")) {
          errorMsg = "用户取消了交易";
        } else if (error.message.includes("reverted")) {
          errorMsg = "合约执行失败 - 可能是权限不足或超过发行上限";
        } else {
          errorMsg = error.message;
        }
      } else {
        errorMsg = String(error);
      }

      setMessage(
        `❌ Mint 失败: ${errorMsg}\n\n💡 常见原因:\n1. 当前账户不是合约 owner\n2. 已达到发行上限（cap）\n3. Gas 费用不足\n4. 网络问题`
      );
    } finally {
      setLoading(false);
    }
  };

  // 4. 查询余额
  const handleQueryBalance = async () => {
    if (!account) {
      setMessage("请先设置私钥");
      return;
    }

    setLoading(true);

    try {
      const bal = await publicClient.readContract({
        address: ERC20_ADDRESS,
        abi: ERC20_ABI,
        functionName: "balanceOf",
        args: [account],
      });

      const balanceStr = formatEther(bal as bigint);
      setBalance(balanceStr);
      setMessage(`当前余额: ${balanceStr} ${tokenSymbol || "Token"}`);
    } catch (error) {
      setMessage(
        `查询失败: ${error instanceof Error ? error.message : String(error)}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Viem 区块链操作演示
        </h1>

        {/* 私钥设置 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
            账户设置
          </h2>
          <div className="flex gap-4">
            <input
              type="password"
              placeholder="输入私钥 (0x...)"
              value={privateKey}
              onChange={(e) => setPrivateKey(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <button
              onClick={handleSetPrivateKey}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              设置账户
            </button>
          </div>
          {account && (
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              当前账户: {account}
            </p>
          )}
        </div>

        {/* 1. 转账 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
            1. ETH 转账
          </h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="目标地址"
              value={toAddress}
              onChange={(e) => setToAddress(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <input
              type="text"
              placeholder="转账数量 (ETH)"
              value={ethAmount}
              onChange={(e) => setEthAmount(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <button
              onClick={handleTransferETH}
              disabled={loading}
              className="w-full px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400"
            >
              {loading ? "处理中..." : "发送 ETH"}
            </button>
          </div>
        </div>

        {/* 2. 读取合约信息 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
            2. ERC20 合约信息
          </h2>
          <button
            onClick={handleReadContract}
            disabled={loading}
            className="w-full px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:bg-gray-400 mb-4"
          >
            {loading ? "读取中..." : "读取合约信息"}
          </button>

          {(tokenName || contractOwner) && (
            <div className="space-y-2 text-sm">
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-semibold">合约地址:</span> {ERC20_ADDRESS}
              </p>
              {tokenName && (
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">代币名称:</span> {tokenName}
                </p>
              )}
              {tokenSymbol && (
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">代币符号:</span> {tokenSymbol}
                </p>
              )}
              {contractOwner && (
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">合约发行方:</span>{" "}
                  {contractOwner}
                </p>
              )}
              {totalSupply && (
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">总供应量:</span> {totalSupply}{" "}
                  {tokenSymbol}
                </p>
              )}
              {cap && (
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">发行上限:</span> {cap}{" "}
                  {tokenSymbol}
                </p>
              )}
              {balance && account && (
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">当前账户余额:</span> {balance}{" "}
                  {tokenSymbol}
                </p>
              )}
            </div>
          )}
        </div>

        {/* 3. Mint 代币 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
            3. Mint 代币
          </h2>

          {/* 权限提示 */}
          {contractOwner && account && (
            <div
              className={`mb-4 p-4 rounded-lg ${
                contractOwner.toLowerCase() === account.toLowerCase()
                  ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                  : "bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800"
              }`}
            >
              <p className="text-sm font-semibold mb-1">
                {contractOwner.toLowerCase() === account.toLowerCase()
                  ? "✅ 你是合约 Owner，可以 Mint"
                  : "⚠️ 权限不足"}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {contractOwner.toLowerCase() === account.toLowerCase()
                  ? "你的账户拥有 mint 权限"
                  : `只有 Owner (${contractOwner.slice(
                      0,
                      10
                    )}...) 才能 mint 代币`}
              </p>
            </div>
          )}

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Mint 数量 (最多 10000)"
              value={mintAmount}
              onChange={(e) => setMintAmount(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <button
              onClick={handleMintToken}
              disabled={loading}
              className="w-full px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:bg-gray-400"
            >
              {loading ? "处理中..." : "Mint 代币"}
            </button>
          </div>
        </div>

        {/* 4. 查询余额 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
            4. 查询代币余额
          </h2>
          <button
            onClick={handleQueryBalance}
            disabled={loading}
            className="w-full px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-gray-400 mb-4"
          >
            {loading ? "查询中..." : "查询余额"}
          </button>

          {balance && (
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 text-center">
                {balance} {tokenSymbol || "Token"}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-2">
                当前账户余额
              </p>
            </div>
          )}
        </div>

        {/* 右上角通知 */}
        {showNotification && message && (
          <div
            className={`fixed top-4 right-4 max-w-md w-full sm:w-96 rounded-lg shadow-2xl p-4 z-50 animate-slide-in-right border-l-4 ${
              message.includes("❌")
                ? "bg-red-50 dark:bg-red-900/90 border-red-500"
                : message.includes("✅")
                ? "bg-green-50 dark:bg-green-900/90 border-green-500"
                : message.includes("⚠️")
                ? "bg-yellow-50 dark:bg-yellow-900/90 border-yellow-500"
                : "bg-blue-50 dark:bg-blue-900/90 border-blue-500"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 mr-2">
                <div className="flex items-center mb-1">
                  <span className="text-2xl mr-2">
                    {message.includes("❌")
                      ? "❌"
                      : message.includes("✅")
                      ? "✅"
                      : message.includes("⚠️")
                      ? "⚠️"
                      : "ℹ️"}
                  </span>
                  <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                    {message.includes("❌")
                      ? "操作失败"
                      : message.includes("✅")
                      ? "操作成功"
                      : message.includes("⚠️")
                      ? "警告"
                      : "提示"}
                  </h3>
                </div>
                <p className="text-xs text-gray-700 dark:text-gray-300 break-all whitespace-pre-wrap ml-8">
                  {message}
                </p>
              </div>
              <button
                onClick={() => {
                  setShowNotification(false);
                  setMessage("");
                }}
                className="shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
