import { Input } from '@nextui-org/react'

function DefaultParameters() {
  return (
    <div>
      <span className="text-xl font-semibold leading-7 text-gray-900">
        Default Parameters
      </span>
      <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-2">
          <Input
            type="text"
            labelPlacement="inside"
            label="Number of Generations"
          />
        </div>
        <div className="sm:col-span-2">
          <Input
            type="text"
            labelPlacement="inside"
            label="Number per Generations"
          />
        </div>
        <div className="sm:col-span-2">
          <Input
            type="text"
            labelPlacement="inside"
            label="Seeds per Generations"
          />
        </div>

        <div className="sm:col-span-3">
          <Input type="text" labelPlacement="inside" label="CPUs" />
        </div>
        <div className="sm:col-span-3">
          <Input type="text" labelPlacement="inside" label="GPUs" />
        </div>
      </div>
    </div>
  )
}

export default DefaultParameters
