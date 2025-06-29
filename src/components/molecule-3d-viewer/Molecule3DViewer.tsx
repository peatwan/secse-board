import { forwardRef, Ref, useEffect, useImperativeHandle, useRef } from 'react'
import * as $3Dmol from '3dmol'
import { getGenerationResultFile, getTargetFile } from 'api/pages/monitor'
import { getSetDifference } from 'utils'

interface Props {
  path: string
  generation: string
  idSet: Set<string>
}

export interface Molecule3DViewerHandle {
  handleRecenter: () => void
}

let viewer: $3Dmol.GLViewer
let targetModal: $3Dmol.GLModel
let moleculeModalList: { id: string; modal: $3Dmol.GLModel }[] = []
const Molecule3DViewer = forwardRef<Molecule3DViewerHandle, Props>(
  ({ path, generation, idSet }, ref: Ref<Molecule3DViewerHandle>) => {
    const idSetPrev = useRef<Set<string>>(new Set([]))

    const handleRecenter = () => {
      viewer.zoomTo()
    }
    useImperativeHandle(ref, () => ({
      handleRecenter
    }))

    useEffect(() => {
      const element = document.querySelector('#container-01')
      const config = { backgroundColor: 'white' }
      viewer = $3Dmol.createViewer(element, config)
      if (path) {
        getTargetFile(path).then((data) => {
          targetModal = viewer.addModel(data, 'pdb')
          targetModal.setStyle({ cartoon: { color: 'lightblue' } })
          viewer.render()
          viewer.zoomTo()
        })
      }
    }, [path])

    useEffect(() => {
      // Find removed ID
      const removedID = getSetDifference(idSetPrev.current, idSet)
      if (removedID.size > 0) {
        const removedModalList = moleculeModalList.filter((e) =>
          removedID.has(e.id)
        )
        removedModalList.forEach((e) => {
          viewer.removeModel(e.modal)
        })
        viewer.render()
        moleculeModalList = moleculeModalList.filter(
          (e) => !removedID.has(e.id)
        )
      }

      // Find added ID
      const addedID = getSetDifference(idSet, idSetPrev.current)
      const addedIDArr = Array.from(addedID)
      idSetPrev.current = idSet
      if (addedIDArr.length > 0) {
        const allPromises: Promise<unknown>[] = []
        addedIDArr.forEach((id) => {
          allPromises.push(getGenerationResultFile(path, generation, id))
        })
        Promise.all(allPromises).then((dataArr) => {
          for (let i = 0; i < dataArr.length; ++i) {
            const modal = viewer.addModel(dataArr[i], 'sdf')
            modal.setStyle({ stick: {} })
            moleculeModalList.push({ id: addedIDArr[i], modal: modal })
          }
          viewer.render()
        })
      }
    }, [generation, idSet, path])

    return <div id="container-01" className="relative h-[642px]"></div>
  }
)
Molecule3DViewer.displayName = 'Molecule3DViewer'

export default Molecule3DViewer
