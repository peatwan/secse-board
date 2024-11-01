import {
  Select,
  SelectItem,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@nextui-org/react'
import { getGenerationDetails } from 'api/pages/monitor'
import { GenerationDetails, GenerationResult } from 'api/types/monitor'
import Molecule3DViewer from 'components/molecule-3d-viewer/Molecule3DViewer'
import MoleculeStructure from 'components/molecule-structure/MoleculeStructure'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useProjectStore } from 'utils/store'

const generationResultColumns = [
  { key: 'id', label: 'ID' },
  { key: 'structure', label: 'Structure' },
  { key: 'dockingScore', label: 'Docking Score' },
  { key: 'deltaDockingScore', label: 'Delta Docking Score' },
  { key: 'rmsd', label: 'RMSD' },
  { key: 'smiles', label: 'SMILES' }
]

const GenDetails = () => {
  const { path: projectPath, currentGeneration } = useProjectStore()
  const [generationSelected, setGenerationSelected] = useState('')
  const [fileSelected, setFileSelected] = useState('generationResult')
  const [generationDetailsList, setGenerationDetailsList] = useState<
    GenerationDetails[]
  >([])
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set([]))

  const generationList = Array.from({ length: currentGeneration }, (_, i) => {
    return { key: String(i + 1), label: String(i + 1) }
  })

  const fileList = [{ key: 'generationResult', label: 'Generation Result' }]

  const [isTableDataLoading, setIsTableDataLoading] = useState(false)

  useEffect(() => {
    setGenerationDetailsList([])
    setSelectedKeys(new Set())
    if (projectPath && generationSelected && fileSelected) {
      setIsTableDataLoading(true)
      getGenerationDetails(projectPath, generationSelected, fileSelected)
        .then((res) => {
          setGenerationDetailsList(res.data)
        })
        .catch((e) => {
          if (e.status === 400) {
            toast.error(e.response.data.error)
          } else {
            toast.error(e.message)
          }
        })
        .finally(() => {
          setIsTableDataLoading(false)
        })
    }
  }, [fileSelected, generationSelected, projectPath])

  const renderCell = useCallback(
    (item: GenerationDetails, columnKey: string) => {
      const cellValue = item[columnKey as keyof GenerationDetails]
      switch (columnKey) {
        case 'structure':
          return (
            <div className="flex items-center justify-center">
              <MoleculeStructure
                structure={(item as GenerationResult).smiles}
                width={150}
                height={150}
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
          <div className="w-1/5">
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
          <div className="w-1/5">
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
        <div className="mt-5 flex justify-start gap-5">
          <div className="w-3/5">
            <Table
              selectionMode="multiple"
              isCompact
              aria-label="Generation Details Table"
              selectedKeys={selectedKeys}
              onSelectionChange={(keys) => {
                if (keys === 'all') {
                  const keyArr = generationDetailsList.map((e) => e.id)
                  setSelectedKeys(new Set(keyArr))
                } else {
                  setSelectedKeys(keys as Set<string>)
                }
              }}
              classNames={{
                base: 'max-h-[650px] min-h-[650px] w-auto',
                td: 'break-words'
              }}
            >
              <TableHeader columns={generationResultColumns}>
                {(column) => (
                  <TableColumn key={column.key}>{column.label}</TableColumn>
                )}
              </TableHeader>
              <TableBody
                items={generationDetailsList}
                isLoading={isTableDataLoading}
                loadingContent={<Spinner label="Loading..." />}
              >
                {(item) => (
                  <TableRow key={item.id}>
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
          <div className="h-[650px] w-2/5">
            <div className="z-0 rounded-large bg-content1 p-1 shadow-small">
              <Molecule3DViewer
                path={projectPath}
                generation={generationSelected}
                idSet={selectedKeys as Set<string>}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GenDetails
