import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure
} from '@nextui-org/react'
import { getProjectStatus, startProject, stopProject } from 'api/pages/monitor'
import { getDefaultDirectory } from 'api/pages/new'
import { CancelIcon } from 'assets/icons/CancelIcon'
import { CheckCircleIcon } from 'assets/icons/CheckCircleIcon'
import { ErrorIcon } from 'assets/icons/ErrorIcon'
import { PauseCircleIcon } from 'assets/icons/PauseCircileIcon'
import { PlayCircleIcon } from 'assets/icons/PlayCircleIcon'
import ChooseModal from 'components/choose-modal/ChooseModal'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useProjectStore } from 'utils/store'
import Overview from './Overview'
import Stats from './Stats'
import GenDetails from './GenDetails'
import { StopCircleIcon } from 'assets/icons/StopCircleIcon'

const Monitor = () => {
  const {
    path: projectPath,
    status: projectStatus,
    setPath: setProjectPath,
    setStatus: setProjectStatus,
    setStartTime,
    setUpdateTime,
    setCurrentGeneration,
    setTotalGeneration
  } = useProjectStore()

  const [isProjectPathChooseModalOpen, setIsProjectPathChooseModalOpen] =
    useState(false)
  const [choosePath, setChoosePath] = useState('')
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (projectPath) {
      setChoosePath(projectPath)
      getProjectStatus(projectPath)
        .then((res) => {
          setProjectStatus(res.data.status)
          setStartTime(res.data.start_time)
          setUpdateTime(res.data.update_time)
          setCurrentGeneration(res.data.generation.current)
          setTotalGeneration(res.data.generation.total)
        })
        .catch((e) => {
          if (e.status === 400) {
            toast.error(e.response.data.error)
          } else {
            toast.error(e.message)
          }
          setProjectStatus('NotCreated')
        })
    } else {
      getDefaultDirectory().then((res) => {
        setChoosePath(res.data)
      })
    }
  }, [
    projectPath,
    setCurrentGeneration,
    setProjectStatus,
    setStartTime,
    setTotalGeneration,
    setUpdateTime
  ])

  useEffect(() => {
    if (projectStatus === 'Running') {
      const interval = setInterval(() => {
        getProjectStatus(projectPath)
          .then((res) => {
            setProjectStatus(res.data.status)
            setStartTime(res.data.start_time)
            setUpdateTime(res.data.update_time)
            setCurrentGeneration(res.data.generation.current)
            setTotalGeneration(res.data.generation.total)
          })
          .catch((e) => {
            if (e.status === 400) {
              toast.error(e.response.data.error)
            } else {
              toast.error(e.message)
            }
          })
      }, 1000 * 60) //1 minute

      return () => clearInterval(interval)
    }
  }, [
    projectPath,
    projectStatus,
    setCurrentGeneration,
    setProjectStatus,
    setStartTime,
    setTotalGeneration,
    setUpdateTime
  ])

  const getStatus = (projectPath: string) => {
    getProjectStatus(projectPath)
      .then((res) => {
        setProjectStatus(res.data.status)
        setStartTime(res.data.start_time)
        setUpdateTime(res.data.update_time)
        setCurrentGeneration(res.data.generation.current)
        setTotalGeneration(res.data.generation.total)
      })
      .catch((e) => {
        if (e.status === 400) {
          toast.error(e.response.data.error)
        } else {
          toast.error(e.message)
        }
      })
  }

  const handleProjectPathChooseModalClose = () => {
    setIsProjectPathChooseModalOpen(false)
  }
  const handleProjectPathChooseSave = (directory: string) => {
    setChoosePath(directory)
    setProjectPath(directory)
  }

  const handleClickStatusButton = () => {
    if (projectStatus === 'Created' || projectStatus === 'Running') {
      onOpen()
    }
  }

  const handleStatusChange = () => {
    if (projectStatus === 'Created') {
      setIsLoading(true)
      startProject(projectPath)
        .then(() => {
          getStatus(projectPath)
        })
        .catch((e) => {
          if (e.status === 400) {
            toast.error(e.response.data.error)
          } else {
            toast.error(e.message)
          }
        })
        .finally(() => {
          setIsLoading(false)
        })
    } else if (projectStatus === 'Running') {
      setIsLoading(true)
      stopProject(projectPath)
        .then(() => {
          getStatus(projectPath)
        })
        .catch((e) => {
          if (e.status === 400) {
            toast.error(e.response.data.error)
          } else {
            toast.error(e.message)
          }
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
    onClose()
  }

  const statusButtonStartContent = () => {
    if (isLoading) {
      return null
    }
    switch (projectStatus) {
      case 'NotCreated':
        return <CancelIcon fill="#000000" />
      case 'Created':
      case 'Paused':
        return <PlayCircleIcon fill="#fafafa" />
      case 'Running':
        return <PauseCircleIcon fill="#fafafa" />
      case 'Stopped':
        return <StopCircleIcon fill="#fafafa" />
      case 'Finished':
        return <CheckCircleIcon fill="#000000" />
      case 'Failed':
        return <ErrorIcon fill="#fafafa" />

      default:
        return null
    }
  }

  const statusButtonColor = () => {
    switch (projectStatus) {
      case 'NotCreated':
        return 'default'
      case 'Created':
      case 'Paused':
      case 'Running':
        return 'primary'
      case 'Finished':
        return 'success'
      case 'Stopped':
      case 'Failed':
        return 'danger'
      default:
        return 'primary'
    }
  }

  const getModalText = () => {
    if (projectStatus === 'Created') {
      return (
        <span>
          Are you sure to <b>start</b> running?
        </span>
      )
    } else if (projectStatus === 'Running') {
      return (
        <span>
          Are you sure to <b>STOP</b> the running job? Stopped job can{' '}
          <b>NOT</b> be resumed.
        </span>
      )
    }
  }

  return (
    <div>
      <div className="space-y-12 pt-10">
        <div className="border-b border-gray-900/10 pb-10">
          <div className="flex flex-col items-start justify-start gap-10">
            <div className="flex items-center justify-start gap-5">
              <div className="text-xl font-semibold leading-7 text-gray-900">
                Project:
              </div>
              <Input
                value={choosePath}
                readOnly
                classNames={{
                  input: ['w-[300px]']
                }}
                onValueChange={setChoosePath}
              ></Input>
              <Button
                color="primary"
                variant="flat"
                onPress={() => setIsProjectPathChooseModalOpen(true)}
              >
                Choose
              </Button>
            </div>
            <div className="flex items-center justify-start gap-5">
              <div className=" text-xl font-semibold leading-7 text-gray-900">
                Status:
              </div>
              <Button
                isLoading={isLoading}
                size="lg"
                color={statusButtonColor()}
                radius="full"
                startContent={statusButtonStartContent()}
                onPress={handleClickStatusButton}
                className="w-48 justify-start text-xl"
              >
                {projectStatus}
              </Button>
            </div>
          </div>
        </div>
        <div className="border-b border-gray-900/10 pb-10">
          <Overview />
        </div>
        <div className="border-b border-gray-900/10 pb-10">
          <Stats />
        </div>
        <div className="border-b border-gray-900/10 pb-10">
          <GenDetails />
        </div>
      </div>
      <div>
        {isProjectPathChooseModalOpen && (
          <ChooseModal
            currentDirectory={choosePath}
            mode="folder"
            enableFolderCreation={false}
            isModalOpen={isProjectPathChooseModalOpen}
            handleClose={handleProjectPathChooseModalClose}
            onSave={handleProjectPathChooseSave}
          ></ChooseModal>
        )}
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {projectStatus === 'Running' ? 'Warning' : 'Info'}
              </ModalHeader>
              <ModalBody>
                <p>{getModalText()}</p>
              </ModalBody>
              <ModalFooter>
                <Button color="default" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={handleStatusChange}>
                  OK
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}
export default Monitor
