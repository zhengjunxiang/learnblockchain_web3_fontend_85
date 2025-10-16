import { useState } from "react";
import { proofOfWork, type POWResult } from "./utils/pow";
import "./App.css";

function App() {
  const [nickname, setNickname] = useState("zhengjx");
  const [result4, setResult4] = useState<POWResult | null>(null);
  const [result5, setResult5] = useState<POWResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleCalculate4Zeros = async () => {
    setIsCalculating(true);
    setResult4(null);
    // 使用 setTimeout 让 UI 有时间更新
    setTimeout(() => {
      const result = proofOfWork(nickname, 4);
      setResult4(result);
      setIsCalculating(false);
    }, 100);
  };

  const handleCalculate5Zeros = async () => {
    setIsCalculating(true);
    setResult5(null);
    setTimeout(() => {
      const result = proofOfWork(nickname, 5);
      setResult5(result);
      setIsCalculating(false);
    }, 100);
  };

  const formatTime = (ms: number) => {
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(2)}s`;
  };

  return (
    <div className="max-w-[1200px] mx-auto min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full flex flex-col items-center">
          <div className="max-w-6xl w-full">
          {/* 主标题区域 */}
          <div className="text-center mb-12 animate-fadeIn">
            <div className="inline-block mb-6">
              <div className="flex items-center justify-center gap-4 mb-4">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black">
                  工作量证明
                </h1>
              </div>
              <p className="text-cyan-300 text-xl sm:text-2xl font-semibold tracking-wide">
                Proof of Work · 区块链挖矿演示
              </p>
            </div>
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mx-auto rounded-full"></div>
          </div>

          {/* 输入区域 */}
          <div className="mb-10 animate-fadeIn flex justify-center" style={{ animationDelay: '0.2s' }}>
            <div className="w-full max-w-2xl">
              <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl glow">
                <label htmlFor="nickname" className="block mb-4 text-xl font-bold text-cyan-300 text-center">
                  🔑 输入你的矿工昵称
                </label>
                <div className="relative max-w-md mx-auto group">
                  <input
                    id="nickname"
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    placeholder="请输入昵称..."
                    className="w-full px-6 py-4 text-xl text-white bg-white/10 border-2 border-cyan-500/50 rounded-2xl text-center focus:outline-none focus:border-cyan-400 focus:bg-white/15 transition-all duration-300 placeholder-gray-400 font-semibold"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/0 via-cyan-500/30 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none blur-xl"></div>
                </div>
              </div>
            </div>
          </div>

          {/* 按钮区域 */}
          <div className="flex justify-center mb-12 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
            <div className="w-full max-w-4xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <button
              onClick={handleCalculate4Zeros}
              disabled={isCalculating || !nickname.trim()}
              className="group relative px-8 py-6 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-emerald-500/50 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
              </div>
              <span className="relative z-10 flex items-center justify-center gap-3">
                {isCalculating ? (
                  <>
                    <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>挖矿中...</span>
                  </>
                ) : (
                  <>
                    <span className="text-3xl">🎯</span>
                    <div className="text-left">
                      <div className="text-xl font-black">4 个零挑战</div>
                      <div className="text-sm font-normal opacity-90">难度：简单</div>
                    </div>
                  </>
                )}
              </span>
            </button>

            <button
              onClick={handleCalculate5Zeros}
              disabled={isCalculating || !nickname.trim()}
              className="group relative px-8 py-6 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
              </div>
              <span className="relative z-10 flex items-center justify-center gap-3">
                {isCalculating ? (
                  <>
                    <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>挖矿中...</span>
                  </>
                ) : (
                  <>
                    <span className="text-3xl">⚡</span>
                    <div className="text-left">
                      <div className="text-xl font-black">5 个零挑战</div>
                      <div className="text-sm font-normal opacity-90">难度：困难</div>
                    </div>
                  </>
                )}
              </span>
            </button>
              </div>
            </div>
          </div>

          {/* 结果展示区域 */}
          <div className="space-y-6 flex flex-col items-center">
            <div className="w-full max-w-5xl space-y-6">
            {result4 && (
              <div className="animate-fadeIn">
                <div className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-emerald-500/30 shadow-2xl glow-green">
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <span className="text-4xl">🎉</span>
                    <h2 className="text-3xl font-black text-emerald-300">
                      4 零挖矿成功！
                    </h2>
                    <span className="text-4xl">🎉</span>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* 左侧：统计数据 */}
                    <div className="space-y-4">
                      <div className="bg-black/20 rounded-2xl p-5 border border-emerald-500/20 hover:border-emerald-500/40 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center text-2xl shadow-lg">
                            ⏱️
                          </div>
                          <div className="flex-1">
                            <p className="text-emerald-200 text-sm font-semibold mb-1">挖矿耗时</p>
                            <p className="text-3xl font-black text-white">{formatTime(result4.timeSpent)}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-black/20 rounded-2xl p-5 border border-emerald-500/20 hover:border-emerald-500/40 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center text-2xl shadow-lg">
                            🔄
                          </div>
                          <div className="flex-1">
                            <p className="text-cyan-200 text-sm font-semibold mb-1">尝试次数</p>
                            <p className="text-3xl font-black text-white">{result4.attempts.toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-black/20 rounded-2xl p-5 border border-emerald-500/20 hover:border-emerald-500/40 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center text-2xl shadow-lg">
                            🎲
                          </div>
                          <div className="flex-1">
                            <p className="text-purple-200 text-sm font-semibold mb-1">Nonce 值</p>
                            <p className="text-3xl font-black text-white">{result4.nonce.toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* 右侧：哈希信息 */}
                    <div className="space-y-4">
                      <div className="bg-black/20 rounded-2xl p-5 border border-emerald-500/20">
                        <p className="text-emerald-200 text-sm font-bold mb-3 flex items-center gap-2">
                          <span>📝</span> 原始内容
                        </p>
                        <p className="text-lg font-mono bg-black/40 px-4 py-3 rounded-lg text-cyan-300 break-all border border-cyan-500/30">
                          {result4.content}
                        </p>
                      </div>
                      
                      <div className="bg-black/20 rounded-2xl p-5 border border-emerald-500/20">
                        <p className="text-emerald-200 text-sm font-bold mb-3 flex items-center gap-2">
                          <span>🔐</span> SHA256 哈希值
                        </p>
                        <code className="text-sm font-mono bg-gradient-to-r from-emerald-900/50 to-cyan-900/50 px-4 py-3 rounded-lg break-all block border border-emerald-500/50 text-emerald-300 leading-relaxed">
                          {result4.hash}
                        </code>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {result5 && (
              <div className="animate-fadeIn">
                <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-purple-500/30 shadow-2xl glow-purple">
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <span className="text-4xl">🏆</span>
                    <h2 className="text-3xl font-black text-purple-300">
                      5 零挖矿成功！
                    </h2>
                    <span className="text-4xl">🏆</span>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* 左侧：统计数据 */}
                    <div className="space-y-4">
                      <div className="bg-black/20 rounded-2xl p-5 border border-purple-500/20 hover:border-purple-500/40 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center text-2xl shadow-lg">
                            ⏱️
                          </div>
                          <div className="flex-1">
                            <p className="text-purple-200 text-sm font-semibold mb-1">挖矿耗时</p>
                            <p className="text-3xl font-black text-white">{formatTime(result5.timeSpent)}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-black/20 rounded-2xl p-5 border border-purple-500/20 hover:border-purple-500/40 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 bg-gradient-to-br from-rose-400 to-red-500 rounded-xl flex items-center justify-center text-2xl shadow-lg">
                            🔄
                          </div>
                          <div className="flex-1">
                            <p className="text-rose-200 text-sm font-semibold mb-1">尝试次数</p>
                            <p className="text-3xl font-black text-white">{result5.attempts.toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-black/20 rounded-2xl p-5 border border-purple-500/20 hover:border-purple-500/40 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 bg-gradient-to-br from-fuchsia-400 to-purple-500 rounded-xl flex items-center justify-center text-2xl shadow-lg">
                            🎲
                          </div>
                          <div className="flex-1">
                            <p className="text-fuchsia-200 text-sm font-semibold mb-1">Nonce 值</p>
                            <p className="text-3xl font-black text-white">{result5.nonce.toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* 右侧：哈希信息 */}
                    <div className="space-y-4">
                      <div className="bg-black/20 rounded-2xl p-5 border border-purple-500/20">
                        <p className="text-purple-200 text-sm font-bold mb-3 flex items-center gap-2">
                          <span>📝</span> 原始内容
                        </p>
                        <p className="text-lg font-mono bg-black/40 px-4 py-3 rounded-lg text-pink-300 break-all border border-pink-500/30">
                          {result5.content}
                        </p>
                      </div>
                      
                      <div className="bg-black/20 rounded-2xl p-5 border border-purple-500/20">
                        <p className="text-purple-200 text-sm font-bold mb-3 flex items-center gap-2">
                          <span>🔐</span> SHA256 哈希值
                        </p>
                        <code className="text-sm font-mono bg-gradient-to-r from-purple-900/50 to-pink-900/50 px-4 py-3 rounded-lg break-all block border border-purple-500/50 text-purple-300 leading-relaxed">
                          {result5.hash}
                        </code>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            </div>
          </div>

          {/* 底部信息 */}
          <div className="mt-12 animate-fadeIn flex justify-center" style={{ animationDelay: '0.6s' }}>
            <div className="w-full max-w-5xl">
              <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-3 mb-4">
                  <span className="text-3xl">💡</span>
                  <h3 className="text-2xl font-black text-cyan-300">工作量证明原理</h3>
                </div>
              </div>
              
              <div className="max-w-4xl mx-auto">
                <div className="bg-black/20 rounded-2xl p-6 mb-6 border border-cyan-500/20">
                  <p className="text-gray-300 leading-relaxed text-lg text-center">
                    工作量证明（PoW）是区块链的核心机制，通过计算满足特定条件的哈希值来证明工作量。
                    哈希值开头的零越多，计算难度呈指数级增长，所需时间也大幅增加。
                  </p>
                </div>
                
                <div className="flex flex-wrap items-center justify-center gap-3 text-base sm:text-lg font-bold">
                  <span className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-5 py-2 rounded-xl shadow-lg">
                    昵称
                  </span>
                  <span className="text-cyan-400 text-2xl">+</span>
                  <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-5 py-2 rounded-xl shadow-lg">
                    Nonce
                  </span>
                  <span className="text-purple-400 text-2xl">→</span>
                  <span className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-5 py-2 rounded-xl shadow-lg">
                    SHA256
                  </span>
                  <span className="text-pink-400 text-2xl">→</span>
                  <span className="bg-gradient-to-r from-pink-500 to-rose-600 text-white px-5 py-2 rounded-xl shadow-lg">
                    验证结果
                  </span>
                </div>
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
