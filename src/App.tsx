import { Routes, Route, useNavigate } from 'react-router-dom'
import { NaviBar } from 'components/navibar/NaviBar'
import Home from 'pages/home/Home'
import New from 'pages/new/New'
import Monitor from 'pages/monitor/Monitor'
import Edit from 'pages/edit/Edit'
import { Toaster } from 'sonner'
import { NextUIProvider } from '@nextui-org/react'
import Param from 'pages/new/Param'

function App() {
  const navigate = useNavigate()
  return (
    <NextUIProvider navigate={navigate}>
      <div className="container mx-auto">
        <Toaster position="top-center" />
        <NaviBar />
        <div className="px-4 text-gray-900 antialiased">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<New />} />
            <Route path="/new/param" element={<Param />} />
            <Route path="/monitor" element={<Monitor />} />
            <Route path="/edit" element={<Edit />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </NextUIProvider>
  )
}

export default App

// Optional: Define a NotFound component
const NotFound = () => (
  <div className="mt-10 text-center">
    <h1 className="text-2xl font-bold">404 - Page Not Found</h1>
    <p>The page you&apos;re looking for does not exist.</p>
  </div>
)
