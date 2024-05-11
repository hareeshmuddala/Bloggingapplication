import { useState } from 'react'
import LandingPage from './components/LandingPage/LandingPage'
import Signup from './components/Signup_login/Signup'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import routes from './routes.jsx'
function App() {

  const router = createBrowserRouter(routes);
  return (
    <div >
     <RouterProvider router={router}></RouterProvider> 
    </div>
  )
}

export default App
