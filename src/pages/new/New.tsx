import { Button, Input } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useProjectStore } from 'utils/store'
import { createProject, getDefaultDirectory } from 'api/pages/new'
import ChooseModal from 'components/choose-modal/ChooseModal'
import { useNavigate } from 'react-router-dom'

const New = () => {
  const [workingDirectory, setWorkingDirectory] = useState('/')
  const [projectName, setProjectName] = useState('')
  const [isWorkingDirectoryModalOpen, setIsWorkingDirectoryModalOpen] =
    useState(false)

  const { setStatus, setPath } = useProjectStore()

  const navigate = useNavigate()

  useEffect(() => {
    getDefaultDirectory().then((res) => {
      const defaultDirectory = res.data
      setWorkingDirectory(defaultDirectory)
    })
  }, [])

  const handleWorkingDirectoryModalClose = () => {
    setIsWorkingDirectoryModalOpen(false)
  }

  const handleWorkingDirectorySave = (directory: string) => {
    setWorkingDirectory(directory)
  }

  const handleCreateProject = () => {
    createProject(workingDirectory, projectName)
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

  return (
    <div className="flex items-center justify-center">
      <div className="py-6">
        <span className="text-xl font-semibold leading-7 text-gray-900">
          New Project
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
          <Button color="primary" onPress={handleCreateProject}>
            Create
          </Button>
        </div>
        <div>
          {isWorkingDirectoryModalOpen && (
            <ChooseModal
              currentDirectory={workingDirectory}
              mode="folder"
              enableFolderCreation
              isModalOpen={isWorkingDirectoryModalOpen}
              handleClose={handleWorkingDirectoryModalClose}
              onSave={handleWorkingDirectorySave}
            ></ChooseModal>
          )}
        </div>
      </div>
    </div>
  )
}
export default New
