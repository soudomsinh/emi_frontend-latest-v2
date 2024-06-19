import {
  Route, 
  createBrowserRouter, 
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom'

import MainLayout from './layouts/MainLayout'
import NotFoundPage from './pages/NotFoundPage'
import HomePage from './pages/HomePage'
import ThreeInOneCredit from './components/productPolicy/ThreeInOneCredit'
import TwoInOneCredit from './components/productPolicy/TwoInOneCredit'
import Import from './components/importExport/Import'
import AuthenticationPage from './pages/AuthenticationPage'
import LoginPage from './pages/LoginPage'
import RegistrationPage from './pages/RegistrationPage'

const router = createBrowserRouter (
  createRoutesFromElements(
    <Route path='/' element={<MainLayout />} >
      <Route path='/authen'index element= {<AuthenticationPage />}/>
      <Route path='/log-in' element= {<LoginPage />}/>
      <Route path='/register' element= {<RegistrationPage />}/>
      <Route path='/home' element= {<HomePage />}/>
      <Route path='/3-in-1-credit' element= {<ThreeInOneCredit />}/>
      <Route path='/2-in-1-credit' element= {<TwoInOneCredit />}/>
      <Route path='/import' element= {<Import />}/>
      <Route path='*' element={<NotFoundPage />} />
    </Route>
  )
)

function App() {
  return <RouterProvider router={router} />
}

export default App
