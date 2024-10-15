import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@nextui-org/react'
import { useCallback, useEffect, useState } from 'react'
import { ArrowBackIcon } from 'assets/icons/ArrowBackIcon'
import { CreateNewFolderIcon } from 'assets/icons/CreateNewFolderIcon'
import { createFolder, getDirectoryItems } from 'api/components/choose-modal'
import { toast } from 'sonner'
import { formatDistance } from 'date-fns'
import { filesize } from 'filesize'

interface Props {
  currentDirectory: string
  mode: 'file' | 'folder'
  isModalOpen: boolean
  handleClose: () => void
  onSave: (directory: string) => void
}

interface Directory {
  name: string
  type: 'file' | 'folder'
  size: string
  lastModified: string
}

interface NewFolderNameModalProps {
  isFolderNameModalOpen: boolean
  handleClose: () => void
}

const columns = [
  {
    key: 'name',
    label: 'Name'
  },
  {
    key: 'lastModified',
    label: 'Last Modified'
  },
  {
    key: 'size',
    label: 'Size'
  }
]

const ChooseModal: React.FC<Props> = ({
  currentDirectory,
  mode,
  isModalOpen,
  handleClose,
  onSave
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [isSaveable, setIsSaveable] = useState(false)
  const [directory, setDirectory] = useState(currentDirectory)
  const [prevDirectory, setPrevDirectory] = useState(currentDirectory)
  const [items, setItems] = useState<Directory[]>([])
  const [isFolderNameModalOpen, setIsFolderNameModalOpen] = useState(false)

  useEffect(() => {
    if (isModalOpen) {
      onOpen()
      setDirectory(currentDirectory)
      //directory
      if (currentDirectory.endsWith('/')) {
        setPrevDirectory(currentDirectory)
        getItems(currentDirectory)
      } //file
      else {
        const slicedDirectory =
          currentDirectory.substring(0, currentDirectory.lastIndexOf('/')) + '/'
        setPrevDirectory(slicedDirectory)
        getItems(slicedDirectory)
      }
    }
  }, [isModalOpen, onOpen, currentDirectory])

  useEffect(() => {
    if (mode == 'folder' && directory.endsWith('/')) {
      setIsSaveable(true)
    } else if (mode == 'file' && !directory.endsWith('/')) {
      setIsSaveable(true)
    } else {
      setIsSaveable(false)
    }
  }, [mode, directory])

  const handleSave = () => {
    currentDirectory = directory
    onSave(directory)
    handleClose()
  }

  const getItems = (directory: string) => {
    getDirectoryItems(directory)
      .then((res) => {
        setItems(res.data)
      })
      .catch((e) => {
        if (e.status === 400) {
          toast.error(e.response.data.error)
        } else {
          toast.error(e.message)
        }
      })
  }

  const returnToParentFolder = () => {
    const cleanedPath = directory.endsWith('/')
      ? directory.slice(0, -1)
      : directory // Remove trailing slash if it exists
    const newDirectory =
      directory.substring(0, cleanedPath.lastIndexOf('/')) + '/'
    setDirectory(newDirectory)
    setPrevDirectory(newDirectory)
    getItems(newDirectory)
  }

  const createNewFolder = () => {
    setIsFolderNameModalOpen(true)
  }

  const handleFolderNameModalClose = () => {
    setIsFolderNameModalOpen(false)
  }

  const NewFolderNameModal: React.FC<NewFolderNameModalProps> = ({
    isFolderNameModalOpen,
    handleClose
  }) => {
    const modal = useDisclosure()
    const [folderName, setFolderName] = useState('')
    useEffect(() => {
      if (isFolderNameModalOpen) {
        modal.onOpen()
      }
    }, [isFolderNameModalOpen, modal])

    const handleSave = () => {
      createFolder(directory, folderName)
        .then((res) => {
          toast.success(res.data.message)
          getItems(directory)
        })
        .catch((err) => {
          toast.error(err.response.data.error)
        })
      handleClose()
    }

    return (
      <Modal
        isOpen={isFolderNameModalOpen}
        onOpenChange={modal.onOpenChange}
        onClose={handleClose}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create New Folder
              </ModalHeader>
              <ModalBody>
                <Input
                  placeholder="Please input folder name"
                  value={folderName}
                  onValueChange={setFolderName}
                ></Input>
              </ModalBody>
              <ModalFooter>
                <Button color="default" onPress={handleClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handleSave}>
                  Create
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    )
  }

  const ChooseModalContent = () => {
    const renderCell = useCallback((item: Directory, columnKey: string) => {
      const cellValue = item[columnKey as keyof Directory]
      switch (columnKey) {
        case 'lastModified':
          return formatDistance(new Date(cellValue), new Date(), {
            addSuffix: true
          })
        case 'size':
          return cellValue === '-' ? '-' : filesize(cellValue)
        default:
          return cellValue
      }
    }, [])
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-1">
          <Input
            variant="underlined"
            isDisabled
            type="text"
            label=""
            value={directory}
          />

          <Button isIconOnly color="default" onPress={returnToParentFolder}>
            <ArrowBackIcon />
          </Button>

          {mode === 'folder' && (
            <Button isIconOnly color="default" onPress={createNewFolder}>
              <CreateNewFolderIcon />
            </Button>
          )}
        </div>
        <Table
          aria-label="Example table with dynamic content"
          selectionMode="multiple"
          selectionBehavior="replace"
          classNames={{
            base: 'max-h-[450px]'
          }}
          onRowAction={(key) => {
            const selectedItem = items.find((item) => item.name === key)
            if (selectedItem?.type === 'folder') {
              const newDirectory = prevDirectory + key + '/'
              setDirectory(newDirectory)
              setPrevDirectory(newDirectory)
              getItems(newDirectory)
            } else if (selectedItem?.type === 'file') {
              const newDirectory = prevDirectory + key
              setDirectory(newDirectory)
            }
          }}
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={items}>
            {(item) => (
              <TableRow key={item.name}>
                {(columnKey) => (
                  // <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                  <TableCell>{renderCell(item, String(columnKey))}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    )
  }

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={handleClose}
      size="2xl"
      classNames={{
        body: 'min-h-[520px] max-h-[520px]'
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {mode === 'folder' ? 'Choose Directory' : 'Choose File'}
            </ModalHeader>
            <ModalBody>
              <ChooseModalContent />
              <NewFolderNameModal
                isFolderNameModalOpen={isFolderNameModalOpen}
                handleClose={handleFolderNameModalClose}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="default" onPress={onClose}>
                Close
              </Button>
              <Button
                color="primary"
                onPress={handleSave}
                isDisabled={!isSaveable}
              >
                Save
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default ChooseModal
