import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@nextui-org/react'
import { getSmilesFromFile } from 'api/components/molecule-viewer'
import MoleculeStructure from 'components/molecule-structure/MoleculeStructure'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'

interface Props {
  smilesFilePath: string
  handleEdit: (smiles: string) => void
}

interface Smiles {
  id: string
  smiles: string
}

const columns = [
  {
    key: 'id',
    label: 'ID'
  },
  {
    key: 'smiles',
    label: 'Smiles'
  },
  {
    key: 'structure',
    label: 'Structure'
  }
]

const MoleculeViewer: React.FC<Props> = ({ smilesFilePath, handleEdit }) => {
  const [items, setItems] = useState<Smiles[]>([])
  const renderCell = useCallback((item: Smiles, columnKey: string) => {
    const cellValue = item[columnKey as keyof Smiles]
    switch (columnKey) {
      case 'structure':
        return (
          <MoleculeStructure
            id="structure-example-svg-aspirin"
            structure={item.smiles}
            width={100}
            height={100}
            svgMode
          />
        )

      default:
        return cellValue
    }
  }, [])
  useEffect(() => {
    getSmilesFromFile(smilesFilePath)
      .then((res) => {
        setItems(res.data)
      })
      .catch((e) => {
        if (e.status === 400) {
          toast.error(e.response.data.error)
        } else {
          toast.error(e.message)
        }
      })
  }, [smilesFilePath])
  return (
    <div>
      <Table
        classNames={{
          base: 'max-h-[500px]'
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={items}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                // <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                <TableCell>{renderCell(item, String(columnKey))}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
export default MoleculeViewer
