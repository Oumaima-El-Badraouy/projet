import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import Login from './Components/Login.jsx';
import First from './first.jsx';
import Home from './Home/home.jsx';
import SingUp from './SignUp/SignUp.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <Home /> */}
    {/* <SingUp /> */}
    {/* <Login /> */}
    {/* <First /> */}
    <App/>
  </StrictMode>,
);
