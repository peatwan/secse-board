import {
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@nextui-org/react'
import MoleculeStructure from 'components/molecule-structure/MoleculeStructure'
import { useCallback, useState } from 'react'

const columns = [
  { key: 'idGen', label: 'ID' },
  { key: 'structure', label: 'Structure' },
  { key: 'dockingScore', label: 'Docking Score' },
  { key: 'deltaDockingScore', label: 'Delta Docking Score' },
  { key: 'rmsd', label: 'RMSD' },
  { key: 'smiles', label: 'SMILES' }
]
interface GenerationResult {
  idGen: string
  smilesGen: string
  dockingScore: string
  deltaDockingScore: string
  rmsd: string
}

const GenDetails = () => {
  const [generationSelected, setGenerationSelected] = useState('')
  const [fileSelected, setFileSelected] = useState('generationResult')
  const [generationResultList, setGenerationResultList] = useState<
    GenerationResult[]
  >([])

  const generationList = [
    { label: '1', key: 'generation_1' },
    { label: '2', key: 'generation_2' },
    { label: '3', key: 'generation_3' },
    { label: '4', key: 'generation_4' },
    { label: '5', key: 'generation_5' },
    { label: '6', key: 'generation_6' },
    { label: '7', key: 'generation_7' },
    { label: '8', key: 'generation_8' },
    { label: '9', key: 'generation_9' },
    { label: '10', key: 'generation_10' }
  ]
  const fileList = [
    // { key: 'seedFragments', label: 'Seed Fragments' },
    { key: 'generationResult', label: 'Generation Result' }
  ]

  const renderCell = useCallback(
    (item: GenerationResult, columnKey: string) => {
      const cellValue = item[columnKey as keyof GenerationResult]
      switch (columnKey) {
        case 'smiles_gen':
          return (
            <div className="flex items-center justify-center">
              <MoleculeStructure
                structure={item.smilesGen}
                width={100}
                height={100}
                svgMode
              />
            </div>
          )
        default:
          return cellValue
      }
    },
    []
  )
  return (
    <div>
      <div>
        <span className="text-2xl font-semibold leading-7 text-gray-900">
          Generation Details
        </span>
        <div className="flex items-center justify-start gap-10 pt-10">
          <div className="w-2/5">
            <Select
              label="Generation"
              placeholder="Select a generation"
              selectedKeys={[generationSelected]}
              onSelectionChange={(keys) => {
                const value = keys.currentKey
                setGenerationSelected(value ? value : '')
              }}
            >
              {generationList.map((item) => (
                <SelectItem key={item.key}>{item.label}</SelectItem>
              ))}
            </Select>
          </div>
          <div className="w-2/5">
            <Select
              label="File"
              placeholder="Select a file"
              selectedKeys={[fileSelected]}
              isDisabled={generationSelected ? false : true}
              onSelectionChange={(keys) => {
                const value = keys.currentKey
                setFileSelected(value ? value : '')
              }}
            >
              {fileList.map((item) => (
                <SelectItem key={item.key}>{item.label}</SelectItem>
              ))}
            </Select>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-3">
          <div className="sm:col-span-3">
            <Table
              classNames={{
                base: 'max-h-[600px]',
                td: 'break-words'
              }}
            >
              <TableHeader columns={columns}>
                {(column) => (
                  <TableColumn key={column.key}>{column.label}</TableColumn>
                )}
              </TableHeader>
              <TableBody items={generationResultList}>
                {(item) => (
                  <TableRow key={item.idGen}>
                    {(columnKey) => (
                      <TableCell>
                        {renderCell(item, String(columnKey))}
                      </TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GenDetails
