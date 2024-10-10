import { Input } from '@nextui-org/react'

function DockingParameters() {
  return (
    <div>
      <span className="text-xl font-semibold leading-7 text-gray-900">
        Docking Parameters
      </span>
      <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="gap-3 sm:col-span-6">
          <span className="text-lg font-medium leading-7 text-gray-900 ">
            Docking Box
          </span>
        </div>

        <div className="sm:col-span-2">
          <Input type="text" labelPlacement="inside" label="X" />
        </div>
        <div className="sm:col-span-2">
          <Input type="text" labelPlacement="inside" label="Y" />
        </div>
        <div className="sm:col-span-2">
          <Input type="text" labelPlacement="inside" label="Z" />
        </div>
        <div className="sm:col-span-2">
          <Input type="text" labelPlacement="inside" label="X Box Size" />
        </div>
        <div className="sm:col-span-2">
          <Input type="text" labelPlacement="inside" label="Y Box Size" />
        </div>
        <div className="sm:col-span-2">
          <Input type="text" labelPlacement="inside" label="Z Box Size" />
        </div>

        <div className="gap-3 sm:col-span-6">
          <span className="text-lg font-medium leading-7 text-gray-900 ">
            Optimization Direction
          </span>
        </div>
        <div className="sm:col-span-4">
          <Input
            type="text"
            labelPlacement="inside"
            label="RMSE Threshold (Å)"
          />
        </div>
        <div className="sm:col-span-4">
          <Input
            type="text"
            labelPlacement="inside"
            label="Delta Score (kcal/mol)"
          />
        </div>
        <div className="sm:col-span-4">
          <Input
            type="text"
            labelPlacement="inside"
            label="Score Cutoff (kcal/mol)"
          />
        </div>
      </div>
    </div>
  )
}

export default DockingParameters
