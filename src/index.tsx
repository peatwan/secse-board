import { createRoot } from 'react-dom/client'
import 'tailwindcss/tailwind.css'
import App from 'App'
import React from 'react'
import { NextUIProvider } from '@nextui-org/react'

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <NextUIProvider>
      <App />
    </NextUIProvider>
  </React.StrictMode>
)
