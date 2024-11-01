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
    days: number
  }>({ hours: 0, minutes: 0, seconds: 0, days: 0 })

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
      }, 1000 * 60) //1 minute

      return () => clearInterval(interval)
    }
  }, [currentTime, projectStatus])

  return (
    <div>
      <span className="text-2xl font-semibold leading-7 text-gray-900">
        Overview
      </span>
      <div className="mt-5 flex items-center gap-20 ">
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
          <div className="flex space-x-6 p-6">
            <div className=" flex items-center py-3">
              <span className="mr-3 text-4xl font-bold text-gray-800">
                {isNaN(timeDifference.days)
                  ? '0'
                  : timeDifference.days.toString()}
              </span>
              <span className="text-sm uppercase tracking-wider text-gray-600">
                Days
              </span>
            </div>
            <div className="flex items-center py-3">
              <span className="mr-3 text-4xl font-bold text-gray-800">
                {isNaN(timeDifference.hours)
                  ? '00'
                  : timeDifference.hours.toString().padStart(2, '0')}
              </span>
              <span className="text-sm uppercase tracking-wider text-gray-600">
                Hours
              </span>
            </div>
            <div className=" flex items-center rounded-lg py-3">
              <span className="mr-3 text-4xl font-bold text-gray-800">
                {isNaN(timeDifference.minutes)
                  ? '00'
                  : timeDifference.minutes.toString().padStart(2, '0')}
              </span>
              <span className="text-sm uppercase tracking-wider text-gray-600">
                Minutes
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Overview
