import { Input } from '@nextui-org/react'

function PropertiesParam() {
  return (
    <div>
      <span className="text-xl font-semibold leading-7 text-gray-900">
        Molecular Properties
      </span>
      <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-4">
          <Input
            type="text"
            labelPlacement="inside"
            label="Maximum Molecular Weight"
          />
        </div>
        <div className="sm:col-span-3">
          <Input type="text" labelPlacement="inside" label="logP Lower" />
        </div>
        <div className="sm:col-span-3">
          <Input type="text" labelPlacement="inside" label="logP Upper" />
        </div>
        <div className="sm:col-span-3">
          <Input
            type="text"
            labelPlacement="inside"
            label="Chiral Center Less Than"
          />
        </div>
        <div className="sm:col-span-3">
          <Input
            type="text"
            labelPlacement="inside"
            label="Heteroatom Ratio Less Than"
          />
        </div>
        <div className="sm:col-span-3">
          <Input
            type="text"
            labelPlacement="inside"
            label="Rdkit Rotatable Bound Number Less Than"
          />
        </div>
        <div className="sm:col-span-3">
          <Input
            type="text"
            labelPlacement="inside"
            label="Rigid Body Number Less Than"
          />
        </div>
      </div>
    </div>
  )
}

export default PropertiesParam
