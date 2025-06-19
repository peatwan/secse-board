import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure
} from '@heroui/react'
import GeneralParam from './GeneralParam'
import DockingParam from './DockingParam'
import PropertiesParam from './PropertiesParam'
import PredictionParam from './PredictionParam'
import { useEffect, useState } from 'react'
import { getConfig, saveConfig } from 'api/pages/new'
import { toast } from 'sonner'
import { AppConfig } from './types/appConfig'
import { useProjectStore } from 'utils/store'
import { AppConfigImpl } from './types/appConfigImpl'
import { AppConfigPaths } from './types/path'
import { updateNestedProperty } from 'utils'

const Param = () => {
  const { path, status } = useProjectStore()
  const [appConfig, setAppConfig] = useState<AppConfig>(new AppConfigImpl())
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

  useEffect(() => {
    if (status === 'Created' && path) {
      getConfig(path).then((data) => {
        setAppConfig(data)
      })
    }
  }, [path, setAppConfig, status])

  // Generic updater function
  const handleUpdate = function <V>(path: AppConfigPaths, value: V) {
    setAppConfig((prevConfig) => updateNestedProperty(prevConfig, path, value))
  }

  const handleSave = () => {
    saveConfig(path, appConfig).then((data) => {
      toast.success(data.message)
    })
  }

  const handleReset = () => {
    if (status === 'Created' && path) {
      getConfig(path).then((data) => {
        setAppConfig(data)
      })
    }
    onClose()
  }

  return (
    <div>
      <div className="flex items-center justify-center">
        <div>
          <div className="py-6">
            <Breadcrumbs>
              <BreadcrumbItem href="/#/new">New</BreadcrumbItem>
              <BreadcrumbItem href="/#/new/param">Param</BreadcrumbItem>
            </Breadcrumbs>
          </div>

          <div className="space-y-12 ">
            <div className="border-b border-gray-900/10 pb-10">
              <GeneralParam
                general={appConfig.general}
                handleUpdate={handleUpdate}
              />
            </div>
            <div className="border-b border-gray-900/10 pb-10">
              <DockingParam
                docking={appConfig.docking}
                handleUpdate={handleUpdate}
              />
            </div>
            <div className="border-b border-gray-900/10 pb-10">
              <PropertiesParam
                properties={appConfig.properties}
                handleUpdate={handleUpdate}
              />
            </div>
            <div className="border-b border-gray-900/10 pb-10">
              <PredictionParam
                prediction={appConfig.prediction}
                handleUpdate={handleUpdate}
              />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6 pb-10">
            <Button color="danger" variant="flat" onPress={onOpen}>
              Reset
            </Button>
            <Button color="primary" onPress={handleSave}>
              Save
            </Button>
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Warning</ModalHeader>
              <ModalBody>
                <p>
                  All unsaved changes will be <b>lost</b>. Are you sure you want
                  to <b>reset</b>?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="danger" variant="flat" onPress={handleReset}>
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

export default Param
