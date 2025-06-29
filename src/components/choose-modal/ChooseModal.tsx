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
  TableRow,
  Spinner,
  SortDescriptor
} from '@heroui/react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { ArrowBackIcon } from 'assets/icons/ArrowBackIcon'
import { CreateNewFolderIcon } from 'assets/icons/CreateNewFolderIcon'
import { createFolder, getDirectoryItems } from 'api/components/choose-modal'
import { toast } from 'sonner'
import { formatDistance } from 'date-fns'
import { filesize } from 'filesize'
import { Directory } from 'api/components/types/choose-modal'

interface Props {
  currentDirectory: string
  mode: 'file' | 'folder'
  isModalOpen: boolean
  enableFolderCreation: boolean
  handleClose: () => void
  onSave: (directory: string) => void
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
  enableFolderCreation,
  handleClose,
  onSave
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [isSaveable, setIsSaveable] = useState(false)
  const [directory, setDirectory] = useState(currentDirectory)
  const [prevDirectory, setPrevDirectory] = useState(currentDirectory)
  const [items, setItems] = useState<Directory[]>([])
  const [isFolderNameModalOpen, setIsFolderNameModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: 'name',
    direction: 'ascending'
  })

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
    setIsLoading(true)
    getDirectoryItems(directory)
      .then((data) => {
        setItems(data)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const sortedItems = useMemo(() => {
    return [...items].sort((a: Directory, b: Directory) => {
      let first, second
      if (sortDescriptor.column === 'size') {
        first = a[sortDescriptor.column]
        second = b[sortDescriptor.column]
        first = first === '-' ? 0 : (first as unknown as number)
        second = second === '-' ? 0 : (second as unknown as number)
      } else {
        first = a[sortDescriptor.column as keyof Directory].toLowerCase()
        second = b[sortDescriptor.column as keyof Directory].toLowerCase()
      }

      const cmp = first < second ? -1 : first > second ? 1 : 0

      return sortDescriptor.direction === 'descending' ? -cmp : cmp
    })
  }, [sortDescriptor, items])

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
      createFolder(directory, folderName).then((data) => {
        toast.success(data.message)
        getItems(directory)
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

          {enableFolderCreation && (
            <Button isIconOnly color="default" onPress={createNewFolder}>
              <CreateNewFolderIcon />
            </Button>
          )}
        </div>
        <Table
          selectionMode="single"
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
          sortDescriptor={sortDescriptor}
          onSortChange={setSortDescriptor}
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key} allowsSorting>
                {column.label}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody
            items={sortedItems}
            isLoading={isLoading}
            loadingContent={<Spinner />}
          >
            {(item) => (
              <TableRow key={item.name}>
                {(columnKey) => (
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
