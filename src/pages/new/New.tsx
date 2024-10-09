import { Button, Input, Select, SelectItem } from '@nextui-org/react'
import { createProject } from 'api/pages/new'
import ChooseModal from 'components/choose-modal/ChooseModal'
import { useState } from 'react'
import { toast } from 'sonner'

const dockingPrograms = [
  { key: 'vina', label: 'AutoDock Vina' },
  { key: 'glide', label: 'Glide' },
  { key: 'autodock-gPU', label: 'Autodock-GPU' },
  { key: 'unidock', label: 'Uni-Dock' }
]
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

export const New = () => {
  const [workingDirectory, setWorkingDirectory] = useState(
    '/Users/di/Projects/test/'
  )
  const [fragmentsFile, setFragmentsFile] = useState(
    '/Users/di/Projects/test/demo_1020.smi'
  )
  const [targetFile, setTargetFile] = useState(
    '/Users/di/Projects/test/PHGDH_6RJ3_for_vina.pdbqt'
  )
  const [projectName, setProjectName] = useState('')
  const [isWorkingDirectoryModalOpen, setIsWorkingDirectoryModalOpen] =
    useState(false)
  const [isFragmentsFileModalOpen, setIsFragmentsFileModalOpen] =
    useState(false)
  const [isTargetFileModalOpen, setIsTargetFileModalOpen] = useState(false)
  const handleWorkingDirectoryModalClose = () => {
    setIsWorkingDirectoryModalOpen(false)
  }
  const handleFragmentsFileModalClose = () => {
    setIsFragmentsFileModalOpen(false)
  }
  const handleTargetFileModalClose = () => {
    setIsTargetFileModalOpen(false)
  }

  const handleWorkingDirectorySave = (directory: string) => {
    setWorkingDirectory(directory)
  }

  const handleFragmentsFileSave = (directory: string) => {
    setFragmentsFile(directory)
  }

  const handleTargetFileSave = (directory: string) => {
    setTargetFile(directory)
  }

  const handleCreateProject = () => {
    createProject(workingDirectory, fragmentsFile, targetFile, projectName)
      .then((res) => {
        toast.success(res.data.message)
      })
      .catch((e) => {
        if (e.status === 400) {
          toast.error(e.response.data.error)
        } else {
          toast.error(e.message)
        }
      })
  }

  return (
    <div>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-10">
          <span className="text-xl font-semibold leading-7 text-gray-900">
            Project
          </span>
          <form>
            <div className="mt-5 grid grid-cols-1 items-center gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <div className="flex w-full flex-wrap items-center gap-4 md:flex-nowrap">
                  <Input
                    type="text"
                    value={workingDirectory}
                    onValueChange={setWorkingDirectory}
                    label="Working Directory"
                    isRequired
                    // validate={(value) => {
                    //   if (!value.endsWith('/')) {
                    //     return "Invalid input! Directory must end with ' / '."
                    //   }
                    // }}
                  />
                  <Button
                    color="primary"
                    variant="flat"
                    onPress={() => {
                      setIsWorkingDirectoryModalOpen(true)
                    }}
                  >
                    Choose
                  </Button>
                </div>
              </div>
              <div className="sm:col-span-6">
                <div className="flex w-full flex-wrap items-center gap-4 md:flex-nowrap">
                  <Input
                    type="text"
                    value={fragmentsFile}
                    onValueChange={setFragmentsFile}
                    label="Fragments File"
                    isRequired
                    // validationBehavior="native"
                    // validate={(value) => {
                    //   if (!value.endsWith('.smi')) {
                    //     return "Invalid input! File must end with ' .smi '."
                    //   }
                    // }}
                  />
                  <Button
                    color="primary"
                    variant="flat"
                    onPress={() => {
                      setIsFragmentsFileModalOpen(true)
                    }}
                  >
                    Choose
                  </Button>
                </div>
              </div>
              <div className="sm:col-span-6">
                <div className="flex w-full flex-wrap items-center gap-4 md:flex-nowrap">
                  <Input
                    type="text"
                    value={targetFile}
                    onValueChange={setTargetFile}
                    label="Target File"
                    isRequired
                    // validationBehavior="native"
                    // validate={(value) => {
                    //   if (!value.endsWith('.pdbqt')) {
                    //     return "Invalid input! File must end with ' .pdbqt '."
                    //   }
                    // }}
                  />
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
              </div>
              <div className="sm:col-span-6">
                <div className="flex w-full flex-wrap items-center gap-4 md:flex-nowrap">
                  <Input
                    type="text"
                    label="Project Name"
                    value={projectName}
                    onValueChange={setProjectName}
                    isRequired
                  ></Input>
                  <Button color="primary" onPress={handleCreateProject}>
                    Create
                  </Button>
                </div>
              </div>
            </div>
          </form>
          <div>
            {isWorkingDirectoryModalOpen && (
              <ChooseModal
                currentDirectory={workingDirectory}
                mode="folder"
                isModalOpen={isWorkingDirectoryModalOpen}
                handleClose={handleWorkingDirectoryModalClose}
                onSave={handleWorkingDirectorySave}
              ></ChooseModal>
            )}
          </div>
          <div>
            {isFragmentsFileModalOpen && (
              <ChooseModal
                currentDirectory={fragmentsFile}
                mode="file"
                isModalOpen={isFragmentsFileModalOpen}
                handleClose={handleFragmentsFileModalClose}
                onSave={handleFragmentsFileSave}
              ></ChooseModal>
            )}
          </div>
          <div>
            {isTargetFileModalOpen && (
              <ChooseModal
                currentDirectory={targetFile}
                mode="file"
                isModalOpen={isTargetFileModalOpen}
                handleClose={handleTargetFileModalClose}
                onSave={handleTargetFileSave}
              ></ChooseModal>
            )}
          </div>
        </div>
        <div className="border-b border-gray-900/10 pb-10">
          <span className="text-xl font-semibold leading-7 text-gray-900">
            Default Parameters
          </span>
          <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-2">
              <Input
                type="text"
                labelPlacement="inside"
                label="Number of Generations"
              />
            </div>
            <div className="sm:col-span-2">
              <Input
                type="text"
                labelPlacement="inside"
                label="Number per Generations"
              />
            </div>
            <div className="sm:col-span-2">
              <Input
                type="text"
                labelPlacement="inside"
                label="Seeds per Generations"
              />
            </div>

            <div className="sm:col-span-3">
              <Input type="text" labelPlacement="inside" label="CPUs" />
            </div>
            <div className="sm:col-span-3">
              <Input type="text" labelPlacement="inside" label="GPUs" />
            </div>
          </div>
        </div>
        <div className="border-b border-gray-900/10 pb-10">
          <span className="text-xl font-semibold leading-7 text-gray-900">
            Docking Parameters
          </span>
          <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <Select label="Docking Programs" isRequired>
                {dockingPrograms.map((item) => (
                  <SelectItem key={item.key}>{item.label}</SelectItem>
                ))}
              </Select>
            </div>

            <div className="gap-3 sm:col-span-6">
              <span className="text-lg font-medium leading-7 text-gray-900 ">
                Docking Box
              </span>
            </div>

            <div className="sm:col-span-2">
              <Input type="text" labelPlacement="inside" label="X" />
            </div>
            <div className="sm:col-span-2">
              <Input type="text" labelPlacement="inside" label="Y" />
            </div>
            <div className="sm:col-span-2">
              <Input type="text" labelPlacement="inside" label="Z" />
            </div>
            <div className="sm:col-span-2">
              <Input type="text" labelPlacement="inside" label="X Box Size" />
            </div>
            <div className="sm:col-span-2">
              <Input type="text" labelPlacement="inside" label="Y Box Size" />
            </div>
            <div className="sm:col-span-2">
              <Input type="text" labelPlacement="inside" label="Z Box Size" />
            </div>

            <div className="gap-3 sm:col-span-6">
              <span className="text-lg font-medium leading-7 text-gray-900 ">
                Optimization Direction
              </span>
            </div>
            <div className="sm:col-span-4">
              <Input
                type="text"
                labelPlacement="inside"
                label="RMSE Threshold (Å)"
              />
            </div>
            <div className="sm:col-span-4">
              <Input
                type="text"
                labelPlacement="inside"
                label="Delta Score (kcal/mol)"
              />
            </div>
            <div className="sm:col-span-4">
              <Input
                type="text"
                labelPlacement="inside"
                label="Score Cutoff (kcal/mol)"
              />
            </div>
          </div>
        </div>
        <div className="border-b border-gray-900/10 pb-10">
          <span className="text-xl font-semibold leading-7 text-gray-900">
            Molecular Properties
          </span>
          <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <Input
                type="text"
                labelPlacement="inside"
                label="Maximum Molecular Weight"
              />
            </div>
            <div className="sm:col-span-3">
              <Input type="text" labelPlacement="inside" label="logP Lower" />
            </div>
            <div className="sm:col-span-3">
              <Input type="text" labelPlacement="inside" label="logP Upper" />
            </div>
            <div className="sm:col-span-3">
              <Input
                type="text"
                labelPlacement="inside"
                label="Chiral Center Less Than"
              />
            </div>
            <div className="sm:col-span-3">
              <Input
                type="text"
                labelPlacement="inside"
                label="Heteroatom Ratio Less Than"
              />
            </div>
            <div className="sm:col-span-3">
              <Input
                type="text"
                labelPlacement="inside"
                label="Rdkit Rotatable Bound Number Less Than"
              />
            </div>
            <div className="sm:col-span-3">
              <Input
                type="text"
                labelPlacement="inside"
                label="Rigid Body Number Less Than"
              />
            </div>
          </div>
        </div>
        <div className="gap-3 sm:col-span-6">
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
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6 pb-10">
        <Button color="danger" variant="flat">
          Reset
        </Button>
        <Button color="primary">Save</Button>
      </div>
    </div>
  )
}
