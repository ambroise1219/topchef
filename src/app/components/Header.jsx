// components/Header.js
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Utensils, BookOpen, HelpCircle, X, Menu, ChefHat } from 'lucide-react';

// Composant Header de l'application
const Header = ({ setCurrentSection, setShowModal, setModalType, menuOpen: externalMenuOpen, setMenuOpen: externalSetMenuOpen }) => {
  // Gestion de l'état du menu mobile
  const [internalMenuOpen, setInternalMenuOpen] = useState(false);

  // Détermine si le menu mobile est contrôlé par le composant parent
  const menuOpen = typeof externalMenuOpen !== 'undefined' ? externalMenuOpen : internalMenuOpen;
  const setMenuOpen = typeof externalSetMenuOpen === 'function' ? externalSetMenuOpen : setInternalMenuOpen;

  // Liste des éléments de navigation
  const navItems = [
    { name: 'Boutique', icon: ShoppingBag },
    { name: 'Fonctionnalités', icon: Utensils },
    { name: 'Recettes', icon: BookOpen },
    { name: 'Assistance', icon: HelpCircle },
  ];

  // Gestion du changement de section
  const handleSectionChange = (section) => {
    if (typeof setCurrentSection === 'function') {
      setCurrentSection(section);
    }
    setMenuOpen(false);
  };

  // Gestion de l'ouverture du modal
  const handleModalOpen = (type) => {
    if (typeof setShowModal === 'function') {
      setShowModal(true);
    }
    if (typeof setModalType === 'function') {
      setModalType(type);
    }
    setMenuOpen(false);  
  };

  return (
    <motion.nav 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-[#FEBD2E] shadow-md"
    >
      <div className="container mx-auto px-4 py-4 sm:py-6">
        <div className="flex justify-between items-center">
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="text-2xl sm:text-3xl font-bold text-white cursor-pointer"
            onClick={() => handleSectionChange('accueil')}
          >
              TopChef 👨🏽‍🍳
        
          </motion.div>

          {/* Navigation sur grand écran */}
          <div className="hidden lg:flex space-x-6 xl:space-x-8">
            {navItems.map(({ name, icon: Icon }) => (
              <NavItem 
                key={name}
                name={name}
                Icon={Icon}
                onClick={() => handleSectionChange(name.toLowerCase())}
              />
            ))}
          </div>

          {/* Bouton de contact sur grand écran */}
          <div className="hidden lg:flex space-x-4">
            <AuthButton
              text="Contact"
              onClick={() => handleModalOpen('contact')} // Ouvrir le modal de contact
              className="text-[#FEBD2E] bg-white hover:bg-gray-100"
            />
          
          </div>

          {/* Bouton du menu mobile */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="lg:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Menu mobile */}
        <MobileMenu
          menuOpen={menuOpen}
          navItems={navItems}
          handleSectionChange={handleSectionChange}
          handleModalOpen={handleModalOpen}
        />
      </div>
    </motion.nav>
  );
};
 
const NavItem = ({ name, Icon, onClick }) => (
  <motion.a
    href="#"
    className="flex items-center text-white hover:text-gray-200 text-sm xl:text-base"
    whileHover={{ scale: 1.1 }}
    onClick={onClick}
  >
    <Icon className="mr-2" size={20} />
    {name}
  </motion.a>
);

// Composant de bouton d'authentification
const AuthButton = ({ text, onClick, className }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`px-4 py-2 rounded-full transition duration-300 ${className}`}
    onClick={onClick}
  >
    {text}
  </motion.button>
);

// Composant du menu mobile
const MobileMenu = ({ menuOpen, navItems, handleSectionChange, handleModalOpen }) => (
  <AnimatePresence>
    {menuOpen && (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.3 }}
        className="mt-4 lg:hidden bg-white rounded-lg shadow-lg p-4"
      >
        {navItems.map(({ name }) => (
          <motion.a
            key={name}
            href="#"
            className="block py-2 text-gray-800 hover:text-[#FEBD2E]"
            whileHover={{ x: 5 }}
            onClick={() => handleSectionChange(name.toLowerCase())}
          >
            {name}
          </motion.a>
        ))}
        <AuthButton
          text="Contact"  
          onClick={() => handleModalOpen('contact')} // Ouvrir le modal de contact
          className="w-full py-2 mt-2 text-[#FEBD2E] bg-white border border-[#FEBD2E] hover:bg-[#FEBD2E] hover:text-white"
        />
      </motion.div>
    )}
  </AnimatePresence>
);

export default Header;