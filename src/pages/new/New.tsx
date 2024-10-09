import { Button } from '@nextui-org/react'
import Project from './Project'
import DefaultParameters from './DefaultParameters'
import DockingParameters from './DockingParameters'
import MolecularProperties from './MolecularProperties'
import PredictionParameters from './PredictionParameters'
import { useState } from 'react'
import { getConfig } from 'api/pages/new'
import { toast } from 'sonner'
import { AppConfig } from './types/config'

export const New = () => {
  const [projectPath, setProjectPath] = useState('')
  const [isProjectConfigDisabled, setIsProjectConfigDisabled] = useState(false)

  const [appConfig, setAppConfig] = useState<AppConfig>()

  const handleProjectCreated = (projectPath: string) => {
    setProjectPath(projectPath)
    setIsProjectConfigDisabled(true)
    getConfig(projectPath)
      .then((res) => {
        setAppConfig(res.data as AppConfig)
      })
      .catch((e) => {
        toast.error(e.message)
      })
  }

  return (
    <div>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-10">
          <Project
            handleProjectCreated={handleProjectCreated}
            isProjectConfigDisabled={isProjectConfigDisabled}
          />
        </div>
        <div className="border-b border-gray-900/10 pb-10">
          <DefaultParameters />
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
        <Button color="danger" variant="flat">
          Reset
        </Button>
        <Button color="primary">Save</Button>
      </div>
    </div>
  )
}
