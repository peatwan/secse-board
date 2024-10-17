import { createRoot } from 'react-dom/client'
import 'tailwindcss/tailwind.css'
import App from 'App'
import { NextUIProvider } from '@nextui-org/react'
import { RDKitModule } from '@rdkit/rdkit'
import React from 'react'

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

declare global {
  interface Window {
    RDKit: RDKitModule
  }
}

root.render(
  <React.StrictMode>
    <NextUIProvider>
      <App />
    </NextUIProvider>
  </React.StrictMode>
)
