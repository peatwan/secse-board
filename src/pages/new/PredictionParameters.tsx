import { Input, Select, SelectItem } from '@nextui-org/react'

const modeList = [
  {
    key: 0,
    label: 'Not Use'
  },
  {
    key: 1,
    label: 'Modeling Per Generation'
  },
  {
    key: 2,
    label: 'Modeling Overall After All The Generation'
  }
]

function PredictionParameters() {
  return (
    <div>
      <span className="text-xl font-medium leading-7 text-gray-900 ">
        Prediction Parameters
      </span>
      <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-4">
          <Select label="Mode" isRequired>
            {modeList.map((item) => (
              <SelectItem key={item.key}>{item.label}</SelectItem>
            ))}
          </Select>
        </div>
        <div className="sm:col-span-4">
          <Input
            type="text"
            labelPlacement="inside"
            label="Number of Molecules Selected per Prediction"
          />
        </div>
        <div className="sm:col-span-4">
          <Input type="text" labelPlacement="inside" label="Score Cutoff" />
        </div>
      </div>
    </div>
  )
}

export default PredictionParameters
