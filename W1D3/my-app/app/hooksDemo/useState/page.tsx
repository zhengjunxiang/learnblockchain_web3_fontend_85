'use client'
import { useState } from 'react';

export default function UseStateDemo() {
  const [count, setCount] = useState<number>(0);

  return (
    <div className="text-center p-10 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-6">useState 演示</h2>
      <p className="text-2xl my-5">计数: {count}</p>
      <button
        onClick={() => setCount(count + 1)}
        className="mx-2 px-5 py-2 text-base bg-blue-600 text-white border-none rounded cursor-pointer hover:bg-blue-700 transition-colors"
      >
        +1
      </button>
      <button
        onClick={() => setCount(count - 1)}
        className="mx-2 px-5 py-2 text-base bg-red-500 text-white border-none rounded cursor-pointer hover:bg-red-600 transition-colors"
      >
        -1
      </button>
    </div>
  );
}
