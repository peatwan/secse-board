import { useEffect } from 'react'

interface Props {
  smiles: string
}

// Function to dynamically load external scripts
const loadScript = (src: string, onload: () => void) => {
  if (!document.querySelector(`script[src="${src}"]`)) {
    const script = document.createElement('script')
    script.src = src
    script.async = true
    script.onload = onload
    document.body.appendChild(script)
  } else {
    onload() // If the script is already loaded, call onload directly
  }
}

const MoleculeEditor: React.FC<Props> = ({ smiles }) => {
  useEffect(() => {
    let chemicalEditorInstance: unknown = null

    // Load the moledit.js script when the component mounts
    loadScript('https://molsoft.com/lib/moledit.js', () => {
      //@ts-expect-error ChemicalView is from moledit.js
      if (window.ChemicalView && !chemicalEditorInstance) {
        //@ts-expect-error ChemicalView is from moledit.js
        chemicalEditorInstance = new window.ChemicalView(smiles, 'editor')
      }
    })

    // Cleanup function to remove the ChemicalView instance when unmounting
    return () => {
      if (chemicalEditorInstance) {
        const editorElement = document.getElementById('editor')
        if (editorElement) {
          // Clear the inner HTML or remove the child nodes manually
          editorElement.innerHTML = ''
        }
        chemicalEditorInstance = null // Dereference the instance
      }
    }
  }, [smiles]) // Empty dependency array ensures this runs only once

  return (
    <div
      id="editor"
      style={{
        width: '800px',
        height: '500px',
        border: '2px solid gray',
        borderRadius: '5px'
      }}
    ></div>
  )
}

export default MoleculeEditor
