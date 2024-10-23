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
import { General } from './types/appConfig'
import { AppConfigPaths } from './types/path'
import { useEffect, useMemo, useState } from 'react'
import ChooseModal from 'components/choose-modal/ChooseModal'
import MoleculeEditor from 'components/molecule-editor/MoleculeEditor'
import MoleculeViewer from 'components/molecule-viewer/MoleculeViewer'
import { deleteSmiles, updateSmiles } from 'api/pages/new'
import { toast } from 'sonner'
import { getSmilesFromFile } from 'api/components/molecule-viewer'

interface Props {
  general: General
  handleUpdate: <V>(path: AppConfigPaths, value: V) => void
}

export interface Smiles {
  id: string
  smiles: string
}

export type FragmentsViewModalMode = 'viewer' | 'editor'

const GeneralParam: React.FC<Props> = ({ general, handleUpdate }) => {
  const [isFragmentsFileModalOpen, setIsFragmentsFileModalOpen] =
    useState(false)

  const {
    isOpen: isMoleculeViewModalOpen,
    onOpen: onMoleculeViewModalOpen,
    onOpenChange: onMoleculeViewModalOpenChange
  } = useDisclosure()

  const [fragmentsViewModalMode, setFragmentsViewModalMode] =
    useState<FragmentsViewModalMode>('viewer')
  const [smilesList, setSmilesList] = useState<Smiles[]>([])
  const [id4Edit, setId4Edit] = useState('')
  const [smiles4Edit, setSmiles4Edit] = useState('')
  const [smilesIdSet, setSmilesIdSet] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (isMoleculeViewModalOpen) {
      loadSmiles(general.fragments)
    } else {
      setFragmentsViewModalMode('viewer')
    }
  }, [general.fragments, isMoleculeViewModalOpen])

  useMemo(() => {
    const set = new Set<string>()
    smilesList.forEach((e: Smiles) => {
      set.add(e.id)
    })
    setSmilesIdSet(set)
  }, [smilesList])

  const loadSmiles = (smilesFilePath: string) => {
    getSmilesFromFile(smilesFilePath)
      .then((res) => {
        setSmilesList(res.data)
      })
      .catch((e) => {
        if (e.status === 400) {
          toast.error(e.response.data.error)
        } else {
          toast.error(e.message)
        }
      })
  }

  const handleFragmentsFileModalClose = () => {
    setIsFragmentsFileModalOpen(false)
  }

  const handleFragmentsFileSave = (directory: string) => {
    handleUpdate('general.fragments', directory)
  }

  const handleEditMolecule = (id: string, smiles: string) => {
    setSmiles4Edit(smiles)
    setId4Edit(id)
    setFragmentsViewModalMode('editor')
  }

  const handleSaveEdit = (id: string, smiles: string) => {
    updateSmiles(general.fragments, id, smiles)
      .then((res) => {
        toast.success(res.data.message)
        setFragmentsViewModalMode('viewer')
        loadSmiles(general.fragments)
      })
      .catch((e) => {
        if (e.status === 400) {
          toast.error(e.response.data.error)
        } else {
          toast.error(e.message)
        }
      })
  }

  const handleDeteleMolecule = (id: string) => {
    deleteSmiles(general.fragments, id)
      .then((res) => {
        toast.success(res.data.message)
        loadSmiles(general.fragments)
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
        General
      </span>
      <div className="mt-5 grid grid-cols-1  gap-x-6 gap-y-8 sm:grid-cols-8">
        <div className="sm:col-span-4">
          <Input
            type="text"
            labelPlacement="inside"
            label="Project Name"
            value={general.projectCode}
            isReadOnly
          />
        </div>
        <div className="sm:col-span-4">
          <Input
            type="text"
            labelPlacement="inside"
            label="Project Path"
            value={general.workdir}
            isReadOnly
          />
        </div>
        <div className="sm:col-span-6">
          <Input
            type="text"
            labelPlacement="inside"
            label="Fragments"
            value={general.fragments}
            onValueChange={(value) => {
              handleUpdate('general.fragments', value)
            }}
          />
        </div>
        <div className="flex items-center justify-start sm:col-span-1">
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
        <div className="flex items-center justify-start sm:col-span-1">
          <Button
            color="secondary"
            variant="flat"
            onPress={() => {
              onMoleculeViewModalOpen()
            }}
          >
            View
          </Button>
        </div>
        <div className="sm:col-span-2">
          <Input
            type="text"
            labelPlacement="inside"
            label="Number of Generations"
            value={general.numGen}
            onValueChange={(value) => {
              handleUpdate('general.numGen', value)
            }}
            validate={(e) => {
              if (!Number.isInteger(Number(e))) {
                return 'Please enter an integer'
              }
            }}
          />
        </div>
        <div className="sm:col-span-2">
          <Input
            type="text"
            labelPlacement="inside"
            label="Number per Generations"
            value={general.numPerGen}
            onValueChange={(value) => {
              handleUpdate('general.numPerGen', value)
            }}
            validate={(e) => {
              if (!Number.isInteger(Number(e))) {
                return 'Please enter an integer'
              }
            }}
          />
        </div>
        <div className="sm:col-span-2">
          <Input
            type="text"
            labelPlacement="inside"
            label="Seeds per Generations"
            value={general.seedPerGen}
            onValueChange={(value) => {
              handleUpdate('general.seedPerGen', value)
            }}
            validate={(e) => {
              if (!Number.isInteger(Number(e))) {
                return 'Please enter an integer'
              }
            }}
          />
        </div>
        <div className="sm:col-span-2">
          <Input
            type="text"
            labelPlacement="inside"
            label="Starting Generation"
            value={general.startGen}
            onValueChange={(value) => {
              handleUpdate('general.startGen', value)
            }}
            validate={(e) => {
              if (!Number.isInteger(Number(e))) {
                return 'Please enter an integer'
              }
            }}
          />
        </div>
        <div className="sm:col-span-2">
          <Input
            type="text"
            labelPlacement="inside"
            label="CPUs"
            value={general.cpu}
            onValueChange={(value) => {
              handleUpdate('general.cpu', value)
            }}
            validate={(e) => {
              if (!Number.isInteger(Number(e))) {
                return 'Please enter an integer'
              }
            }}
          />
        </div>
        <div className="sm:col-span-2">
          <Input
            type="text"
            labelPlacement="inside"
            label="GPUs"
            value={general.gpu}
            onValueChange={(value) => {
              handleUpdate('general.gpu', value)
            }}
            validate={(e) => {
              if (!Number.isInteger(Number(e))) {
                return 'Please enter an integer'
              }
            }}
          />
        </div>
        <div className="sm:col-span-2">
          <Input
            type="text"
            labelPlacement="inside"
            label="Customized Rule DB"
            value={general.ruleDb}
            onValueChange={(value) => {
              handleUpdate('general.ruleDb', value)
            }}
          />
        </div>
      </div>
      <div>
        {isFragmentsFileModalOpen && (
          <ChooseModal
            currentDirectory={general.fragments}
            mode="file"
            enableFolderCreation={false}
            isModalOpen={isFragmentsFileModalOpen}
            handleClose={handleFragmentsFileModalClose}
            onSave={handleFragmentsFileSave}
          ></ChooseModal>
        )}
      </div>
      <Modal
        isOpen={isMoleculeViewModalOpen}
        onOpenChange={onMoleculeViewModalOpenChange}
        size="4xl"
        classNames={{
          body: 'min-h-[620px] max-h-[620px]',
          closeButton: `${
            fragmentsViewModalMode === 'editor' ? 'invisible' : ''
          } `
        }}
        scrollBehavior="inside"
        isDismissable={fragmentsViewModalMode === 'editor' ? false : true}
        isKeyboardDismissDisabled={
          fragmentsViewModalMode === 'editor' ? true : false
        }
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {fragmentsViewModalMode === 'viewer'
                  ? 'Molecule Viewer'
                  : 'Molecule Editor'}
              </ModalHeader>
              <ModalBody>
                {fragmentsViewModalMode === 'viewer' && (
                  <div
                    className={`${
                      fragmentsViewModalMode === 'viewer' ? '' : 'invisible'
                    }`}
                  >
                    <MoleculeViewer
                      smilesList={smilesList}
                      onEdit={handleEditMolecule}
                      onDelete={handleDeteleMolecule}
                    />
                  </div>
                )}

                {fragmentsViewModalMode === 'editor' && (
                  <MoleculeEditor
                    smiles={smiles4Edit}
                    id={id4Edit}
                    smilesIdSet={smilesIdSet}
                    onSaveEdit={handleSaveEdit}
                    onModeChange={(mode) => {
                      setFragmentsViewModalMode(mode)
                    }}
                  />
                )}
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}

export default GeneralParam
