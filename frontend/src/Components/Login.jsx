import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { NavLink, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({}); 
  const navigate = useNavigate();

  const validateField = (field, value) => {
    setErrors(prevErrors => ({
      ...prevErrors,
      [field]: value ? "" : (field === "email" ? "L'email est obligatoire !" : "Le mot de passe est obligatoire !")
    }));
  };

  const clickAccount = () => {
    navigate("/Signup");
  };

  const ClickSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrors({
        email: email ? "" : "L'email est obligatoire !",
        password: password ? "" : "Le mot de passe est obligatoire !"
      });
      return;
    }

    try {
      const response = await axios.post("http://localhost:5001/api/check-login", { email, password });
      navigate(response.data.redirect);
    } catch (error) {
      setErrors(prevErrors => ({
        ...prevErrors,
        form: error.response?.data.message || "Erreur dans la connexion !"
      }));
    }
  };

  return (
    <div className='login-container'>
      <div className='text-box'>
        <h1 className='logo'>DALLEEL</h1>
        <h4 className='subtitle'>Ensemble vers un <br /> meilleur avenir !</h4>
      </div>

      <div className='form-container'>
        <form className='login-form' onSubmit={ClickSubmit}>
          <div className="input-group">
            <input
              type='email'
              placeholder='Email'
              className={`input-field ${errors.email ? 'error' : ''}`}
              value={email}
              onBlur={() => validateField("email", email)}
              onChange={(e) => {
                setEmail(e.target.value);
                validateField("email", e.target.value);
              }}
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>

          <div className="input-group">
            <input
              type='password'
              placeholder='Mot de passe'
              className={`input-field ${errors.password ? 'error' : ''}`}
              value={password}
              onBlur={() => validateField("password", password)}
              onChange={(e) => {
                setPassword(e.target.value);
                validateField("password", e.target.value);
              }}
            />
            {errors.password && <p className="error-message">{errors.password}</p>}
          </div>

          {errors.form && <p className="error-message">{errors.form}</p>}

          <button type='submit' className='login-button'>
            Se connecter
          </button> 

          <p>
            <NavLink to='/Forgotpassword' className='forgot-password-link'>
              Mot de passe oublié ?
            </NavLink>
          </p>

          <div className='create-account'>
            <p className='account-text'>
              Vous n'avez pas de compte ?{' '}
              <NavLink to='/Signup' className='create-account-link' onClick={clickAccount}>
                Créez un nouveau compte
              </NavLink>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
