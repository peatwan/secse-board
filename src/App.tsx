import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import { NaviBar } from 'components/navibar/NaviBar'
import { New } from 'pages/new/New'
import { Monitor } from 'pages/monitor/Monitor'
import { Edit } from 'pages/edit/Edit'
import { Home } from 'pages/home/Home'
import { Toaster } from 'sonner'
function App() {
  const Layout = () => {
    return (
      <div className="container mx-auto">
        <Toaster position="top-center" />
        <NaviBar />
        <div className="flex min-h-screen items-center justify-center px-4 text-gray-900 antialiased">
          <Outlet />
        </div>
      </div>
    )
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: 'new',
          element: <New />
        },
        {
          path: 'monitor',
          element: <Monitor />
        },
        {
          path: 'edit',
          element: <Edit />
        }
      ]
    }
  ])

  return <RouterProvider router={router}></RouterProvider>
}

export default App
