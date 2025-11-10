import Link from "next/link";


export default function Home() {

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <Link className="text-blue-500 hover:text-blue-600 " href="/viem">Viem</Link>
        <Link className="text-blue-500 hover:text-blue-600 ml-4" href="/wagmi">Wagmi</Link>
        <Link className="text-blue-500 hover:text-blue-600 ml-4" href="/connectWallet">Connect Wallet</Link>
      </div>
    </div>
  );
}
