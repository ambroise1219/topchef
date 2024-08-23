// components/RecettesSection.js
import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Search, ChevronDown, Users, Clock } from 'lucide-react';
import recettesData from '../../../constant/recettes.json';

// Catégories de recettes
const categories = [
  { nom: "Plats principaux", icone: "🍲" },
  { nom: "Accompagnements", icone: "🥘" },
  { nom: "Soupes", icone: "🥣" },
  { nom: "Petit-déjeuner", icone: "🍳" },
];

const RecettesSection = ({ setRecetteSelectionnee }) => {
  const [recherche, setRecherche] = useState('');
  const [categorieActive, setCategorieActive] = useState('');
  const [tri, setTri] = useState('Newest');

  // Filtrage et tri des recettes
  const recettesFiltrees = useMemo(() => {
    return recettesData
      .filter(recette => 
        recette.nom.toLowerCase().includes(recherche.toLowerCase()) &&
        (categorieActive === '' || recette.categorie === categorieActive)
      )
      .sort((a, b) => {
        if (tri === 'Newest') return b.id - a.id;
        if (tri === 'Oldest') return a.id - b.id;
        return 0;
      });
  }, [recherche, categorieActive, tri]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-16"
    >
      <h1 className="text-4xl font-bold mb-8">Nos Recettes</h1>
      
      <SearchAndSort
        recherche={recherche}
        setRecherche={setRecherche}
        tri={tri}
        setTri={setTri}
      />

      <div className="flex flex-col md:flex-row gap-8">
        <CategoriesSidebar
          categorieActive={categorieActive}
          setCategorieActive={setCategorieActive}
        />

        <RecettesGrid
          recettesFiltrees={recettesFiltrees}
          setRecetteSelectionnee={setRecetteSelectionnee}
        />
      </div>
    </motion.div>
  );
};

// Composant pour la barre de recherche et le tri
const SearchAndSort = ({ recherche, setRecherche, tri, setTri }) => (
  <div className="flex flex-col md:flex-row justify-between items-center mb-8">
    <div className="w-full md:w-auto mb-4 md:mb-0">
      <div className="relative">
        <input
          type="text"
          placeholder="Rechercher des recettes..."
          className="pl-10 pr-4 py-2 w-full md:w-72 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#FEBD2E]"
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      </div>
    </div>
    <div className="relative">
      <select
        className="appearance-none bg-white border border-gray-300 rounded-full px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-[#FEBD2E]"
        value={tri}
        onChange={(e) => setTri(e.target.value)}
      >
        <option value="Newest">Trier par: Plus récent</option>
        <option value="Oldest">Trier par: Plus ancien</option>
      </select>
      <ChevronDown size={20} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
    </div>
  </div>
);

// Composant pour la barre latérale des catégories
const CategoriesSidebar = ({ categorieActive, setCategorieActive }) => (
  <div className="w-full md:w-1/5">
    <ul className="space-y-2">
      {categories.map((categorie) => (
        <li
          key={categorie.nom}
          className={`cursor-pointer p-3 rounded-full flex items-center transition-colors ${
            categorieActive === categorie.nom ? 'bg-[#FEBD2E] text-white' : 'bg-white hover:bg-gray-100'
          }`}
          onClick={() => setCategorieActive(categorie.nom === categorieActive ? '' : categorie.nom)}
        >
          <span className="mr-3 text-lg">{categorie.icone}</span>
          {categorie.nom}
        </li>
      ))}
    </ul>
  </div>
);

// Composant pour la grille des recettes
const RecettesGrid = ({ recettesFiltrees, setRecetteSelectionnee }) => (
  <div className="w-full md:w-4/5 space-y-8">
    {recettesFiltrees.length > 0 && (
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-3/5">
          <CartePrincipale recette={recettesFiltrees[0]} setRecetteSelectionnee={setRecetteSelectionnee} />
        </div>
        <div className="w-full md:w-2/5 grid grid-cols-1 gap-8">
          {recettesFiltrees.slice(1, 3).map((recette) => (
            <CarteSecondaire key={recette.id} recette={recette} setRecetteSelectionnee={setRecetteSelectionnee} />
          ))}
        </div>
      </div>
    )}
    {recettesFiltrees.length > 3 && (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {recettesFiltrees.slice(3).map((recette) => (
          <CarteSecondaire key={recette.id} recette={recette} setRecetteSelectionnee={setRecetteSelectionnee} />
        ))}
      </div>
    )}
  </div>
);

const CartePrincipale = ({ recette, setRecetteSelectionnee }) => (
  <motion.div 
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.98 }}
    onClick={() => setRecetteSelectionnee(recette)}
    className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row cursor-pointer hover:shadow-xl transition-shadow"
  >
    <div className="w-full md:w-1/2 h-64 md:h-auto relative">
      <Image 
        src={recette.image} 
        alt={recette.nom} 
        layout="fill"
        objectFit="cover"
      />
    </div>
    <div className="p-6 w-full md:w-1/2 flex flex-col justify-between">
      <div>
        <h2 className="text-3xl font-bold mb-3 text-gray-800">{recette.nom}</h2>
        <p className="text-gray-600 mb-4 line-clamp-3">{recette.description}</p>
      </div>
      <RecetteInfo portions={recette.portions} temps={recette.temps} />
    </div>
  </motion.div>
);

const CarteSecondaire = ({ recette, setRecetteSelectionnee }) => (
  <motion.div 
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.98 }}
    onClick={() => setRecetteSelectionnee(recette)}
    className="bg-white rounded-xl shadow-lg overflow-hidden flex cursor-pointer hover:shadow-xl transition-shadow h-40"
  >
    <div className="w-1/3 relative">
      <Image 
        src={recette.image} 
        alt={recette.nom} 
        layout="fill"
        objectFit="cover"
      />
    </div>
    <div className="p-4 w-2/3 flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold mb-1 text-gray-800">{recette.nom}</h3>
        <p className="text-gray-600 text-sm line-clamp-2">{recette.description}</p>
      </div>
      <RecetteInfo portions={recette.portions} temps={recette.temps} />
    </div>
  </motion.div>
);

const RecetteInfo = ({ portions, temps }) => (
  <div className="flex justify-between text-xs text-gray-500">
    <span className="flex items-center">
      <Users size={14} className="mr-1 text-[#FEBD2E]" />
      Portions: {portions}
    </span>
    <span className="flex items-center">
      <Clock size={14} className="mr-1 text-[#FEBD2E]" />
      Temps: {temps}
    </span>
  </div>
);

export default RecettesSection;