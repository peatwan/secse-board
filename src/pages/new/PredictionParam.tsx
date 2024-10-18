import { Input, Select, SelectItem } from '@nextui-org/react'
import { Prediction, PredictionMode } from './types/appConfig'
import { AppConfigPaths } from './types/path'

interface Props {
  prediction: Prediction
  handleUpdate: <V>(path: AppConfigPaths, value: V) => void
}

const modeList = [
  {
    key: PredictionMode.NOT_USE,
    label: 'Not Use'
  },
  {
    key: PredictionMode.MODELING_PER_GENERATION,
    label: 'Modeling per Generation'
  },
  {
    key: PredictionMode.MODELING_ON_ALL_GENERATION,
    label: 'Modeling Overall After All the Generation'
  }
]

const PredictionParam: React.FC<Props> = ({ prediction, handleUpdate }) => {
  return (
    <div>
      <span className="text-xl font-semibold leading-7 text-gray-900 ">
        Prediction
      </span>
      <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-4">
          <Select
            label="Mode"
            selectedKeys={[prediction.mode]}
            onSelectionChange={(keys) => {
              const value = keys.currentKey
              handleUpdate('prediction.mode', value)
            }}
          >
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
            value={prediction.dlPerGen}
            onValueChange={(value) =>
              handleUpdate('prediction.dlPerGen', value)
            }
            validate={(e) => {
              if (!Number.isInteger(Number(e))) {
                return 'Please enter an integer'
              }
            }}
          />
        </div>
        <div className="sm:col-span-4">
          <Input
            type="text"
            labelPlacement="inside"
            label="Score Cutoff"
            value={prediction.dlScoreCutoff}
            onValueChange={(value) =>
              handleUpdate('prediction.dlScoreCutoff', value)
            }
            validate={(e) => {
              if (isNaN(Number(e))) {
                return 'Please enter a number'
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default PredictionParam
