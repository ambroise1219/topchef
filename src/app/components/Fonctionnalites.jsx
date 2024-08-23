// components/Fonctionnalites.js
import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, Video, Utensils } from 'lucide-react';

// Tableau des fonctionnalités
const fonctionnalites = [
  {
    icon: BookOpen,
    title: "Recettes Exclusives",
    description: "Accédez à une bibliothèque de recettes uniques créées par nos chefs étoilés."
  },
  {
    icon: Users,
    title: "Communauté Active",
    description: "Échangez des astuces et des conseils avec d'autres passionnés de cuisine."
  },
  {
    icon: Video,
    title: "Tutoriels Vidéo",
    description: "Apprenez de nouvelles techniques avec nos vidéos explicatives détaillées."
  },
  {
    icon: Utensils,
    title: "Cours de Cuisine",
    description: "Suivez des cours en ligne dispensés par des chefs expérimentés."
  }
];

const Fonctionnalites = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-16"
    >
      <h1 className="text-4xl font-bold mb-8 text-center">Fonctionnalités</h1>
      <p className="text-xl mb-12 text-center">Explorez toutes les fonctionnalités qui font de ChezChef une expérience unique !</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {fonctionnalites.map((fonctionnalite, index) => (
          <FonctionnaliteCard key={index} {...fonctionnalite} />
        ))}
      </div>
    </motion.div>
  );
};

// Composant pour afficher une fonctionnalité individuelle
const FonctionnaliteCard = ({ icon: Icon, title, description }) => {
  return (
    <motion.div 
      className="bg-white p-6 rounded-lg shadow-md"
      whileHover={{ scale: 1.05 }}
    >
      <Icon className="w-12 h-12 text-[#FEBD2E] mb-4" />
      <h3 className="text-2xl font-semibold mb-2">{title}</h3>
      <p>{description}</p>
    </motion.div>
  );
};

export default Fonctionnalites;