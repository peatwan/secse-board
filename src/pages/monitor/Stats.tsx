import { getScores } from 'api/pages/monitor'
import {
  ReactECharts,
  ReactEChartsProps
} from 'components/react-echarts/ReactECharts'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useProjectStore } from 'utils/store'

const Stats = () => {
  const { path: projectPath } = useProjectStore()
  const [dockingScoreList, setDockingScoreList] = useState<number[]>([])
  const [scoreCutoffList, setScoreCutoffList] = useState<number[]>([])

  useEffect(() => {
    if (projectPath) {
      getScores(projectPath)
        .then((res) => {
          setDockingScoreList(res.data.dockingScore)
          setScoreCutoffList(res.data.scoreCutoff)
        })
        .catch((e) => {
          if (e.status === 400) {
            toast.error(e.response.data.error)
          } else {
            toast.error(e.message)
          }
        })
    }
  }, [projectPath])

  const genXAxisLabels = (n: number) => {
    const arr = []
    for (let i = 1; i <= n; i++) {
      const text = 'Gen_' + i
      arr.push(text)
    }
    return arr
  }

  const optionDockingScore: ReactEChartsProps['option'] = {
    title: {
      text: 'Scores'
    },
    legend: {
      right: '10%'
    },
    tooltip: {
      trigger: 'axis',
      valueFormatter: (value) => (value ? Number(value).toFixed(4) : '-')
    },
    xAxis: {
      type: 'category',
      axisLine: {
        onZero: false
      },

      data: genXAxisLabels(dockingScoreList.length)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: dockingScoreList,
        type: 'line',
        name: 'Docking Score'
      },
      {
        data: scoreCutoffList,
        type: 'line',
        name: 'Score Cutoff'
      }
    ]
  }
  const optionSeedNum: ReactEChartsProps['option'] = {
    title: {
      text: 'Number of Seeds'
    },
    legend: {
      right: '10%'
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      axisLine: {
        onZero: false
      }
    },
    yAxis: {
      type: 'value'
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
  const optionGenMol: ReactEChartsProps['option'] = {
    title: {
      text: 'Number of Molecules'
    },
    legend: {
      right: '10%'
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      axisLine: {
        onZero: false
      }
    },
    yAxis: {
      type: 'value'
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
