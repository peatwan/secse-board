import { BreadcrumbItem, Breadcrumbs, Button } from '@nextui-org/react'
import DefaultParameters from './DefaultParameters'
import DockingParameters from './DockingParameters'
import MolecularProperties from './MolecularProperties'
import PredictionParameters from './PredictionParameters'
import { useEffect, useState } from 'react'
import { getConfig } from 'api/pages/new'
import { toast } from 'sonner'
import { AppConfig } from './types/appConfig'
import { useProjectStore } from 'utils/store'
import { AppConfigImpl } from './types/appConfigImpl'
import { AppConfigPaths } from './types/path'
import { updateNestedProperty } from 'utils'

const Param = () => {
  const { path, status } = useProjectStore()
  const [appConfig, setAppConfig] = useState<AppConfig>(new AppConfigImpl())

  useEffect(() => {
    if (status === 'Created' && path) {
      getConfig(path)
        .then((res) => {
          setAppConfig(res.data)
        })
        .catch((e) => {
          toast.error(e.message)
        })
    }
  }, [path, setAppConfig, status])

  // Generic updater function
  const handleUpdate = function <V>(path: AppConfigPaths, value: V) {
    setAppConfig((prevConfig) => updateNestedProperty(prevConfig, path, value))
  }

  const handleSave = () => {
    console.log(appConfig)
  }

  const handleReset = () => {
    if (status === 'Created' && path) {
      getConfig(path)
        .then((res) => {
          setAppConfig(res.data)
        })
        .catch((e) => {
          toast.error(e.message)
        })
    }
  }

  return (
    <div>
      <div className="flex items-center justify-center">
        <div>
          <div className="py-6">
            <Breadcrumbs>
              <BreadcrumbItem href="/new">New</BreadcrumbItem>
              <BreadcrumbItem href="/new/param">Param</BreadcrumbItem>
            </Breadcrumbs>
          </div>

          <div className="space-y-12 ">
            <div className="border-b border-gray-900/10 pb-10">
              <DefaultParameters
                defaultConfig={appConfig.defaultConfig}
                handleUpdate={handleUpdate}
              />
            </div>
            <div className="border-b border-gray-900/10 pb-10">
              <DockingParameters />
            </div>
            <div className="border-b border-gray-900/10 pb-10">
              <MolecularProperties />
            </div>
            <div className="border-b border-gray-900/10 pb-10">
              <PredictionParameters />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6 pb-10">
            <Button color="danger" variant="flat" onPress={handleReset}>
              Reset
            </Button>
            <Button color="primary" onPress={handleSave}>
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Param
