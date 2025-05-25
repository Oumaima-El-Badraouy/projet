import React, { useState } from 'react'
import Footer from './Footer';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'react-toastify/dist/ReactToastify.css';
function Contact() {
    const [nom,setnom]=useState('');
    const [email,setemail]=useState('');
    const [sujet,setsujet]=useState('');
    const [message,setmessage]=useState(''); 
    const notifySuccess = (msg) => toast.success(msg, { position: "top-right" });
    const notifyError = (msg) => toast.error(msg, { position: "top-right" });
    const SubmitContactform =async (e) => {
        e.preventDefault(); 

        const formData = { nom, email, sujet, message };

        try {
            const response = await fetch("http://localhost:5001/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (result.success) {
                notifySuccess(result.message);
                setnom("");
                setemail("");
                setsujet("");
                setmessage("");
            } else {
                notifyError(result.message);
            }
        } catch (error) {
            notifyError("Erreur lors de l'envoi du message.");
        }
    };
    
  return (
    <div>
      <div className="bg-gray-100 py-3 hidden lg:block">
      <div className="container mx-auto flex justify-between items-center px-5">
        {/* Gauche : Adresse et horaires */}
        <div className="flex space-x-6 text-gray-700">
          <div className="flex items-center">
            <i className="fa fa-map-marker-alt text-blue-600 mr-2"></i>
            <span>123 Rue, Casablanca, Maroc</span>
          </div>
          <div className="flex items-center">
            <i className="far fa-clock text-blue-600 mr-2"></i>
            <span>Lun - Dim : 24H/24H</span>
          </div>
        </div>

        {/* Droite : Contact et Réseaux sociaux */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <i className="fa fa-phone-alt text-blue-600 mr-2"></i>
            <span>+212 6 1234 5678</span>
          </div>
         
        </div>
      </div>
    </div>
   

    <div>
      {/* Header */}
      <div className="bg-blue-600 py-0 text-center text-white">
        <h1 className="text-4xl font-bold mb-3">Contactez-nous</h1>
        <nav className="text-lg">
          <a href="/" className="text-white hover:underline">Accueil</a> /
          <span className="text-gray-300"> Contact</span>
        </nav>
      </div>

      {/* Section Contact */}
      <div className="container mx-auto py-10 px-5">
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Informations de contact */}
          <div className="space-y-6">
            <div className="flex bg-gray-100 p-5 rounded-lg items-center">
              <div className="bg-white p-3 rounded-full shadow-md">
                <i className="fa fa-map-marker-alt text-blue-600 text-xl"></i>
              </div>
              <div className="ml-4">
                <p className="text-gray-500">Adresse</p>
                <h5 className="text-lg font-semibold">Casablanca, Maroc</h5>
              </div>
            </div>

            <div className="flex bg-gray-100 p-5 rounded-lg items-center">
              <div className="bg-white p-3 rounded-full shadow-md">
                <i className="fa fa-phone-alt text-blue-600 text-xl"></i>
              </div>
              <div className="ml-4">
                <p className="text-gray-500">Appelez-nous</p>
                <h5 className="text-lg font-semibold">+212 6 1234 5678</h5>
              </div>
            </div>

            <div className="flex bg-gray-100 p-5 rounded-lg items-center">
              <div className="bg-white p-3 rounded-full shadow-md">
                <i className="fa fa-envelope text-blue-600 text-xl"></i>
              </div>
              <div className="ml-4">
                <p className="text-gray-500">Email</p>
                <h5 className="text-lg font-semibold">contact@Tawjih360.com</h5>
              </div>
            </div>
          </div>

          {/* Formulaire de contact */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Envoyez-nous un message</h2>
            <form onSubmit={SubmitContactform}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" value={nom} placeholder="Votre nom" className="p-3 border rounded-lg w-full"required onChange={(e)=>setnom(e.target.value)} />
                <input type="email" value={email}placeholder="Votre email" className="p-3 border rounded-lg w-full" required onChange={(e)=>setemail(e.target.value)}/>
              </div>
              <input type="text" value={sujet}placeholder="Sujet" className="p-3 border rounded-lg w-full mt-4"required onChange={(e)=>setsujet(e.target.value)} />
              <textarea placeholder="Votre message"value={message} className="p-3 border rounded-lg w-full mt-4 h-32"required onChange={(e)=>setmessage(e.target.value)}></textarea>
              <ToastContainer />
              <button 
  type="submit" 
  className="mt-4 bg-sky-400 text-white px-6 py-3 rounded-lg w-full hover:bg-sky-500 hover:text-white border border-sky-400 transition duration-300">
  Envoyer
</button>

            </form>
          </div>
        </div>

        {/* Google Maps */}
        <div className="mt-10">
          <iframe
            className="w-full h-70 rounded-lg shadow-md"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d107049.24673872803!2d-7.684973944456687!3d33.572411002383825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7cd267f21d0e9%3A0x81d2a00c0c8db0b7!2sCasablanca%2C%20Maroc!5e0!3m2!1sfr!2sma!4v1649865246325"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
    <Footer/>
    </div>
   );
}

export default Contact;
