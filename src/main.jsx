import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import store from './store/Store.js'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './components/Layout/MainLayout.jsx'
import AuthLayout from './components/Layout/AuthLayout.jsx'
import AuthCheckLayout from './components/Layout/AuthCheckLayout.jsx'
import Signup from './components/Authentication/Register.jsx'
import Login from './components/Authentication/Login.jsx'
import NotFound from './components/Layout/NotFound.jsx'


import {Home,Dashboard, MyProfile, MyProjects, Saved, Subscriptions} from './components/Pages/index.js'
import {PostProjectForm, Project} from './components/Pages/index.js'
import AllProjects from './components/Pages/AllProjects.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home/> },
      {path: "/dashboard", element: <AuthCheckLayout authentication><Dashboard /></AuthCheckLayout> },
      { path: "/profile", element: <AuthCheckLayout authentication><MyProfile /></AuthCheckLayout>},
      { path: "/myprojects", element: <AuthCheckLayout authentication><MyProjects /></AuthCheckLayout>},
      { path: "/home", element: <AuthCheckLayout authentication><Home /></AuthCheckLayout>},
      { path: "/saved", element: <AuthCheckLayout authentication><Saved /></AuthCheckLayout>},
      { path: "/subscriptions", element: <AuthCheckLayout authentication><Subscriptions /></AuthCheckLayout>},
      { path: "/uploadProject", element: <AuthCheckLayout authentication><PostProjectForm /></AuthCheckLayout>},
      { path: "/project/:projectID", element: <AuthCheckLayout authentication><Project/></AuthCheckLayout>},
      { path: "/allprojects/:field", element: <AuthCheckLayout authentication><AllProjects/></AuthCheckLayout>}
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "/auth/login", element: <Login /> },
      { path: "/auth/signup", element: <Signup /> },
    ],
  },
  {
    path: "*", // Catch-all route for 404
    element: <NotFound />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
