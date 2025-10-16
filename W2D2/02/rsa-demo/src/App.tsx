import { useState } from "react";
import { proofOfWork, type POWResult } from "./utils/pow";
import { generateKeyPair, signData, verifySignature, type KeyPair } from "./utils/rsa";
import "./App.css";

function App() {
  const [nickname, setNickname] = useState("zhengjx");
  const [keyPair, setKeyPair] = useState<KeyPair | null>(null);
  const [powResult, setPowResult] = useState<POWResult | null>(null);
  const [signature, setSignature] = useState<string>("");
  const [verificationResult, setVerificationResult] = useState<boolean | null>(null);
  const [isGeneratingKeys, setIsGeneratingKeys] = useState(false);
  const [isCalculatingPOW, setIsCalculatingPOW] = useState(false);
  const [isSigning, setIsSigning] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  // 生成密钥对
  const handleGenerateKeys = async () => {
    setIsGeneratingKeys(true);
    try {
      const keys = await generateKeyPair();
      setKeyPair(keys);
      // 重置其他状态
      setPowResult(null);
      setSignature("");
      setVerificationResult(null);
    } catch (error) {
      console.error("生成密钥失败:", error);
    } finally {
      setIsGeneratingKeys(false);
    }
  };

  // 计算 POW（4个0）
  const handleCalculatePOW = () => {
    if (!nickname.trim()) return;
    
    setIsCalculatingPOW(true);
    setPowResult(null);
    setSignature("");
    setVerificationResult(null);
    
    setTimeout(() => {
      const result = proofOfWork(nickname, 4);
      setPowResult(result);
      setIsCalculatingPOW(false);
    }, 100);
  };

  // 使用私钥签名
  const handleSign = async () => {
    if (!keyPair || !powResult) return;
    
    setIsSigning(true);
    try {
      const sig = await signData(powResult.content, keyPair.cryptoKeyPair.privateKey);
      setSignature(sig);
      setVerificationResult(null);
    } catch (error) {
      console.error("签名失败:", error);
    } finally {
      setIsSigning(false);
    }
  };

  // 使用公钥验证
  const handleVerify = async () => {
    if (!keyPair || !powResult || !signature) return;
    
    setIsVerifying(true);
    try {
      const isValid = await verifySignature(powResult.content, signature, keyPair.cryptoKeyPair.publicKey);
      setVerificationResult(isValid);
    } catch (error) {
      console.error("验证失败:", error);
      setVerificationResult(false);
    } finally {
      setIsVerifying(false);
    }
  };

  const formatTime = (ms: number) => {
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(2)}s`;
  };

  return (
    <div className="max-w-[1200px] mx-auto min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full flex flex-col items-center">
          <div className="max-w-6xl w-full">
            {/* 标题 */}
            <div className="text-center mb-12 animate-fadeIn">
              <div className="inline-block mb-6">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black">
                    RSA 非对称加密
                  </h1>
                </div>
                <p className="text-indigo-300 text-xl sm:text-2xl font-semibold tracking-wide">
                  POW + RSA 数字签名演示
                </p>
              </div>
              <div className="w-32 h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent mx-auto rounded-full"></div>
            </div>

            {/* 步骤流程 */}
            <div className="mb-10 flex justify-center animate-fadeIn" style={{ animationDelay: '0.1s' }}>
              <div className="w-full max-w-4xl">
                <div className="flex flex-wrap items-center justify-center gap-3 text-sm sm:text-base font-bold">
                  <span className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-xl shadow-lg">
                    1. 生成密钥
                  </span>
                  <span className="text-indigo-400 text-xl">→</span>
                  <span className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-xl shadow-lg">
                    2. POW 挖矿
                  </span>
                  <span className="text-purple-400 text-xl">→</span>
                  <span className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-2 rounded-xl shadow-lg">
                    3. 私钥签名
                  </span>
                  <span className="text-pink-400 text-xl">→</span>
                  <span className="bg-gradient-to-r from-pink-500 to-rose-600 text-white px-4 py-2 rounded-xl shadow-lg">
                    4. 公钥验证
                  </span>
                </div>
              </div>
            </div>

            {/* 输入区域 */}
            <div className="mb-10 animate-fadeIn flex justify-center" style={{ animationDelay: '0.2s' }}>
              <div className="w-full max-w-2xl">
                <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
                  <label htmlFor="nickname" className="block mb-4 text-xl font-bold text-indigo-300 text-center">
                    🆔 输入你的昵称
                  </label>
                  <input
                    id="nickname"
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    placeholder="请输入昵称..."
                    className="w-full px-6 py-4 text-xl text-white bg-white/10 border-2 border-indigo-500/50 rounded-2xl text-center focus:outline-none focus:border-indigo-400 focus:bg-white/15 transition-all duration-300 placeholder-gray-400 font-semibold"
                  />
                </div>
              </div>
            </div>

            {/* 操作按钮区 */}
            <div className="mb-12 animate-fadeIn flex justify-center" style={{ animationDelay: '0.3s' }}>
              <div className="w-full max-w-4xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <button
                    onClick={handleGenerateKeys}
                    disabled={isGeneratingKeys}
                    className="group relative px-6 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    <span className="flex flex-col items-center gap-2">
                      <span className="text-2xl">🔑</span>
                      <span>{isGeneratingKeys ? "生成中..." : "生成密钥对"}</span>
                    </span>
                  </button>

                  <button
                    onClick={handleCalculatePOW}
                    disabled={isCalculatingPOW || !nickname.trim()}
                    className="group relative px-6 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    <span className="flex flex-col items-center gap-2">
                      <span className="text-2xl">⛏️</span>
                      <span>{isCalculatingPOW ? "挖矿中..." : "POW 挖矿"}</span>
                    </span>
                  </button>

                  <button
                    onClick={handleSign}
                    disabled={isSigning || !keyPair || !powResult}
                    className="group relative px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    <span className="flex flex-col items-center gap-2">
                      <span className="text-2xl">✍️</span>
                      <span>{isSigning ? "签名中..." : "私钥签名"}</span>
                    </span>
                  </button>

                  <button
                    onClick={handleVerify}
                    disabled={isVerifying || !keyPair || !powResult || !signature}
                    className="group relative px-6 py-4 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    <span className="flex flex-col items-center gap-2">
                      <span className="text-2xl">✅</span>
                      <span>{isVerifying ? "验证中..." : "公钥验证"}</span>
                    </span>
        </button>
                </div>
              </div>
            </div>

            {/* 结果展示区 */}
            <div className="space-y-6 flex flex-col items-center">
              <div className="w-full max-w-5xl space-y-6">
                {/* 密钥对显示 */}
                {keyPair && (
                  <div className="animate-fadeIn">
                    <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-blue-500/30 shadow-2xl">
                      <div className="flex items-center justify-center gap-3 mb-6">
                        <span className="text-3xl">🔐</span>
                        <h2 className="text-2xl font-black text-blue-300">RSA 密钥对</h2>
                      </div>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-black/20 rounded-2xl p-5 border border-blue-500/20">
                          <p className="text-blue-200 text-sm font-bold mb-3 flex items-center gap-2">
                            <span>🔓</span> 公钥 (Public Key)
                          </p>
                          <pre className="text-xs font-mono bg-black/40 px-4 py-3 rounded-lg text-blue-300 break-all border border-blue-500/30 overflow-x-auto max-h-40 overflow-y-auto">
                            {keyPair.publicKey}
                          </pre>
                        </div>
                        
                        <div className="bg-black/20 rounded-2xl p-5 border border-indigo-500/20">
                          <p className="text-indigo-200 text-sm font-bold mb-3 flex items-center gap-2">
                            <span>🔒</span> 私钥 (Private Key)
                          </p>
                          <pre className="text-xs font-mono bg-black/40 px-4 py-3 rounded-lg text-indigo-300 break-all border border-indigo-500/30 overflow-x-auto max-h-40 overflow-y-auto">
                            {keyPair.privateKey}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* POW 结果显示 */}
                {powResult && (
                  <div className="animate-fadeIn">
                    <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-indigo-500/30 shadow-2xl">
                      <div className="flex items-center justify-center gap-3 mb-6">
                        <span className="text-3xl">⛏️</span>
                        <h2 className="text-2xl font-black text-indigo-300">POW 挖矿结果</h2>
                      </div>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                        <div className="bg-black/20 rounded-xl p-4 border border-indigo-500/20">
                          <p className="text-indigo-200 text-xs font-semibold mb-1">耗时</p>
                          <p className="text-xl font-black text-white">{formatTime(powResult.timeSpent)}</p>
                        </div>
                        <div className="bg-black/20 rounded-xl p-4 border border-indigo-500/20">
                          <p className="text-purple-200 text-xs font-semibold mb-1">尝试次数</p>
                          <p className="text-xl font-black text-white">{powResult.attempts.toLocaleString()}</p>
                        </div>
                        <div className="bg-black/20 rounded-xl p-4 border border-indigo-500/20">
                          <p className="text-pink-200 text-xs font-semibold mb-1">Nonce</p>
                          <p className="text-xl font-black text-white">{powResult.nonce}</p>
                        </div>
                        <div className="bg-black/20 rounded-xl p-4 border border-indigo-500/20">
                          <p className="text-blue-200 text-xs font-semibold mb-1">内容</p>
                          <p className="text-lg font-mono text-white break-all">{powResult.content}</p>
                        </div>
                      </div>
                      
                      <div className="bg-black/20 rounded-2xl p-5 border border-indigo-500/20">
                        <p className="text-indigo-200 text-sm font-bold mb-3 flex items-center gap-2">
                          <span>🔐</span> SHA256 哈希值
                        </p>
                        <code className="text-sm font-mono bg-gradient-to-r from-indigo-900/50 to-purple-900/50 px-4 py-3 rounded-lg break-all block border border-indigo-500/50 text-indigo-300 leading-relaxed">
                          {powResult.hash}
                        </code>
                      </div>
                    </div>
                  </div>
                )}

                {/* 签名显示 */}
                {signature && (
                  <div className="animate-fadeIn">
                    <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-purple-500/30 shadow-2xl">
                      <div className="flex items-center justify-center gap-3 mb-6">
                        <span className="text-3xl">✍️</span>
                        <h2 className="text-2xl font-black text-purple-300">数字签名</h2>
                      </div>
                      
                      <div className="bg-black/20 rounded-2xl p-5 border border-purple-500/20">
                        <p className="text-purple-200 text-sm font-bold mb-3 flex items-center gap-2">
                          <span>📝</span> 签名数据 (Base64)
                        </p>
                        <code className="text-sm font-mono bg-gradient-to-r from-purple-900/50 to-pink-900/50 px-4 py-3 rounded-lg break-all block border border-purple-500/50 text-purple-300 leading-relaxed">
                          {signature}
                        </code>
                      </div>
                    </div>
                  </div>
                )}

                {/* 验证结果显示 */}
                {verificationResult !== null && (
                  <div className="animate-fadeIn">
                    <div className={`bg-gradient-to-br ${verificationResult ? 'from-green-500/10 to-emerald-500/10 border-green-500/30' : 'from-red-500/10 to-rose-500/10 border-red-500/30'} backdrop-blur-xl rounded-3xl p-6 sm:p-8 border shadow-2xl`}>
                      <div className="flex items-center justify-center gap-3">
                        <span className="text-5xl">{verificationResult ? '✅' : '❌'}</span>
                        <div className="text-center">
                          <h2 className={`text-3xl font-black ${verificationResult ? 'text-green-300' : 'text-red-300'} mb-2`}>
                            {verificationResult ? '验证成功！' : '验证失败！'}
                          </h2>
                          <p className={`text-lg ${verificationResult ? 'text-green-200' : 'text-red-200'}`}>
                            {verificationResult ? '签名有效，数据未被篡改' : '签名无效，数据可能被篡改'}
                          </p>
                        </div>
                        <span className="text-5xl">{verificationResult ? '🎉' : '⚠️'}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 底部说明 */}
            <div className="mt-12 animate-fadeIn flex justify-center" style={{ animationDelay: '0.6s' }}>
              <div className="w-full max-w-5xl">
                <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center gap-3 mb-4">
                      <span className="text-3xl">💡</span>
                      <h3 className="text-2xl font-black text-indigo-300">RSA 数字签名原理</h3>
                    </div>
                  </div>
                  
                  <div className="bg-black/20 rounded-2xl p-6 border border-indigo-500/20">
                    <p className="text-gray-300 leading-relaxed text-lg text-center mb-4">
                      RSA 是一种非对称加密算法，使用公钥和私钥实现数字签名和验证。
                      私钥用于签名，公钥用于验证，确保数据的完整性和来源的真实性。
                    </p>
                    <p className="text-gray-400 leading-relaxed text-center">
                      本演示结合了 POW 工作量证明和 RSA 数字签名，展示了区块链中常用的两种核心技术。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
