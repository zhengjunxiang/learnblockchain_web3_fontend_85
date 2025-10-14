'use client'
import { useState, useLayoutEffect, useRef } from 'react';

export default function UseLayoutEffectDemo() {
  const [width, setWidth] = useState<number>(0);
  const divRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (divRef.current) {
      setWidth(divRef.current.offsetWidth);
    }
  });

  return (
    <div className="text-center p-10 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">useLayoutEffect 演示</h2>
      <div 
        ref={divRef} 
        className="w-80 h-24 bg-blue-200 p-5 mx-auto my-5 rounded-lg flex items-center justify-center text-lg font-bold"
      >
        这个div的宽度是: {width}px
      </div>
      <p className="text-base text-gray-600 mt-5">useLayoutEffect在DOM更新后同步执行</p>
    </div>
  );
}
