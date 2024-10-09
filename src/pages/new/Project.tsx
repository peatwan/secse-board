import { createProject } from 'api/pages/new'
import ChooseModal from 'components/choose-modal/ChooseModal'
import { useState } from 'react'
import { toast } from 'sonner'
import { Button, Input } from '@nextui-org/react'

interface Props {
  handleProjectCreated: (projectPath: string) => void
  isProjectConfigDisabled: boolean
}

const Project: React.FC<Props> = ({
  handleProjectCreated,
  isProjectConfigDisabled
}) => {
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
        handleProjectCreated(res.data.project_path)
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
      <span className="text-xl font-semibold leading-7 text-gray-900">
        Project
      </span>
      <div className="mt-5 grid grid-cols-1 items-center gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-6">
          <div className="flex w-full flex-wrap items-center gap-4 md:flex-nowrap">
            <Input
              type="text"
              value={workingDirectory}
              onValueChange={setWorkingDirectory}
              label="Working Directory"
              isRequired
              isDisabled={isProjectConfigDisabled}
            />
            <Button
              color="primary"
              variant="flat"
              onPress={() => {
                setIsWorkingDirectoryModalOpen(true)
              }}
              isDisabled={isProjectConfigDisabled}
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
              isDisabled={isProjectConfigDisabled}
            />
            <Button
              color="primary"
              variant="flat"
              onPress={() => {
                setIsFragmentsFileModalOpen(true)
              }}
              isDisabled={isProjectConfigDisabled}
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
              isDisabled={isProjectConfigDisabled}
            />
            <Button
              color="primary"
              variant="flat"
              onPress={() => {
                setIsTargetFileModalOpen(true)
              }}
              isDisabled={isProjectConfigDisabled}
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
              isDisabled={isProjectConfigDisabled}
            ></Input>
            <Button
              color="primary"
              onPress={handleCreateProject}
              isDisabled={isProjectConfigDisabled}
            >
              Create
            </Button>
          </div>
        </div>
      </div>
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
  )
}

export default Project
