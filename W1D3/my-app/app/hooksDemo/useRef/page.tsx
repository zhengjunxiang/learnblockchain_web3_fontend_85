"use client";
import { useRef, useState } from "react";

export default function UseRefDemo() {
  const inputRef = useRef<HTMLInputElement>(null);
  const countRef = useRef<number>(0);
  const [render, setRender] = useState<number>(0);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const incrementRef = () => {
    countRef.current += 1;
    console.log("ref计数:", countRef.current);
  };

  return (
    <div className="text-center p-10 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-6">useRef 演示</h2>
      <div className="my-5">
        <input
          ref={inputRef}
          placeholder="点击按钮聚焦我"
          className="p-2 text-base border border-gray-300 rounded w-48 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        onClick={focusInput}
        className="mx-2 px-5 py-2 text-base bg-blue-600 text-white border-none rounded cursor-pointer hover:bg-blue-700 transition-colors"
      >
        聚焦输入框
      </button>
      <p className="text-lg my-5">
        ref计数 (不会触发重渲染): {countRef.current}
      </p>
      <button
        onClick={incrementRef}
        className="mx-2 px-5 py-2 text-base bg-red-500 text-white border-none rounded cursor-pointer hover:bg-red-600 transition-colors"
      >
        增加ref计数
      </button>
      <p className="text-lg my-5">渲染次数: {render}</p>
      <button
        onClick={() => setRender(render + 1)}
        className="mx-2 px-5 py-2 text-base bg-green-500 text-white border-none rounded cursor-pointer hover:bg-green-600 transition-colors"
      >
        重新渲染
      </button>
    </div>
  );
}
