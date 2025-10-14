'use client'
import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext<string>('light');

function Child() {
  const theme = useContext(ThemeContext);
  return <p className="text-xl my-5">当前主题: {theme}</p>;
}

export default function UseContextDemo() {
  const [theme, setTheme] = useState<string>('light');

  return (
    <ThemeContext.Provider value={theme}>
      <div className="text-center p-10 max-w-lg mx-auto">
        <h2 className="text-2xl font-bold mb-6">useContext 演示</h2>
        <Child />
        <button 
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          className={`my-5 px-5 py-2 text-base border-none rounded cursor-pointer transition-colors ${
            theme === 'light' 
              ? 'bg-blue-600 text-white hover:bg-blue-700' 
              : 'bg-gray-200 text-black hover:bg-gray-300'
          }`}
        >
          切换主题
        </button>
      </div>
    </ThemeContext.Provider>
  );
}
