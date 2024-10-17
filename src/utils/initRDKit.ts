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

const initRDKit = (() => {
  let rdkitLoadingPromise: Promise<unknown>

  loadScript('https://unpkg.com/@rdkit/rdkit/dist/RDKit_minimal.js', () => {})

  return () => {
    /**
     * Utility function ensuring there's only one call made to load RDKit
     * It returns a promise with the resolved RDKit API as value on success,
     * and a rejected promise with the error on failure.
     *
     * The RDKit API is also attached to the global object on successful load.
     */
    if (!rdkitLoadingPromise) {
      rdkitLoadingPromise = new Promise((resolve, reject) => {
        initRDKitModule()
          .then((RDKit: any) => {
            window.RDKit = RDKit
            resolve(RDKit)
          })
          .catch(() => {
            reject()
          })
      })
    }

    return rdkitLoadingPromise
  }
})()

export default initRDKit
