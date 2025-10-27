'use client';

import ReactECharts from 'echarts-for-react';

export default function TVLChart() {
  // 模拟 DeFi 借贷业务的 TVL 数据（单位：百万美元）
  const dates = [
    '2024-01', '2024-02', '2024-03', '2024-04', '2024-05', '2024-06',
    '2024-07', '2024-08', '2024-09', '2024-10', '2024-11', '2024-12'
  ];
  
  const tvlData = [
    4500, 4800, 5200, 5600, 5300, 5800,
    6200, 6500, 6800, 7200, 7500, 7800
  ];

  const option = {
    title: {
      text: 'DeFi 借贷业务 TVL 变化',
      left: 'center',
      textStyle: {
        fontSize: 18,
        fontWeight: 'bold',
      }
    },
    tooltip: {
      trigger: 'axis',
      formatter: '{b}<br/>TVL: ${c}M'
    },
    xAxis: {
      type: 'category',
      data: dates,
      axisLabel: {
        rotate: 45
      }
    },
    yAxis: {
      type: 'value',
      name: 'TVL (百万美元)',
      axisLabel: {
        formatter: '${value}M'
      }
    },
    series: [
      {
        name: 'TVL',
        type: 'line',
        data: tvlData,
        smooth: true,
        lineStyle: {
          width: 3,
          color: '#5470c6'
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(84, 112, 198, 0.3)' },
              { offset: 1, color: 'rgba(84, 112, 198, 0.05)' }
            ]
          }
        },
        itemStyle: {
          color: '#5470c6'
        },
        emphasis: {
          itemStyle: {
            color: '#5470c6',
            borderColor: '#fff',
            borderWidth: 2
          }
        }
      }
    ],
    grid: {
      left: '10%',
      right: '10%',
      bottom: '15%',
      top: '15%'
    }
  };

  return (
    <div className="w-full bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-6">
      <ReactECharts option={option} style={{ height: '400px' }} />
    </div>
  );
}

