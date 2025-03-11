import React from "react";
import OIP from '../assets/OIP (2).jpeg';
import OIP1 from '../assets/OIP.jpeg';
import Menu from './Menu';
import Footer from './Footer';
const About = () => {
  
  return (
    <div>
      <Menu/>
      {/* Section À propos */}
      <div className="container mx-auto py-10 px-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="relative">
            {/* <img
              className="w-3/4 rounded-lg"
              src={OIP}
              alt="À propos de DALLEEL"
            /> */}
           <img
              className="w-1/2 rounded-lg bg-white p-2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              src={OIP}
              alt="Caractéristiques de DALLEEL"
            /> 
          </div>
          <div>
            <p className="inline-block border border-gray-300 rounded-full py-1 px-4 text-gray-700">
              À propos de nous
            </p>
            <h1 className="text-2xl font-bold mt-4">
              Pourquoi choisir DALLEEL pour votre orientation ?
            </h1>
            <p className="mt-4 text-gray-600">
              DALLEEL est une plateforme qui vous aide à choisir votre parcours académique en comparant les établissements, en réalisant des tests d’orientation comme SWOT et en recevant des conseils d’experts en éducation.
            </p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center">
                <span className="text-blue-500 mr-2">✔</span> Comparaison des écoles et universités
              </li>
              <li className="flex items-center">
                <span className="text-blue-500 mr-2">✔</span> Tests analytiques pour guider votre choix
              </li>
              <li className="flex items-center">
                <span className="text-blue-500 mr-2">✔</span> Conseils gratuits d’orientation scolaire
              </li>
            </ul>
         
          </div>
        </div>
      </div>

      {/* Section Fonctionnalités */}
      <div className="bg-white-500 text-bleu py-10">
        <div className="container mx-auto px-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="inline-block border border-black rounded-full py-1 px-4">
                Fonctionnalités
              </p>
              <h1 className="text-2xl font-bold mt-4">Pourquoi choisir DALLEEL ?</h1>
              <p className="mt-4">
                Nous vous offrons une expérience complète pour vous aider à choisir votre avenir académique en toute confiance.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <FeatureItem icon="📊" title="Analyse SWOT" subtitle="Découvrez vos forces et faiblesses" />
                <FeatureItem icon="🎓" title="Données fiables" subtitle="Informations sur les établissements" />
                <FeatureItem icon="🤖" title="Chatbot intelligent" subtitle="Réponses instantanées" />
                <FeatureItem icon="💬" title="Communauté étudiante" subtitle="Discutez avec d'autres étudiants" />
              </div>
            </div>
            <div>
              <img
                className="rounded-lg w-full"
                src={OIP1}
                alt="Fonctionnalités de DALLEEL"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer/></div>
  );

};
const FeatureItem = ({ icon, title, subtitle }) => {
  return (
    <div className="flex items-center">
      <div className="text-3xl">{icon}</div>
      <div className="ml-3">
        <p className="text-lg font-semibold">{title}</p>
        <p className="text-sm">{subtitle}</p>
      </div>
    </div>
  );
};

export default About;
