import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  useDisclosure
} from '@nextui-org/react'
import { DeleteIcon } from 'assets/icons/DeleteIcon'
import { EditIcon } from 'assets/icons/EditIcon'
import { EyeIcon } from 'assets/icons/EyeIcon'
import { PlusIcon } from 'assets/icons/PlusIcon'
import MoleculeStructure from 'components/molecule-structure/MoleculeStructure'
import { Smiles } from 'pages/new/GeneralParam'
import { useCallback, useMemo, useState } from 'react'

interface Props {
  smilesList: Smiles[]
  onEdit: (id: string, smiles: string) => void
  onDelete: (id: string) => void
}

const columns = [
  {
    key: 'id',
    label: 'ID'
  },
  {
    key: 'smiles',
    label: 'SMILES'
  },
  {
    key: 'structure',
    label: 'Structure'
  },
  {
    key: 'actions',
    label: 'Actions'
  }
]

const MoleculeViewer: React.FC<Props> = ({ smilesList, onEdit, onDelete }) => {
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onOpenChange: onDeleteModalOpenChange
  } = useDisclosure()

  const {
    isOpen: isViewModalOpen,
    onOpen: onViewModalOpen,
    onOpenChange: onViewModalOpenChange
  } = useDisclosure()

  const [currentActionItem, setCurrentActionItem] = useState<Smiles>()

  const renderCell = useCallback(
    (item: Smiles, columnKey: string) => {
      const cellValue = item[columnKey as keyof Smiles]
      switch (columnKey) {
        case 'structure':
          return (
            <div className="flex items-center justify-center">
              <MoleculeStructure
                structure={item.smiles}
                width={100}
                height={100}
                svgMode
              />
            </div>
          )
        case 'actions':
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="View">
                <span
                  className="cursor-pointer text-lg text-default-400 active:opacity-50"
                  onClick={() => {
                    setCurrentActionItem({ id: item.id, smiles: item.smiles })
                    onViewModalOpen()
                  }}
                >
                  <EyeIcon />
                </span>
              </Tooltip>
              <Tooltip content="Edit">
                <span
                  className="cursor-pointer text-lg text-default-400 active:opacity-50"
                  onClick={() => {
                    onEdit(item.id, item.smiles)
                  }}
                >
                  <EditIcon />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete">
                <span
                  className="cursor-pointer text-lg text-danger active:opacity-50"
                  onClick={() => {
                    setCurrentActionItem({ id: item.id, smiles: item.smiles })
                    onDeleteModalOpen()
                  }}
                >
                  <DeleteIcon />
                </span>
              </Tooltip>
            </div>
          )
        default:
          return cellValue
      }
    },
    [onViewModalOpen, onEdit, onDeleteModalOpen]
  )

  const topContent = useMemo(() => {
    return (
      <div className="flex justify-end">
        <Button
          color="primary"
          endContent={<PlusIcon />}
          size="sm"
          onPress={() => onEdit('', '')}
        >
          Add New
        </Button>
      </div>
    )
  }, [onEdit])

  return (
    <div>
      <Table
        topContent={topContent}
        classNames={{
          base: 'max-h-[600px]'
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={smilesList}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, String(columnKey))}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Modal isOpen={isDeleteModalOpen} onOpenChange={onDeleteModalOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Warning</ModalHeader>
              <ModalBody>
                <p>
                  Are you sure you want to <b>detele</b> the molecule{' '}
                  <b>{currentActionItem?.id}</b>?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="danger"
                  variant="flat"
                  onPress={() => {
                    if (currentActionItem) {
                      onDelete(currentActionItem.id)
                    }
                    onClose()
                  }}
                >
                  OK
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal
        isOpen={isViewModalOpen}
        onOpenChange={onViewModalOpenChange}
        size="3xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {currentActionItem?.id}
              </ModalHeader>
              <ModalBody>
                <div className="flex items-center justify-center rounded-lg border-2">
                  <MoleculeStructure
                    structure={currentActionItem?.smiles}
                    width={600}
                    height={600}
                    svgMode
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="flat" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}
export default MoleculeViewer
