import { Button, Input } from '@nextui-org/react'
import { General } from './types/appConfig'
import { AppConfigPaths } from './types/path'
import { useState } from 'react'
import ChooseModal from 'components/choose-modal/ChooseModal'

interface Props {
  general: General
  handleUpdate: <V>(path: AppConfigPaths, value: V) => void
}

const GeneralParam: React.FC<Props> = ({ general, handleUpdate }) => {
  const [isFragmentsFileModalOpen, setIsFragmentsFileModalOpen] =
    useState(false)

  const handleFragmentsFileModalClose = () => {
    setIsFragmentsFileModalOpen(false)
  }

  const handleFragmentsFileSave = (directory: string) => {
    handleUpdate('general.fragments', directory)
  }

  return (
    <div>
      <span className="text-xl font-semibold leading-7 text-gray-900">
        General
      </span>
      <div className="mt-5 grid grid-cols-1 items-center gap-x-6 gap-y-8 sm:grid-cols-8">
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
        <div className="sm:col-span-1">
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
        <div className="sm:col-span-1">
          <Button color="secondary" variant="flat" onPress={() => {}}>
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
            isModalOpen={isFragmentsFileModalOpen}
            handleClose={handleFragmentsFileModalClose}
            onSave={handleFragmentsFileSave}
          ></ChooseModal>
        )}
      </div>
    </div>
  )
}

export default GeneralParam
