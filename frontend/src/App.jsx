import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
// import Signup from "./Components/Signup";
import Contact from "./Components/Contact";
import Menu from "./Components/Menu";
import ForgetPassword from "./Components/ForgetPassword";
import About from "./Components/About";
import { ToastContainer } from 'react-toastify';
function App() {
    return (
   <Router>
            <Routes>
                <Route path="/Login" element={<Login />} />
                <Route path="/Menu" element={<Menu />} />
                <Route path="/ForgetPassword" element={<ForgetPassword />} />
                <Route path="/About" element={<About />} />
                <Route path="/Contact" element={<Contact />} />


            </Routes>
</Router>
    );
}

export default App;

