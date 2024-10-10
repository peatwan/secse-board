import { Button, Input } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useProjectStore } from 'utils/store'
import { createProject, getDefaultDirectory } from 'api/pages/new'
import ChooseModal from 'components/choose-modal/ChooseModal'
import { useNavigate } from 'react-router-dom'

const New = () => {
  const [workingDirectory, setWorkingDirectory] = useState('/')
  const [fragmentsFile, setFragmentsFile] = useState('/')
  const [targetFile, setTargetFile] = useState('/')
  const [projectName, setProjectName] = useState('')
  const [isWorkingDirectoryModalOpen, setIsWorkingDirectoryModalOpen] =
    useState(false)
  const [isFragmentsFileModalOpen, setIsFragmentsFileModalOpen] =
    useState(false)
  const [isTargetFileModalOpen, setIsTargetFileModalOpen] = useState(false)

  const { setStatus, setPath } = useProjectStore()

  const navigate = useNavigate()

  useEffect(() => {
    getDefaultDirectory().then((res) => {
      const defaultDirectory = res.data
      setWorkingDirectory(defaultDirectory)
      setFragmentsFile(defaultDirectory)
      setTargetFile(defaultDirectory)
    })
  }, [])

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
        setStatus('Created')
        setPath(res.data.project_path)
        navigate('/new/param')
      })
      .catch((e) => {
        if (e.status === 400) {
          toast.error(e.response.data.error)
        } else {
          toast.error(e.message)
        }
      })
  }

  const handleReset = () => {
    getDefaultDirectory().then((res) => {
      const defaultDirectory = res.data
      setWorkingDirectory(defaultDirectory)
      setFragmentsFile(defaultDirectory)
      setTargetFile(defaultDirectory)
    })
    setProjectName('')
  }

  return (
    <div className="flex items-center justify-center">
      <div className="py-6">
        <span className="text-xl font-semibold leading-7 text-gray-900">
          Project
        </span>
        <div className="mt-5 grid grid-cols-1 items-center gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-5">
            <Input
              type="text"
              value={workingDirectory}
              onValueChange={setWorkingDirectory}
              label="Working Directory"
              isRequired
            />
          </div>
          <div className="sm:col-span-1">
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
          <div className="sm:col-span-5">
            <Input
              type="text"
              value={fragmentsFile}
              onValueChange={setFragmentsFile}
              label="Fragments File"
              isRequired
            />
          </div>
          <div className="sm:col-span-1">
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
          <div className="sm:col-span-5">
            <Input
              type="text"
              value={targetFile}
              onValueChange={setTargetFile}
              label="Target File"
              isRequired
            />
          </div>
          <div className="sm:col-span-1">
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
          <div className="sm:col-span-6">
            <Input
              type="text"
              label="Project Name"
              value={projectName}
              onValueChange={setProjectName}
              isRequired
            ></Input>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6 pb-10">
          <Button color="danger" variant="flat" onPress={handleReset}>
            Reset
          </Button>
          <Button color="primary" onPress={handleCreateProject}>
            Create
          </Button>
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
    </div>
  )
}
export default New
