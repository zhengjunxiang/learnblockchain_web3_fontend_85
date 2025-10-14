'use client'
import { useState, useMemo } from 'react';

export default function UseMemoDemo() {
  const [count, setCount] = useState<number>(0);
  const [text, setText] = useState<string>('');

  const expensiveValue = useMemo(() => {
    console.log('计算昂贵的值');
    return count * 100;
  }, [count]);

  return (
    <div className="text-center p-10 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-6">useMemo 演示</h2>
      <p className="text-xl my-4">计数: {count}</p>
      <p className="text-xl my-4">昂贵计算结果: {expensiveValue}</p>
      <button 
        onClick={() => setCount(count + 1)}
        className="mx-2 px-5 py-2 text-base bg-blue-600 text-white border-none rounded cursor-pointer hover:bg-blue-700 transition-colors"
      >
        +1
      </button>
      <br />
      <input 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
        placeholder="输入文本不会重新计算"
        className="my-5 p-2 text-base border border-gray-300 rounded w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <p className="text-lg my-2">文本: {text}</p>
    </div>
  );
}
