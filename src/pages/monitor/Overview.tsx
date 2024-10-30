import { CircularProgress } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { useProjectStore } from 'utils/store'
import { getTimeDifference } from 'utils/time'

const Overview = () => {
  const {
    status: projectStatus,
    startTime: startTimeISO,
    updateTime: updateTimeISO,
    currentGeneration,
    totalGeneration
  } = useProjectStore()
  const [currentTime, setCurrentTime] = useState<Date>(new Date())
  const [timeDifference, setTimeDifference] = useState<{
    hours: number
    minutes: number
    seconds: number
  }>({ hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    if (projectStatus === 'Running') {
      setTimeDifference(getTimeDifference(new Date(startTimeISO), currentTime))
    } else {
      setTimeDifference(
        getTimeDifference(new Date(startTimeISO), new Date(updateTimeISO))
      )
    }
  }, [currentTime, projectStatus, startTimeISO, updateTimeISO])

  useEffect(() => {
    if (projectStatus === 'Running') {
      const interval = setInterval(() => {
        setCurrentTime(new Date())
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [currentTime, projectStatus])

  return (
    <div>
      <span className="text-2xl font-semibold leading-7 text-gray-900">
        Overview
      </span>
      <div className="mt-5 flex items-center gap-32">
        <div>
          <div className="flex items-center justify-start gap-5">
            <div className="text-xl font-semibold">Generation:</div>
            <div>
              <CircularProgress
                aria-label="Process of generation"
                classNames={{
                  svg: 'w-24 h-24 drop-shadow-md',
                  value: 'text-xl font-semibold'
                }}
                color="success"
                value={(currentGeneration * 100) / totalGeneration}
                strokeWidth={4}
                showValueLabel={true}
                valueLabel={
                  <span>
                    {currentGeneration}/{totalGeneration}
                  </span>
                }
              />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <span className="text-xl font-semibold">Time Elapsed:</span>
          <span className="text-5xl font-bold text-gray-700">
            {isNaN(timeDifference.hours)
              ? '00'
              : timeDifference.hours.toString().padStart(2, '0')}
            :
            {isNaN(timeDifference.minutes)
              ? '00'
              : timeDifference?.minutes.toString().padStart(2, '0')}
            :
            {isNaN(timeDifference.seconds)
              ? '00'
              : timeDifference?.seconds.toString().padStart(2, '0')}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Overview
