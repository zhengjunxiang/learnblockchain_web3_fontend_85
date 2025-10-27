import TVLChart from './components/TVLChart';
import DEXVolumeChart from './components/DEXVolumeChart';
import HoldersPieChart from './components/HoldersPieChart';
import KlineChart from './components/KlineChart';

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-black py-8 px-4 sm:px-6 lg:px-8">
      <main className="max-w-7xl mx-auto">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
            Web3 数据可视化仪表板
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            基于 ECharts 的 DeFi 数据展示
          </p>
        </div>

        {/* 图表网格布局 */}
        <div className="space-y-8">
          {/* 第一行：折线图和柱状图 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <TVLChart />
            <DEXVolumeChart />
          </div>

          {/* 第二行：饼图 */}
          <div className="grid grid-cols-1">
            <HoldersPieChart />
          </div>

          {/* 第三行：K线图 */}
          <div className="grid grid-cols-1">
            <KlineChart />
          </div>
        </div>

        {/* 页脚信息 */}
        <div className="mt-12 text-center">
          <p className="text-sm text-zinc-500 dark:text-zinc-500">
            数据仅供演示使用 | 使用 Next.js + ECharts 构建
          </p>
        </div>
      </main>
    </div>
  );
}
