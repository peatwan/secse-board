import { getMoleculeNumber, getScores, getSeedsNumber } from 'api/pages/monitor'
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
  const [seedsNumberList, setSeedsNumberList] = useState<number[]>([])
  const [generatedMoleculeNumberList, setGeneratedMoleculeNumberList] =
    useState<number[]>([])
  const [filteredMoleculeNumberList, setFilteredMoleculeNumberList] = useState<
    number[]
  >([])

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
      getSeedsNumber(projectPath)
        .then((res) => {
          setSeedsNumberList(res.data)
        })
        .catch((e) => {
          if (e.status === 400) {
            toast.error(e.response.data.error)
          } else {
            toast.error(e.message)
          }
        })
      getMoleculeNumber(projectPath)
        .then((res) => {
          setGeneratedMoleculeNumberList(res.data.generated)
          setFilteredMoleculeNumberList(res.data.filtered)
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
  const optionSeedsNumber: ReactEChartsProps['option'] = {
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
      },
      data: genXAxisLabels(seedsNumberList.length)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: seedsNumberList,
        type: 'line'
      }
    ]
  }
  const optionMoleculeNumber: ReactEChartsProps['option'] = {
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
      },
      data: genXAxisLabels(generatedMoleculeNumberList.length)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: generatedMoleculeNumberList,
        type: 'bar',
        name: 'Generated'
      },
      {
        data: filteredMoleculeNumberList,
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
            <ReactECharts option={optionSeedsNumber} />
          </div>
        </div>
        <div className="sm:col-span-1">
          <div className="h-[300px]">
            <ReactECharts option={optionMoleculeNumber} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Stats
