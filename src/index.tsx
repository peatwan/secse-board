import { createRoot } from 'react-dom/client'
import 'tailwindcss/tailwind.css'
import App from 'App'
import { NextUIProvider } from '@nextui-org/react'

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

root.render(
  <NextUIProvider>
    <App />
  </NextUIProvider>
)
