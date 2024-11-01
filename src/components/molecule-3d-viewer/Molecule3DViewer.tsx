import { useEffect, useRef } from 'react'
import * as $3Dmol from '3dmol'
import { getGenerationResultFile, getTargetFile } from 'api/pages/monitor'
import { getSetDifference } from 'utils'
import { toast } from 'sonner'

interface Props {
  path: string
  generation: string
  idSet: Set<string>
}

let viewer: $3Dmol.GLViewer
let targetModal: $3Dmol.GLModel
let moleculeModalList: { id: string; modal: $3Dmol.GLModel }[] = []
const Molecule3DViewer: React.FC<Props> = ({ path, generation, idSet }) => {
  const idSetPrev = useRef<Set<string>>(new Set([]))

  useEffect(() => {
    const element = document.querySelector('#container-01')
    const config = { backgroundColor: 'white' }
    viewer = $3Dmol.createViewer(element, config)
    if (path) {
      getTargetFile(path)
        .then((res) => {
          targetModal = viewer.addModel(res.data, 'pdb')
          targetModal.setStyle({ cartoon: { color: 'lightblue' } })
          viewer.render()
          viewer.zoomTo()
        })
        .catch((e) => {
          if (e.status === 400) {
            toast.error(e.response.data.error)
          } else {
            toast.error(e.message)
          }
        })
    }
  }, [path])

  useEffect(() => {
    // Find elements in set1 but not in set2
    const diff1 = getSetDifference(idSetPrev.current, idSet)
    if (diff1.size > 0) {
      const removedModalList = moleculeModalList.filter((e) => diff1.has(e.id))
      removedModalList.forEach((e) => {
        viewer.removeModel(e.modal)
      })
      viewer.render()
      moleculeModalList = moleculeModalList.filter((e) => !diff1.has(e.id))
    }

    // Find elements in set2 but not in set1
    const diff2 = getSetDifference(idSet, idSetPrev.current)
    idSetPrev.current = idSet
    if (diff2.size > 0) {
      diff2.forEach((id) => {
        getGenerationResultFile(path, generation, id)
          .then((res) => {
            const modal = viewer.addModel(res.data, 'sdf')
            modal.setStyle({ stick: {} })
            moleculeModalList.push({ id: id, modal: modal })
            viewer.render()
            viewer.zoomTo()
          })
          .catch((e) => {
            if (e.status === 400) {
              toast.error(e.response.data.error)
            } else {
              toast.error(e.message)
            }
          })
      })
    }
  }, [generation, idSet, path])

  return <div id="container-01" className="relative h-[642px]"></div>
}

export default Molecule3DViewer
