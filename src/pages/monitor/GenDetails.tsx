import {
  Button,
  Select,
  SelectionMode,
  SelectItem,
  Spinner,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@heroui/react'
import { getGenerationDetails } from 'api/pages/monitor'
import { GenerationDetails, GenerationResult } from 'api/pages/types/monitor'
import Molecule3DViewer, {
  Molecule3DViewerHandle
} from 'components/molecule-3d-viewer/Molecule3DViewer'
import MoleculeStructure from 'components/molecule-structure/MoleculeStructure'
import { useCallback, useEffect, useRef, useState } from 'react'
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

  const [selectionMode, setSelectionMode] = useState<SelectionMode>('multiple')
  const generationList = Array.from({ length: currentGeneration }, (_, i) => {
    return { key: String(i + 1), label: String(i + 1) }
  })

  const fileList = [{ key: 'generationResult', label: 'Generation Result' }]

  const [isTableDataLoading, setIsTableDataLoading] = useState(false)

  const molecule3DViewerRef = useRef<Molecule3DViewerHandle>(null)

  const handleRecenterClick = () => {
    molecule3DViewerRef.current?.handleRecenter()
  }

  const projectPathChangedRef = useRef(false)

  useEffect(() => {
    setGenerationSelected('')
    projectPathChangedRef.current = true
  }, [projectPath])

  useEffect(() => {
    setGenerationDetailsList([])
    setSelectedKeys(new Set())

    if (projectPathChangedRef.current) {
      projectPathChangedRef.current = false
      return
    }

    if (projectPath && generationSelected && fileSelected) {
      setIsTableDataLoading(true)
      getGenerationDetails(projectPath, generationSelected, fileSelected)
        .then((data) => {
          setGenerationDetailsList(data)
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
                id={item.id}
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
        <div className="flex items-center justify-between gap-10 pt-10">
          <div className="flex w-4/5 items-center justify-start gap-10">
            <div className="w-1/4">
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
            <div className="w-1/4">
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
            <div>
              <Switch
                isSelected={selectionMode === 'multiple'}
                color="default"
                onValueChange={() => {
                  if (selectionMode === 'multiple') {
                    setSelectedKeys(new Set())
                    setSelectionMode('none')
                  } else {
                    setSelectionMode('multiple')
                  }
                }}
              >
                Row Selection
              </Switch>
            </div>
          </div>
          <div className="mr-1">
            <Button
              onPress={() => {
                handleRecenterClick()
              }}
            >
              Recenter
            </Button>
          </div>
        </div>
        <div className="mt-5 flex items-start justify-between gap-5">
          <div className="w-3/5">
            <Table
              selectionMode={selectionMode}
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
                base: 'max-h-[650px] min-h-[650px]',
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
                ref={molecule3DViewerRef}
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
