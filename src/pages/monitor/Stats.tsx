import {
  ReactECharts,
  ReactEChartsProps
} from 'components/react-echarts/ReactECharts'

const Stats = () => {
  const optionStatsChart: ReactEChartsProps['option'] = {
    legend: {},
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      axisLine: {
        onZero: false
      },
      axisLabel: {
        rotate: 45
      }
    },
    yAxis: {
      type: 'value'
    }
  }
  const optionDockingScore: ReactEChartsProps['option'] = {
    ...optionStatsChart,
    ...{
      title: {
        text: 'Scores'
      },
      series: [
        {
          data: [
            ['Gen1', -10.401],
            ['Gen2', -10.964],
            ['Gen3', -9.754],
            ['Gen4', -9.416],
            ['Gen5', -9.377],
            ['Gen6', -9.737],
            ['Gen7', -8.817],
            ['Gen8', -8.06],
            ['Gen9', -8.295],
            ['Gen10', -7.198]
          ],
          type: 'line',
          name: 'Docking Score'
        },
        {
          data: [
            ['Gen1', -9.0],
            ['Gen2', -9.0],
            ['Gen3', -9.0],
            ['Gen4', -9.0],
            ['Gen5', -9.73845],
            ['Gen6', -10.14604],
            ['Gen7', -10.24604],
            ['Gen8', -10.54604],
            ['Gen9', -10.84604],
            ['Gen10', -11.14604]
          ],
          type: 'line',
          name: 'Score Cutoff'
        }
      ]
    }
  }
  const optionSeedNum: ReactEChartsProps['option'] = {
    ...optionStatsChart,
    ...{
      title: {
        text: 'Number of Seeds'
      },
      series: [
        {
          data: [
            ['Gen1', 150],
            ['Gen2', 230],
            ['Gen3', 224],
            ['Gen4', 218],
            ['Gen5', 135],
            ['Gen6', 147],
            ['Gen7', 260],
            ['Gen8', 165],
            ['Gen9', 127],
            ['Gen10', 210]
          ],
          type: 'line'
        }
      ]
    }
  }
  const optionGenMol: ReactEChartsProps['option'] = {
    ...optionStatsChart,
    ...{
      title: {
        text: 'Number of Molecules'
      },
      series: [
        {
          data: [
            ['Gen1', 150],
            ['Gen2', 230],
            ['Gen3', 224],
            ['Gen4', 218],
            ['Gen5', 135],
            ['Gen6', 147],
            ['Gen7', 260],
            ['Gen8', 165],
            ['Gen9', 127],
            ['Gen10', 210]
          ],
          type: 'bar',
          name: 'Generated'
        },
        {
          data: [
            ['Gen1', 110],
            ['Gen2', 180],
            ['Gen3', 154],
            ['Gen4', 178],
            ['Gen5', 85],
            ['Gen6', 107],
            ['Gen7', 200],
            ['Gen8', 115],
            ['Gen9', 77],
            ['Gen10', 176]
          ],
          type: 'bar',
          name: 'Filtered'
        }
      ]
    }
  }

  return (
    <div>
      <span className="text-2xl font-semibold leading-7 text-gray-900">
        Statistics
      </span>
      <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <div className="h-[300px]">
            <ReactECharts option={optionDockingScore} />
          </div>
        </div>
        <div className="sm:col-span-1">
          <div className="h-[300px]">
            <ReactECharts option={optionSeedNum} />
          </div>
        </div>
        <div className="sm:col-span-1">
          <div className="h-[300px]">
            <ReactECharts option={optionGenMol} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Stats
