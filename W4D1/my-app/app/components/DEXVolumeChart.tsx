'use client';

import ReactECharts from 'echarts-for-react';

export default function DEXVolumeChart() {
  // 模拟不同 DEX 的交易量数据（单位：百万美元）
  const dexNames = ['Uniswap', 'PancakeSwap', 'Curve', 'SushiSwap', 'Balancer', 'dYdX'];
  const volumeData = [1850, 1420, 980, 750, 520, 380];

  const option = {
    title: {
      text: '不同 DEX 交易量比较',
      left: 'center',
      textStyle: {
        fontSize: 18,
        fontWeight: 'bold',
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: '{b}<br/>交易量: ${c}M'
    },
    xAxis: {
      type: 'category',
      data: dexNames,
      axisLabel: {
        interval: 0,
        rotate: 30
      }
    },
    yAxis: {
      type: 'value',
      name: '24h 交易量 (百万美元)',
      axisLabel: {
        formatter: '${value}M'
      }
    },
    series: [
      {
        name: '交易量',
        type: 'bar',
        data: volumeData,
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: '#91cc75' },
              { offset: 1, color: '#5ab372' }
            ]
          },
          borderRadius: [8, 8, 0, 0]
        },
        emphasis: {
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: '#73c0de' },
                { offset: 1, color: '#3ba0bd' }
              ]
            }
          }
        },
        label: {
          show: true,
          position: 'top',
          formatter: '${c}M',
          fontSize: 12
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

