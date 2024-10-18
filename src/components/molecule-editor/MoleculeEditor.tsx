import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
  useDisclosure
} from '@nextui-org/react'
import { ArrowBackIcon } from 'assets/icons/ArrowBackIcon'
import { SaveIcon } from 'assets/icons/SaveIcon'
import { FragmentsViewModalMode } from 'pages/new/GeneralParam'
import { useEffect, useRef } from 'react'

interface Props {
  id: string
  smiles: string
  onSaveEdit: (id: string, smiles: string) => void
  onModeChange: (mode: FragmentsViewModalMode) => void
}

type ChemicalViewType = {
  getSmiles: () => string
} | null

// Function to dynamically load external scripts
const loadScript = (src: string, onload: () => void) => {
  if (!document.querySelector(`script[src="${src}"]`)) {
    const script = document.createElement('script')
    script.src = src
    script.async = true
    script.onload = onload
    document.body.appendChild(script)
  } else {
    onload() // If the script is already loaded, call onload directly
  }
}

const MoleculeEditor: React.FC<Props> = ({
  id,
  smiles,
  onSaveEdit,
  onModeChange
}) => {
  const instance = useRef<ChemicalViewType>(null)
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  useEffect(() => {
    let chemicalEditorInstance: ChemicalViewType = null

    // Load the moledit.js script when the component mounts
    loadScript('https://molsoft.com/lib/moledit.js', () => {
      //@ts-expect-error ChemicalView is from moledit.js
      if (window.ChemicalView && !chemicalEditorInstance) {
        //@ts-expect-error ChemicalView is from moledit.js
        chemicalEditorInstance = new window.ChemicalView(smiles, 'editor')
        instance.current = chemicalEditorInstance
      }
    })
    // Cleanup function to remove the ChemicalView instance when unmounting
    return () => {
      if (chemicalEditorInstance) {
        const editorElement = document.getElementById('editor')
        if (editorElement) {
          // Clear the inner HTML or remove the child nodes manually
          editorElement.innerHTML = ''
        }
        chemicalEditorInstance = null // Dereference the instance
      }
    }
  }, [smiles]) // Empty dependency array ensures this runs only once

  const handleSave = () => {
    if (instance.current) {
      onSaveEdit(id, instance.current.getSmiles())
    }
  }

  const handleBack = () => {
    onOpen()
    // onModeChange('viewer')
  }

  return (
    <div className="flex flex-col gap-4 py-2">
      <div className="flex justify-start gap-2">
        <div className="max-w-80">
          <Input
            variant="flat"
            isDisabled
            type="text"
            label="Molecule ID:"
            labelPlacement="outside-left"
            value={id}
          />
        </div>
        <Tooltip content="Return to viewer" delay={500}>
          <Button isIconOnly color="default" onPress={handleBack}>
            <ArrowBackIcon />
          </Button>
        </Tooltip>
        <Tooltip content="Save" delay={500}>
          <Button isIconOnly color="default" onPress={handleSave}>
            <SaveIcon />
          </Button>
        </Tooltip>
      </div>
      <div
        id="editor"
        style={{
          width: '848px',
          height: '530px',
          border: '2px solid gray',
          borderRadius: '5px'
        }}
      ></div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Warning</ModalHeader>
              <ModalBody>
                <p>
                  All unsaved modification will be <b>lost</b>. Are you sure you
                  want to <b>return to viewer</b>?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="danger"
                  variant="flat"
                  onPress={() => onModeChange('viewer')}
                >
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

export default MoleculeEditor
