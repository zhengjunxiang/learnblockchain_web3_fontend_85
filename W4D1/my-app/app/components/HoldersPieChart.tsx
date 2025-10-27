'use client';

import ReactECharts from 'echarts-for-react';

export default function HoldersPieChart() {
  // 模拟 ERC20 前10持仓地址的份额数据
  const holdersData = [
    { name: '0x1234...5678', value: 18.5 },
    { name: '0xabcd...ef12', value: 15.3 },
    { name: '0x9876...4321', value: 12.8 },
    { name: '0xdef0...9abc', value: 10.2 },
    { name: '0x5555...aaaa', value: 8.7 },
    { name: '0xbbbb...6666', value: 7.4 },
    { name: '0x7777...cccc', value: 6.1 },
    { name: '0xdddd...8888', value: 5.3 },
    { name: '0x3333...eeee', value: 4.9 },
    { name: '0xffff...2222', value: 3.8 },
    { name: '其他地址', value: 7.0 }
  ];

  const option = {
    title: {
      text: 'ERC20 代币前10持仓地址份额',
      left: 'center',
      textStyle: {
        fontSize: 18,
        fontWeight: 'bold',
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}% ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      top: 'middle',
      textStyle: {
        fontSize: 12
      }
    },
    series: [
      {
        name: '持仓份额',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['60%', '50%'],
        avoidLabelOverlap: true,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: true,
          formatter: '{b}\n{d}%',
          fontSize: 11
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 14,
            fontWeight: 'bold'
          },
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        data: holdersData
      }
    ]
  };

  return (
    <div className="w-full bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-6">
      <ReactECharts option={option} style={{ height: '500px' }} />
    </div>
  );
}

