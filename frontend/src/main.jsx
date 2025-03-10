import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
<<<<<<< HEAD
import Login from './Components/Login.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
  
    <App/>
=======
import First from './first.jsx'
import Home from './Home/home.jsx'
import SingUp from './SignUp/SignUp.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <Home/> */}
    <SingUp/>
>>>>>>> 02e0847 (frontend sign Up)
  </StrictMode>,
)
