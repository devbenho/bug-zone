import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
// import App from './App';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Verify } from './pages/Verify'
import { Home } from './pages/Home'
import { IconButtonGroup } from './components/IconButtonGroup'
import { iconButtons } from './constants/iconButtons'
import { ProblemList } from './pages/problem-list'
import { problemData } from './constants/problemCards'
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <h1>Error Page</h1>,
  },
  {
    path: '/category/:name',
    element: <ProblemList category="WEB DEVELOPMENT" problems={problemData} />,
    errorElement: <h1>Error Page</h1>,
  },
  {
    path: '/login',
    element: <Login username={''} password={''} />,
    errorElement: <h1>Error Page</h1>,
  },
  {
    path: '/register',
    element: <Register password="" username="" />,
    errorElement: <h1>Error Page</h1>,
  },
  {
    path: '/verify',
    element: <Verify username="devBenho" email="benho@benho.com" />,
    errorElement: <h1>Error Page</h1>,
  },
  {
    path: '/test',
    element: <IconButtonGroup buttons={iconButtons} />,
    errorElement: <h1>Error Page</h1>,
  },
])
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
