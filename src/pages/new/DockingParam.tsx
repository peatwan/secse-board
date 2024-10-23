import { Button, Input, Select, SelectItem } from '@nextui-org/react'
import SmoothCollapse from 'react-smooth-collapse'
import { Docking } from './types/appConfig'
import { AppConfigPaths } from './types/path'
import { useState } from 'react'
import ChooseModal from 'components/choose-modal/ChooseModal'

interface Props {
  docking: Docking
  handleUpdate: <V>(path: AppConfigPaths, value: V) => void
}

const dockingPrograms = [
  { key: 'vina', label: 'AutoDock Vina' },
  { key: 'glide', label: 'Glide' },
  { key: 'autodock-gpu', label: 'Autodock-GPU' },
  { key: 'unidock', label: 'Uni-Dock' }
]

const DockingParam: React.FC<Props> = ({ docking, handleUpdate }) => {
  const [isTargetFileModalOpen, setIsTargetFileModalOpen] = useState(false)
  const handleTargetFileModalClose = () => {
    setIsTargetFileModalOpen(false)
  }
  const handleTargetFileSave = (directory: string) => {
    handleUpdate('docking.target', directory)
  }
  return (
    <div>
      <span className="text-xl font-semibold leading-7 text-gray-900">
        Docking
      </span>
      <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <Select
            label="Docking Program"
            selectedKeys={[docking.dockingProgram]}
            onSelectionChange={(keys) => {
              const value = keys.currentKey
              handleUpdate('docking.dockingProgram', value ? value : 'vina')
            }}
          >
            {dockingPrograms.map((item) => (
              <SelectItem key={item.key}>{item.label}</SelectItem>
            ))}
          </Select>
        </div>
        <div className="gap-3 sm:col-span-4">
          <Input
            type="text"
            labelPlacement="inside"
            label="Target"
            value={docking.target}
            onValueChange={(value) => handleUpdate('docking.target', value)}
          />
        </div>
        <div className="flex items-center justify-start sm:col-span-2">
          <Button
            color="primary"
            variant="flat"
            onPress={() => {
              setIsTargetFileModalOpen(true)
            }}
          >
            Choose
          </Button>
        </div>
        <div className="gap-3 sm:col-span-6">
          <SmoothCollapse expanded={docking.dockingProgram === 'vina'}>
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
                  value={docking.x}
                  onValueChange={(value) => handleUpdate('docking.x', value)}
                  validate={(e) => {
                    if (isNaN(Number(e))) {
                      return 'Please enter a number'
                    }
                  }}
                />
              </div>
              <div className="sm:col-span-2">
                <Input
                  type="text"
                  labelPlacement="inside"
                  label="Y"
                  value={docking.y}
                  onValueChange={(value) => handleUpdate('docking.y', value)}
                  validate={(e) => {
                    if (isNaN(Number(e))) {
                      return 'Please enter a number'
                    }
                  }}
                />
              </div>
              <div className="sm:col-span-2">
                <Input
                  type="text"
                  labelPlacement="inside"
                  label="Z"
                  value={docking.z}
                  onValueChange={(value) => handleUpdate('docking.z', value)}
                  validate={(e) => {
                    if (isNaN(Number(e))) {
                      return 'Please enter a number'
                    }
                  }}
                />
              </div>
              <div className="sm:col-span-2">
                <Input
                  type="text"
                  labelPlacement="inside"
                  label="X Box Size"
                  value={docking.boxSizeX}
                  onValueChange={(value) =>
                    handleUpdate('docking.boxSizeX', value)
                  }
                  validate={(e) => {
                    if (isNaN(Number(e))) {
                      return 'Please enter a number'
                    }
                  }}
                />
              </div>
              <div className="sm:col-span-2">
                <Input
                  type="text"
                  labelPlacement="inside"
                  label="Y Box Size"
                  value={docking.boxSizeY}
                  onValueChange={(value) =>
                    handleUpdate('docking.boxSizeY', value)
                  }
                  validate={(e) => {
                    if (isNaN(Number(e))) {
                      return 'Please enter a number'
                    }
                  }}
                />
              </div>
              <div className="sm:col-span-2">
                <Input
                  type="text"
                  labelPlacement="inside"
                  label="Z Box Size"
                  value={docking.boxSizeZ}
                  onValueChange={(value) =>
                    handleUpdate('docking.boxSizeZ', value)
                  }
                  validate={(e) => {
                    if (isNaN(Number(e))) {
                      return 'Please enter a number'
                    }
                  }}
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
            label="RMSD"
            value={docking.rmsd}
            onValueChange={(value) => handleUpdate('docking.rmsd', value)}
            validate={(e) => {
              if (isNaN(Number(e))) {
                return 'Please enter a number'
              }
            }}
          />
        </div>
        <div className="sm:col-span-2">
          <Input
            type="text"
            labelPlacement="inside"
            label="Delta Score"
            value={docking.deltaScore}
            onValueChange={(value) => handleUpdate('docking.deltaScore', value)}
            validate={(e) => {
              if (isNaN(Number(e))) {
                return 'Please enter a number'
              }
            }}
          />
        </div>
        <div className="sm:col-span-2">
          <Input
            type="text"
            labelPlacement="inside"
            label="Score Cutoff"
            value={docking.scoreCutoff}
            onValueChange={(value) =>
              handleUpdate('docking.scoreCutoff', value)
            }
            validate={(e) => {
              if (isNaN(Number(e))) {
                return 'Please enter a number'
              }
            }}
          />
        </div>
      </div>
      <div>
        {isTargetFileModalOpen && (
          <ChooseModal
            currentDirectory={docking.target}
            mode="file"
            enableFolderCreation={false}
            isModalOpen={isTargetFileModalOpen}
            handleClose={handleTargetFileModalClose}
            onSave={handleTargetFileSave}
          ></ChooseModal>
        )}
      </div>
    </div>
  )
}

export default DockingParam
