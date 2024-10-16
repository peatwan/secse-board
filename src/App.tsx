import { Outlet, createBrowserRouter, RouterProvider } from 'react-router-dom'
import { NaviBar } from 'components/navibar/NaviBar'
import Home from 'pages/home/Home'
import New from 'pages/new/New'
import Monitor from 'pages/monitor/Monitor'
import Edit from 'pages/edit/Edit'
import { Toaster } from 'sonner'
import Param from 'pages/new/Param'

function App() {
  const Layout = () => {
    return (
      <div className="container mx-auto">
        <Toaster position="top-center" richColors />
        <NaviBar />
        <div className="px-4 text-gray-900 antialiased">
          <Outlet />
        </div>
      </div>
    )
  }

  //NotFound component
  const NotFound = () => (
    <div className="mt-10 text-center">
      <h1 className="text-2xl font-bold">404 - Page Not Found</h1>
      <p>The page you&apos;re looking for does not exist.</p>
    </div>
  )

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        { path: '/', element: <Home /> },
        {
          path: '/new',
          element: <New />
        },
        {
          path: '/new/param',
          element: <Param />
        },
        {
          path: '/monitor',
          element: <Monitor />
        },
        {
          path: '/edit',
          element: <Edit />
        }
      ]
    },
    {
      path: '*',
      element: <NotFound />
    }
  ])

  return <RouterProvider router={router}></RouterProvider>
}

export default App
