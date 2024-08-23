"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Home } from 'lucide-react';

// Importation des composants
import Header from './Header';
import Hero from './Hero';
import Boutique from './Boutique';
import Fonctionnalites from './Fonctionnalites';
import RecettesSection from './RecettesSection';
import Assistance from './Assistance';
import RecetteDetail from './RecetteDetail';

const AcademieDesChefs = () => {
  const [currentSection, setCurrentSection] = useState('accueil');
  const [recetteSelectionnee, setRecetteSelectionnee] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');

  // Fonction pour gérer le changement de section
  const handleSectionChange = (section) => {
    setCurrentSection(section);
    setRecetteSelectionnee(null);
  };

  return (
    <div className="min-h-screen  font-sans bg-gray-100 overflow-x-hidden">
      <Header 
        setCurrentSection={handleSectionChange}
        setShowModal={setShowModal}
        setModalType={setModalType}
      />
      
      <AnimatePresence mode="wait">
        {currentSection === 'accueil' && <Hero key="hero" setCurrentSection={handleSectionChange} />}
        {currentSection === 'boutique' && <Boutique key="boutique" />}
        {currentSection === 'fonctionnalités' && <Fonctionnalites key="fonctionnalites" />}
        {currentSection === 'recettes' && (
          recetteSelectionnee ? (
            <motion.div
              key="recette-detail"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="container mx-auto px-4 py-8"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setRecetteSelectionnee(null)}
                className="mb-6 flex items-center text-[#FEBD2E] hover:text-[#FEA82E]"
              >
                <ArrowLeft className='bg-white rounded-full p-1 items-center justify-center mr-2 font-bold '/> Retour aux recettes
              </motion.button>
              <RecetteDetail recette={recetteSelectionnee} />
            </motion.div>
          ) : (
            <RecettesSection 
              key="recettes" 
              setRecetteSelectionnee={setRecetteSelectionnee} 
            />
          )
        )}
        {currentSection === 'assistance' && (
          <Assistance 
            key="assistance"
            showModal={showModal}
            setShowModal={setShowModal}
            modalType={modalType}
            setModalType={setModalType}
          />
        )}
      </AnimatePresence>

      {/* Bouton de retour à l'accueil */}
      {currentSection !== 'accueil' && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleSectionChange('accueil')}
          className="fixed bottom-8 right-8 bg-[#FEBD2E] text-white p-4 rounded-full shadow-lg"
        >
          <Home size={24} />
        </motion.button>
      )}
    </div>
  );
};

export default AcademieDesChefs;