'use client'
import { useState, useEffect } from 'react';

export default function UseEffectDemo() {
  const [count, setCount] = useState<number>(0);
  const [title, setTitle] = useState<string>('useEffect演示');

  useEffect(() => {
    document.title = `计数: ${count}`;
  }, [count]);

  useEffect(() => {
    console.log('组件挂载');
    return () => console.log('组件卸载');
  }, []);

  return (
    <div className="text-center p-10 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <p className="text-2xl my-5">计数: {count}</p>
      <button 
        onClick={() => setCount(count + 1)}
        className="mx-2 px-5 py-2 text-base bg-blue-600 text-white border-none rounded cursor-pointer hover:bg-blue-700 transition-colors"
      >
        +1
      </button>
      <p className="text-sm text-gray-600 mt-5">查看浏览器标题变化</p>
    </div>
  );
}
