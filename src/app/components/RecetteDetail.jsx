import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Users, ChefHat, Utensils, ShoppingCart, Star, ArrowRight, AlertTriangle, Video } from 'lucide-react';

const RecetteDetail = ({ recette }) => {
  const [activeSection, setActiveSection] = useState('ingredients');

  if (!recette) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen p-4 sm:p-6 md:p-8"
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden"
      >
        <div className="relative">
          <img src={recette.image} alt={recette.nom} className="w-full h-48 sm:h-64 md:h-96 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white p-4 sm:p-6 md:p-8"
            >
              {recette.nom}
            </motion.h1>
          </div>
        </div>
        
        <div className="p-4 sm:p-6 md:p-8">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex flex-wrap items-center justify-between text-gray-600 mb-6 md:mb-8"
          >
            <div className="flex items-center mb-2 sm:mb-0 w-full sm:w-auto">
              <Clock size={20} className="mr-2 text-amber-500" />
              <span className="mr-4 text-sm md:text-base">{recette.temps}</span>
            </div>
            <div className="flex items-center mb-2 sm:mb-0 w-full sm:w-auto">
              <Users size={20} className="mr-2 text-amber-500" />
              <span className="text-sm md:text-base">{recette.portions} portions</span>
            </div>
            <div className="flex items-center w-full sm:w-auto">
              <ChefHat size={20} className="mr-2 text-amber-500" />
              <span className="text-sm md:text-base">Difficulté: Moyenne</span>
            </div>
          </motion.div>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="text-gray-700 mb-6 md:mb-8 text-base md:text-xl leading-relaxed"
          >
            {recette.description}
          </motion.p>
          
          <div className="flex flex-wrap mb-6 md:mb-8 border-b border-gray-200">
            <TabButton icon={<ShoppingCart size={18} />} label="Ingrédients" active={activeSection === 'ingredients'} onClick={() => setActiveSection('ingredients')} />
            <TabButton icon={<Utensils size={18} />} label="Instructions" active={activeSection === 'instructions'} onClick={() => setActiveSection('instructions')} />
            {recette.recette.url && <TabButton icon={<Video size={18} />} label="Vidéo" active={activeSection === 'video'} onClick={() => setActiveSection('video')} />}
          </div>
          
          <AnimatePresence mode="wait">
            {activeSection === 'ingredients' && <IngredientsSection key="ingredients" ingredients={recette.recette.ingredients} />}
            {activeSection === 'instructions' && <InstructionsSection key="instructions" instructions={recette.recette.instructions} />}
            {activeSection === 'video' && recette.recette.url && <VideoSection key="video" url={recette.recette.url} />}
          </AnimatePresence>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="mt-6 md:mt-8 max-w-4xl mx-auto"
      >
        <CustomAlert
          title="Astuce du chef"
          description="Pour un résultat optimal, laissez reposer les ingrédients à température ambiante avant de commencer la préparation."
        />
      </motion.div>
    </motion.div>
  );
};

const TabButton = ({ icon, label, active, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`flex items-center px-3 py-2 text-sm md:text-base ${active ? 'text-amber-500 border-b-2 border-amber-500' : 'text-gray-600'}`}
  >
    {icon}
    <span className="ml-1 md:ml-2">{label}</span>
  </motion.button>
);

const IngredientsSection = ({ ingredients }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5 }}
  >
    <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800">Ingrédients</h2>
    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
      {ingredients.map((ingredient, index) => (
        <motion.li
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center bg-amber-50 rounded-lg p-2 md:p-3 shadow-sm"
        >
          <Utensils size={16} className="mr-2 md:mr-3 text-amber-500" />
          <span className="text-sm md:text-base text-gray-700">
            <strong>{ingredient.nom}:</strong> {ingredient.quantité}
          </span>
        </motion.li>
      ))}
    </ul>
  </motion.div>
);

const InstructionsSection = ({ instructions }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5 }}
  >
    <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800">Instructions</h2>
    <ol className="space-y-3 md:space-y-4">
      {instructions.split('. ').map((instruction, index) => (
        <motion.li
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-start bg-orange-50 rounded-lg p-3 md:p-4 shadow-sm"
        >
          <span className="flex items-center justify-center w-6 h-6 md:w-8 md:h-8 bg-amber-500 text-white rounded-full mr-3 md:mr-4 flex-shrink-0 text-sm md:text-base">
            {index + 1}
          </span>
          <p className="text-sm md:text-base text-gray-700">{instruction}</p>
        </motion.li>
      ))}
    </ol>
  </motion.div>
);

const VideoSection = ({ url }) => {
  const getEmbedUrl = (youtubeUrl) => {
    const videoId = youtubeUrl.split('v=')[1];
    return `https://www.youtube-nocookie.com/embed/${videoId}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800">Vidéo</h2>
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        <iframe
          src={getEmbedUrl(url)}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full rounded-xl md:rounded-2xl shadow-lg"
        ></iframe>
      </div>
    </motion.div>
  );
};

const CustomAlert = ({ title, description }) => (
  <div className="bg-amber-50 border-l-4 border-amber-500 p-3 md:p-4 rounded-r-lg shadow-md">
    <div className="flex items-center">
      <AlertTriangle className="text-amber-500 mr-2 md:mr-3" size={20} />
      <h3 className="text-base md:text-lg font-semibold text-amber-800">{title}</h3>
    </div>
    <p className="mt-2 text-sm md:text-base text-amber-700">{description}</p>
  </div>
);

export default RecetteDetail;