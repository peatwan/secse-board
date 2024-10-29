import { CircularProgress } from '@nextui-org/react'

const Overview = () => {
  return (
    <div>
      <span className="text-2xl font-semibold leading-7 text-gray-900">
        Overview
      </span>
      <div className="mt-5 flex items-center gap-32">
        <div>
          <div className="flex items-center justify-start gap-5">
            <div className="text-xl font-semibold">Cycle:</div>
            <div>
              <CircularProgress
                classNames={{
                  svg: 'w-24 h-24 drop-shadow-md',
                  value: 'text-xl font-semibold'
                }}
                color="success"
                value={70}
                strokeWidth={4}
                showValueLabel={true}
                valueLabel={<span>7/10</span>}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <span className="text-xl font-semibold">Time Elapsed:</span>
          <span className="text-5xl font-bold text-gray-700">02:00:12</span>
        </div>
      </div>
    </div>
  )
}

export default Overview
