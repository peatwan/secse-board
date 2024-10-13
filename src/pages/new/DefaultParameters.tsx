import { Input, Select, SelectItem } from '@nextui-org/react'
import { DefaultConfig, DockingProgram } from './types/appConfig'
import { AppConfigPaths } from './types/path'
import { useProjectStore } from 'utils/store'

interface Props {
  defaultConfig: DefaultConfig
  handleUpdate: <V>(path: AppConfigPaths, value: V) => void
}

const dockingPrograms = [
  { key: 'vina', label: 'AutoDock Vina' },
  { key: 'glide', label: 'Glide' },
  { key: 'autodock-gpu', label: 'Autodock-GPU' },
  { key: 'unidock', label: 'Uni-Dock' }
]

const DefaultParameters: React.FC<Props> = ({
  defaultConfig,
  handleUpdate
}) => {
  const { setDockingProgram } = useProjectStore()

  return (
    <div>
      <span className="text-xl font-semibold leading-7 text-gray-900">
        Default Parameters
      </span>
      <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-8">
        <div className="sm:col-span-2">
          <Input
            type="text"
            labelPlacement="inside"
            label="Project Name"
            value={defaultConfig.projectCode}
            isReadOnly
            size="lg"
          />
        </div>
        <div className="sm:col-span-3">
          <Input
            type="text"
            labelPlacement="inside"
            label="Project Path"
            value={defaultConfig.workdir}
            isReadOnly
          />
        </div>
        <div className="sm:col-span-3">
          <Input
            type="text"
            labelPlacement="inside"
            label="Fragments"
            value={defaultConfig.fragments}
            isReadOnly
          />
        </div>
        <div className="sm:col-span-2">
          <Input
            type="text"
            labelPlacement="inside"
            label="Number of Generations"
            value={defaultConfig.numGen}
            onValueChange={(value) => {
              handleUpdate('defaultConfig.numGen', value)
            }}
          />
        </div>
        <div className="sm:col-span-2">
          <Input
            type="text"
            labelPlacement="inside"
            label="Number per Generations"
            value={defaultConfig.numPerGen}
            onValueChange={(value) => {
              handleUpdate('defaultConfig.numPerGen', value)
            }}
          />
        </div>
        <div className="sm:col-span-2">
          <Input
            type="text"
            labelPlacement="inside"
            label="Seeds per Generations"
            value={defaultConfig.seedPerGen}
            onValueChange={(value) => {
              handleUpdate('defaultConfig.seedPerGen', value)
            }}
          />
        </div>
        <div className="sm:col-span-2">
          <Input
            type="text"
            labelPlacement="inside"
            label="Starting Generation"
            value={defaultConfig.startGen}
            onValueChange={(value) => {
              handleUpdate('defaultConfig.startGen', value)
            }}
          />
        </div>
        <div className="sm:col-span-2">
          <Input
            type="text"
            labelPlacement="inside"
            label="CPUs"
            value={defaultConfig.cpu}
            onValueChange={(value) => {
              handleUpdate('defaultConfig.cpu', value)
            }}
          />
        </div>
        <div className="sm:col-span-2">
          <Input
            type="text"
            labelPlacement="inside"
            label="GPUs"
            value={defaultConfig.gpu}
            onValueChange={(value) => {
              handleUpdate('defaultConfig.gpu', value)
            }}
          />
        </div>
        <div className="sm:col-span-2">
          <Input
            type="text"
            labelPlacement="inside"
            label="Customized Rule DB"
            value={defaultConfig.ruleDb}
            onValueChange={(value) => {
              handleUpdate('defaultConfig.ruleDb', value)
            }}
          />
        </div>
        <div className="sm:col-span-2">
          <Select
            label="Docking Program"
            selectedKeys={[defaultConfig.dockingProgram]}
            onSelectionChange={(keys) => {
              const value = keys.currentKey
              handleUpdate(
                'defaultConfig.dockingProgram',
                value ? value : 'vina'
              )
              setDockingProgram(
                value ? (value as DockingProgram) : ('vina' as DockingProgram)
              )
            }}
          >
            {dockingPrograms.map((item) => (
              <SelectItem key={item.key}>{item.label}</SelectItem>
            ))}
          </Select>
        </div>
      </div>
    </div>
  )
}

export default DefaultParameters
