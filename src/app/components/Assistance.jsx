// components/Assistance.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Modal from './Modal'; 

const Assistance = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');

  const openModal = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-16"
    >
      <h1 className="text-4xl font-bold mb-8 text-center">Assistance</h1>
      <p className="text-xl mb-12 text-center">Besoin d&apos;aide ? Notre équipe est là pour vous assister !</p>
      
      <div className="max-w-2xl mx-auto">
        <AssistanceCard 
          title="FAQ"
          description="Trouvez rapidement des réponses à vos questions les plus fréquentes."
          buttonText="Consulter la FAQ"
          onClick={() => openModal('faq')}
        />
        
        <AssistanceCard 
          title="Contact"
          description="Vous ne trouvez pas votre réponse ? Contactez-nous directement."
          buttonText="Nous contacter"
          onClick={() => openModal('contact')}
        />
      </div>

      {/* Composant Modal pour afficher le contenu de la FAQ ou du formulaire de contact */}
      <Modal showModal={showModal} setShowModal={setShowModal} modalType={modalType} />
    </motion.div>
  );
};

// Composant pour afficher une carte d'assistance
const AssistanceCard = ({ title, description, buttonText, onClick }) => {
  return (
    <motion.div 
      className="bg-white p-6 rounded-lg shadow-md mb-6"
      whileHover={{ scale: 1.02 }}
    >
      <h3 className="text-2xl font-semibold mb-2">{title}</h3>
      <p className="mb-4">{description}</p>
      <AssistanceButton text={buttonText} onClick={onClick} />
    </motion.div>
  );
};

// Composant pour le bouton d'assistance
const AssistanceButton = ({ text, onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-[#FEBD2E] text-white px-4 py-2 rounded-full"
      onClick={onClick}
    >
      {text}
    </motion.button>
  );
};

export default Assistance;