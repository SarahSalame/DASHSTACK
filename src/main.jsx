import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignUp from './components/pages/SignUp'
import LogIn from './components/pages/LogIn'
import Auth from './components/pages/Auth'
import Root from './components/pages/Root'
import Items from './components/pages/Items'
import CreatItems from './components/pages/CreatItems'
import EditItems from './components/pages/EditItems'


const routes=createBrowserRouter(
  [
    {
      path:"/",
      element:<Auth/>,
      children:[
        {
          path:"",
          element:<LogIn/>
        },
        {
          path:"signup",
          element:<SignUp/>
        }
      ]
    },
    {
      path:"/dashboard",
      element:<Root/>,
      children:[
        {
          path:"",
          element:<Items/>,
        },
        { 
          path:"add",
          element:<CreatItems/>,
        },
        { 
          path:"items/edit/:id",
          element:<EditItems/>,
        },
      ]
    },
  ],{basename:"/DASHSTACK/"}
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <RouterProvider router={routes}/>
</StrictMode>
)
