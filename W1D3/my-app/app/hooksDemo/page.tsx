export default function HooksDemo() {
  return (
    <div className="text-center p-10 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">React Hooks 演示</h1>
      <ul className="list-none p-0">
        <li className="my-4"><a href="/hooksDemo/useState" className="no-underline text-blue-600 text-lg hover:text-blue-800 transition-colors">useState</a></li>
        <li className="my-4"><a href="/hooksDemo/useReducer" className="no-underline text-blue-600 text-lg hover:text-blue-800 transition-colors">useReducer</a></li>
        <li className="my-4"><a href="/hooksDemo/useContext" className="no-underline text-blue-600 text-lg hover:text-blue-800 transition-colors">useContext</a></li>
        <li className="my-4"><a href="/hooksDemo/useEffect" className="no-underline text-blue-600 text-lg hover:text-blue-800 transition-colors">useEffect</a></li>
        <li className="my-4"><a href="/hooksDemo/useMemo" className="no-underline text-blue-600 text-lg hover:text-blue-800 transition-colors">useMemo</a></li>
        <li className="my-4"><a href="/hooksDemo/useCallback" className="no-underline text-blue-600 text-lg hover:text-blue-800 transition-colors">useCallback</a></li>
        <li className="my-4"><a href="/hooksDemo/useRef" className="no-underline text-blue-600 text-lg hover:text-blue-800 transition-colors">useRef</a></li>
        <li className="my-4"><a href="/hooksDemo/useLayoutEffect" className="no-underline text-blue-600 text-lg hover:text-blue-800 transition-colors">useLayoutEffect</a></li>
      </ul>
    </div>
  );
}
