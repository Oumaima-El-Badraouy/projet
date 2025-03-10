import React , { useState }from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); 
   const navigate = useNavigate();
    const clickaccount=()=>{
      navigate("/Signup");
    }
    const ClickSubmit = async (e) => {
      if(!email || !password){
        setMessage("Les deux champs sans Obligatoires !!");
        
      }
      e.preventDefault();
      try {
        const response = await axios.post("http://localhost:5001/api/check-login", { email, password });
        setMessage(response.data.message);
        navigate(response.data.redirect);
        setMessageType('true');
      } catch (error) {
        if(!email || !password){
           setMessage(error.response?.data.message || "Les deux champs sans Obligatoires !!");
        setMessageType('false');
          
        }
        else{
          setMessage(error.response?.data.message || "Error dons la connexion !");
          setMessageType('false');
        }
       
      }
    };
    
  return (
    
  <div className='login-container'>

      <div className='text-box'>
        <h1 className='logo'>DALLEEL</h1>
        <h4 className='subtitle'>
                Ensemble vers un 
                     <br /> meilleur avenir !
        </h4>
      </div>
      <div className='form-container'>
   

        <form className='login-form' >
          <input
            type='email'
            placeholder='Email'
            className='input-field'
            onChange={(e)=>setEmail(e.target.value)} required
          />
      
          <input
            type='password'
            placeholder='Mot de passe'
            className='input-field'
            onChange={(e)=>setPassword(e.target.value)}
            required
          />
<p className={`message ${messageType}`}>{message}</p>

          
            <button className='login-button'onClick={ClickSubmit}>
              Se connecter
            </button> 
           <p> <a href='/ForgetPassword' className='forgot-password-link'>
              Mot de passe oublié ?
            </a></p>
         

          <div className='create-account'>
            <p className='account-text'>
              Vous n'avez pas de compte ?{' '}
              <a href='/create-account' className='create-account-link'onClick={clickaccount}>
                Créez un nouveau compte
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
