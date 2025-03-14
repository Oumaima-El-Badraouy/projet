import React, { useState } from 'react'
import axios from 'axios'
function Forgotpassword() {
    const [email,setEmail]=useState('')
    const [message,setMessage]=useState('')
    const [Error,seterr]=useState('')

    
    
   const handleSubmit = async (e) => {
     e.preventDefault()
     setMessage('')
     seterr('')
     try{
        const response = await axios.post('http://localhost:5001/forgot-password',{email})
        setMessage(response.data);
     }
     catch(error){
        seterr('!error dons la connexion')
     }

    }
    



      
      return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">Mot de passe oublié</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Entrez votre email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Soumettre
          </button>
        </form>
        {message && <p className="mt-4 text-center text-green-500">{message}</p>}
        {Error && <p className="mt-4 text-center text-red-500">{Error}</p>}
      </div>
    </div>
  );
}

export default Forgotpassword;
