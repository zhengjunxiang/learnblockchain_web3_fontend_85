'use client'
import { useReducer } from 'react';

interface State {
  count: number;
}

interface Action {
  type: 'increment' | 'decrement';
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'increment': 
      return { count: state.count + 1 };
    case 'decrement': 
      return { count: state.count - 1 };
    default: 
      return state;
  }
}

export default function UseReducerDemo() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div className="text-center p-10 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-6">useReducer 演示</h2>
      <p className="text-2xl my-5">计数: {state.count}</p>
      <button 
        onClick={() => dispatch({ type: 'increment' })}
        className="mx-2 px-5 py-2 text-base bg-blue-600 text-white border-none rounded cursor-pointer hover:bg-blue-700 transition-colors"
      >
        +1
      </button>
      <button 
        onClick={() => dispatch({ type: 'decrement' })}
        className="mx-2 px-5 py-2 text-base bg-red-500 text-white border-none rounded cursor-pointer hover:bg-red-600 transition-colors"
      >
        -1
      </button>
    </div>
  );
}
