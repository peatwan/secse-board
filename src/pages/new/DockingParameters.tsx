import { Input } from '@nextui-org/react'
import { useProjectStore } from 'utils/store'
import SmoothCollapse from 'react-smooth-collapse'
import { DockingConfig } from './types/appConfig'
import { AppConfigPaths } from './types/path'

interface Props {
  dockingConfig: DockingConfig
  handleUpdate: <V>(path: AppConfigPaths, value: V) => void
}

const DockingParameters: React.FC<Props> = ({
  dockingConfig,
  handleUpdate
}) => {
  const { dockingProgram } = useProjectStore()

  return (
    <div>
      <span className="text-xl font-semibold leading-7 text-gray-900">
        Docking Parameters
      </span>
      <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="gap-3 sm:col-span-4">
          <Input
            type="text"
            labelPlacement="inside"
            label="Target"
            value={dockingConfig.target}
            onValueChange={(value) => handleUpdate('docking.target', value)}
            readOnly
          />
        </div>
        <div className="gap-3 sm:col-span-6">
          <SmoothCollapse expanded={dockingProgram === 'vina'}>
            <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="gap-3 sm:col-span-6">
                <span className="text-lg font-medium leading-7 text-gray-900 ">
                  Docking Box
                </span>
              </div>
              <div className="sm:col-span-2">
                <Input
                  type="text"
                  labelPlacement="inside"
                  label="X"
                  value={dockingConfig.x}
                  onValueChange={(value) => handleUpdate('docking.x', value)}
                />
              </div>
              <div className="sm:col-span-2">
                <Input
                  type="text"
                  labelPlacement="inside"
                  label="Y"
                  value={dockingConfig.y}
                  onValueChange={(value) => handleUpdate('docking.y', value)}
                />
              </div>
              <div className="sm:col-span-2">
                <Input
                  type="text"
                  labelPlacement="inside"
                  label="Z"
                  value={dockingConfig.z}
                  onValueChange={(value) => handleUpdate('docking.z', value)}
                />
              </div>
              <div className="sm:col-span-2">
                <Input
                  type="text"
                  labelPlacement="inside"
                  label="X Box Size"
                  value={dockingConfig.boxSizeX}
                  onValueChange={(value) =>
                    handleUpdate('docking.boxSizeX', value)
                  }
                />
              </div>
              <div className="sm:col-span-2">
                <Input
                  type="text"
                  labelPlacement="inside"
                  label="Y Box Size"
                  value={dockingConfig.boxSizeY}
                  onValueChange={(value) =>
                    handleUpdate('docking.boxSizeY', value)
                  }
                />
              </div>
              <div className="sm:col-span-2">
                <Input
                  type="text"
                  labelPlacement="inside"
                  label="Z Box Size"
                  value={dockingConfig.boxSizeZ}
                  onValueChange={(value) =>
                    handleUpdate('docking.boxSizeZ', value)
                  }
                />
              </div>
            </div>
          </SmoothCollapse>
        </div>
        <div className="gap-3 sm:col-span-6">
          <span className="text-lg font-medium leading-7 text-gray-900 ">
            Optimization Direction
          </span>
        </div>
        <div className="sm:col-span-2">
          <Input
            type="text"
            labelPlacement="inside"
            label="RMSE Threshold (Å)"
            value={dockingConfig.rmsd}
            onValueChange={(value) => handleUpdate('docking.rmsd', value)}
          />
        </div>
        <div className="sm:col-span-2">
          <Input
            type="text"
            labelPlacement="inside"
            label="Delta Score (kcal/mol)"
            value={dockingConfig.deltaScore}
            onValueChange={(value) => handleUpdate('docking.deltaScore', value)}
          />
        </div>
        <div className="sm:col-span-2">
          <Input
            type="text"
            labelPlacement="inside"
            label="Score Cutoff (kcal/mol)"
            value={dockingConfig.scoreCutoff}
            onValueChange={(value) =>
              handleUpdate('docking.scoreCutoff', value)
            }
          />
        </div>
      </div>
    </div>
  )
}

export default DockingParameters
