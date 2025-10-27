'use client';

import ReactECharts from 'echarts-for-react';

export default function KlineChart() {
  // 模拟代币价格 K 线数据
  // 数据格式：[开盘价, 收盘价, 最低价, 最高价]
  const dates = [
    '2024-10-01', '2024-10-02', '2024-10-03', '2024-10-04', '2024-10-05',
    '2024-10-08', '2024-10-09', '2024-10-10', '2024-10-11', '2024-10-12',
    '2024-10-15', '2024-10-16', '2024-10-17', '2024-10-18', '2024-10-19',
    '2024-10-22', '2024-10-23', '2024-10-24', '2024-10-25', '2024-10-26'
  ];

  const klineData = [
    [2320.26, 2320.26, 2287.3, 2362.94],
    [2300, 2291.3, 2288.26, 2308.38],
    [2295.35, 2346.5, 2295.35, 2346.92],
    [2347.22, 2358.98, 2337.35, 2363.8],
    [2360.75, 2382.48, 2347.89, 2383.76],
    [2383.43, 2385.42, 2371.23, 2391.82],
    [2377.41, 2419.02, 2369.57, 2421.15],
    [2425.92, 2428.15, 2417.58, 2440.38],
    [2411, 2433.13, 2403.3, 2437.42],
    [2432.68, 2434.48, 2427.7, 2441.73],
    [2430.69, 2418.53, 2394.22, 2433.89],
    [2416.62, 2432.4, 2414.4, 2443.03],
    [2441.91, 2421.56, 2415.43, 2444.8],
    [2420.26, 2382.91, 2373.53, 2427.07],
    [2383.49, 2397.18, 2370.61, 2397.94],
    [2378.82, 2325.95, 2309.17, 2378.82],
    [2322.94, 2314.16, 2308.76, 2330.88],
    [2320.62, 2325.82, 2315.01, 2338.78],
    [2313.74, 2293.34, 2289.89, 2340.71],
    [2297.77, 2313.22, 2292.03, 2324.63]
  ];

  const volumeData = [
    23489, 19890, 28934, 32145, 35678,
    29876, 38945, 42356, 39234, 37845,
    31234, 35678, 33456, 29845, 27934,
    25678, 23456, 24589, 26734, 28945
  ];

  const option = {
    title: {
      text: 'ETH/USDT 价格走势',
      left: 'center',
      textStyle: {
        fontSize: 18,
        fontWeight: 'bold',
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      },
      formatter: function(params: any) {
        if (!params || params.length === 0) return '';
        
        // 根据 seriesType 找到对应的数据
        let klineParam = null;
        let volumeValue = null;
        let axisName = '';
        let dataIndex = -1;
        
        for (const param of params) {
          if (param.seriesType === 'candlestick') {
            klineParam = param;
            dataIndex = param.dataIndex;
          } else if (param.seriesType === 'bar') {
            volumeValue = param.value;
          }
          if (!axisName) axisName = param.name;
        }
        
        // 如果没有找到 K线参数或索引无效，返回空
        if (!klineParam || dataIndex < 0 || dataIndex >= klineData.length) {
          return '';
        }
        
        // 直接从原始 klineData 数组中获取数据（通过 dataIndex）
        // K线数据格式：[开盘, 收盘, 最低, 最高]
        const klineValue = klineData[dataIndex];
        
        if (!klineValue || !Array.isArray(klineValue) || klineValue.length < 4) {
          return '';
        }
        
        // 从数组中解构数据
        const [open, close, low, high] = klineValue;
        
        // 添加安全检查
        if (open === undefined || close === undefined || low === undefined || high === undefined) {
          return '';
        }
        
        // 如果 tooltip 中没有成交量数据，从原始数据中获取
        if (volumeValue === null && dataIndex >= 0 && dataIndex < volumeData.length) {
          volumeValue = volumeData[dataIndex];
        }
        
        return `<strong>${axisName}</strong><br/>
          开盘: $${open.toFixed(2)}<br/>
          收盘: $${close.toFixed(2)}<br/>
          最低: $${low.toFixed(2)}<br/>
          最高: $${high.toFixed(2)}<br/>
          成交量: ${volumeValue !== null && volumeValue !== undefined ? volumeValue.toLocaleString() : 'N/A'}`;
      }
    },
    legend: {
      data: ['K线', '成交量'],
      top: 30
    },
    grid: [
      {
        left: '10%',
        right: '10%',
        top: '15%',
        height: '50%'
      },
      {
        left: '10%',
        right: '10%',
        top: '70%',
        height: '15%'
      }
    ],
    xAxis: [
      {
        type: 'category',
        data: dates,
        scale: true,
        boundaryGap: false,
        axisLine: { onZero: false },
        splitLine: { show: false },
        min: 'dataMin',
        max: 'dataMax',
        axisLabel: {
          rotate: 45,
          fontSize: 10
        }
      },
      {
        type: 'category',
        gridIndex: 1,
        data: dates,
        scale: true,
        boundaryGap: false,
        axisLine: { onZero: false },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: { show: false },
        min: 'dataMin',
        max: 'dataMax'
      }
    ],
    yAxis: [
      {
        scale: true,
        splitArea: {
          show: true
        },
        axisLabel: {
          formatter: '${value}'
        }
      },
      {
        scale: true,
        gridIndex: 1,
        splitNumber: 2,
        axisLabel: { show: false },
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { show: false }
      }
    ],
    dataZoom: [
      {
        type: 'inside',
        xAxisIndex: [0, 1],
        start: 0,
        end: 100
      },
      {
        show: true,
        xAxisIndex: [0, 1],
        type: 'slider',
        bottom: '5%',
        start: 0,
        end: 100
      }
    ],
    series: [
      {
        name: 'K线',
        type: 'candlestick',
        data: klineData,
        itemStyle: {
          color: '#ef5350',
          color0: '#26a69a',
          borderColor: '#ef5350',
          borderColor0: '#26a69a'
        },
        emphasis: {
          itemStyle: {
            color: '#ef5350',
            color0: '#26a69a',
            borderColor: '#ef5350',
            borderColor0: '#26a69a',
            shadowBlur: 5,
            shadowColor: 'rgba(0, 0, 0, 0.3)'
          }
        }
      },
      {
        name: '成交量',
        type: 'bar',
        xAxisIndex: 1,
        yAxisIndex: 1,
        data: volumeData,
        itemStyle: {
          color: function(params: any) {
            const index = params.dataIndex;
            const kline = klineData[index];
            // 如果收盘价 > 开盘价，显示红色，否则绿色
            return kline[1] >= kline[0] ? '#ef5350' : '#26a69a';
          }
        }
      }
    ]
  };

  return (
    <div className="w-full bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-6">
      <ReactECharts option={option} style={{ height: '600px' }} />
    </div>
  );
}

