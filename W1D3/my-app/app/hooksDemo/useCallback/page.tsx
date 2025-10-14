'use client'
import { useState, useCallback, memo } from 'react';

interface ChildProps {
  onClick: () => void;
  label: string;
}

const Child = memo(({ onClick, label }: ChildProps) => {
  console.log(`${label} 子组件渲染`);
  return (
    <button 
      onClick={onClick}
      className="mx-2 px-4 py-2 text-sm bg-blue-600 text-white border-none rounded cursor-pointer hover:bg-blue-700 transition-colors"
    >
      {label}
    </button>
  );
});

export default function UseCallbackDemo() {
  const [count, setCount] = useState<number>(0);
  const [text, setText] = useState<string>('');

  const handleIncrement = useCallback(() => {
    setCount(prev => prev + 1);
  }, []);

  const handleTextChange = () => {
    setText(text + '!');
  };

  return (
    <div className="text-center p-10 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-6">useCallback 演示</h2>
      <p className="text-xl my-4">计数: {count}</p>
      <p className="text-xl my-4">文本: {text}</p>
      <div className="my-5">
        <Child onClick={handleIncrement} label="使用useCallback" />
        <Child onClick={handleTextChange} label="普通函数" />
      </div>
      <input 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
        placeholder="输入文本试试"
        className="my-5 p-2 text-base border border-gray-300 rounded w-48 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <p className="text-sm text-gray-600">控制台查看渲染次数</p>
    </div>
  );
}
