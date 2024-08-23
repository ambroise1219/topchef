import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const produits = [
  { 
    id: 1, 
    name: "Set de Couteaux Premium", 
    price: 79800, 
    image: "/couteau.jpg",
    description: "Un ensemble de couteaux de haute qualité pour tous vos besoins culinaires. Fabriqués en acier inoxydable avec des manches ergonomiques.",
    caracteristiques: ["Acier inoxydable", "6 pièces", "Rangement inclus"]
  },
  { 
    id: 2, 
    name: "Robot Culinaire Multifonction", 
    price: 159700, 
    image: "/robot.jpg",
    description: "Un robot de cuisine puissant et polyvalent pour faciliter toutes vos préparations. Idéal pour hacher, mélanger, pétrir et plus encore.",
    caracteristiques: ["1200W", "Bol 3L", "10 vitesses", "Nombreux accessoires"]
  },
  { 
    id: 3, 
    name: "Mixeur Plongeant", 
    price: 15000, 
    image: "/mixeur.jpg",
    description: "Un mixeur plongeant pratique et efficace pour vos soupes, sauces et smoothies. Design ergonomique et facile à nettoyer.",
    caracteristiques: ["600W", "Lame en acier inoxydable", "Pied détachable"]
  },
  { 
    id: 4, 
    name: "Planche à découper en bois", 
    price: 19000, 
    image: "/planche.jfif",
    description: "Une planche à découper robuste en bois d'acacia. Surface lisse et durable, idéale pour tous types de découpes.",
    caracteristiques: ["Bois d'acacia", "40x30cm", "Rainure pour jus"]
  },
  { 
    id: 5, 
    name: "Moule à gâteau", 
    price: 12400, 
    image: "/moule.webp",
    description: "Un moule à gâteau antiadhésif pour des démoulages parfaits. Répartition uniforme de la chaleur pour une cuisson homogène.",
    caracteristiques: ["Ø 26cm", "Antiadhésif", "Compatible lave-vaisselle"]
  },
  { 
    id: 6, 
    name: "Set de cuillères à mesurer", 
    price: 9900, 
    image: "/cuilleres.jfif",
    description: "Un ensemble complet de cuillères à mesurer en acier inoxydable. Précises et durables pour toutes vos recettes.",
    caracteristiques: ["6 tailles", "Acier inoxydable", "Anneau de rangement"]
  },
  { 
    id: 7, 
    name: "Tablier de cuisine", 
    price: 8000, 
    image: "/tablier.jfif",
    description: "Un tablier de cuisine élégant et fonctionnel. Protège vos vêtements tout en ajoutant une touche de style à votre cuisine.",
    caracteristiques: ["100% coton", "Poche frontale", "Attache réglable"]
  }
];

const Boutique = () => {
  const [panier, setPanier] = useState([]);
  const [showPanierModal, setShowPanierModal] = useState(false);
  const [etapePaiement, setEtapePaiement] = useState(0);
  const [produitSelectionne, setProduitSelectionne] = useState(null);

  const ajouterAuPanier = (produit) => {
    setPanier([...panier, produit]);
  };

  const retirerDuPanier = (produitId) => {
    setPanier(panier.filter(item => item.id !== produitId));
  };

  const totalPanier = panier.reduce((total, item) => total + item.price, 0);

  const ouvrirDetailsProduit = (produit) => {
    setProduitSelectionne(produit);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-16 relative"
    >
      <h1 className="text-5xl font-bold mb-8 text-center text-gray-800">Notre Boutique Culinaire</h1>
      <p className="text-xl mb-12 text-center text-gray-600">Découvrez nos produits exclusifs pour vous aider à cuisiner comme un chef !</p>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed top-4 right-4 bg-[#FEBD2E] text-white px-6 py-3 rounded-full shadow-lg z-50"
        onClick={() => setShowPanierModal(true)}
      >
        🛒 Panier ({panier.length})
      </motion.button>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {produits.map((produit) => (
          <ProduitCard 
            key={produit.id} 
            produit={produit} 
            ajouterAuPanier={ajouterAuPanier}
            ouvrirDetailsProduit={ouvrirDetailsProduit}
          />
        ))}
      </div>

      <AnimatePresence>
        {showPanierModal && (
          <PanierModal 
            closeModal={() => { setShowPanierModal(false); setEtapePaiement(0); }}
            panier={panier}
            retirerDuPanier={retirerDuPanier}
            totalPanier={totalPanier}
            etapePaiement={etapePaiement}
            setEtapePaiement={setEtapePaiement}
          />
        )}
        {produitSelectionne && (
          <DetailsProduitModal 
            produit={produitSelectionne}
            fermerModal={() => setProduitSelectionne(null)}
            ajouterAuPanier={ajouterAuPanier}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ProduitCard = ({ produit, ajouterAuPanier, ouvrirDetailsProduit }) => {
  return (
    <motion.div 
      className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition duration-300 hover:shadow-2xl"
      whileHover={{ y: -5 }}
    >
      <div 
        className="relative h-64 overflow-hidden cursor-pointer"
        onClick={() => ouvrirDetailsProduit(produit)}
      >
        <motion.div
          className="w-full h-full relative"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          <Image 
            src={produit.image} 
            alt={produit.name} 
            layout="fill"
            objectFit="cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
          <span className="text-white text-lg font-semibold">Voir détails</span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-gray-800">{produit.name}</h3>
        <p className="text-gray-600 font-semibold mb-4">{produit.price.toLocaleString()} CFA</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#FEBD2E] text-white px-4 py-2 rounded-full w-full font-semibold"
          onClick={() => ajouterAuPanier(produit)}
        >
          Ajouter au panier
        </motion.button>
      </div>
    </motion.div>
  );
};

const DetailsProduitModal = ({ produit, fermerModal, ajouterAuPanier }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={fermerModal}
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        className="bg-white rounded-3xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-3xl font-bold text-gray-800">{produit.name}</h2>
          <button onClick={fermerModal} className="text-2xl text-gray-500 hover:text-gray-700">&times;</button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2 relative h-64 md:h-auto">
            <Image 
              src={produit.image} 
              alt={produit.name} 
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
          <div className="w-full md:w-1/2">
            <p className="text-gray-600 mb-4">{produit.description}</p>
            <h3 className="text-xl font-semibold mb-2">Caractéristiques :</h3>
            <ul className="list-disc pl-5 mb-6">
              {produit.caracteristiques.map((carac, index) => (
                <li key={index} className="text-gray-600">{carac}</li>
              ))}
            </ul>
            <p className="text-2xl font-bold text-gray-800 mb-6">{produit.price.toLocaleString()} CFA</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#FEBD2E] text-white px-6 py-3 rounded-full w-full font-semibold"
              onClick={() => {
                ajouterAuPanier(produit);
                fermerModal();
              }}
            >
              Ajouter au panier
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const PanierModal = ({ closeModal, panier, retirerDuPanier, totalPanier, etapePaiement, setEtapePaiement }) => {
  const etapes = ['Panier', 'Livraison', 'Paiement', 'Confirmation'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={closeModal}
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        className="bg-white rounded-3xl p-8 max-w-3xl w-full max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">{etapes[etapePaiement]}</h2>
          <button onClick={closeModal} className="text-2xl text-gray-500 hover:text-gray-700">&times;</button>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center">
            {etapes.map((etape, index) => (
              <React.Fragment key={etape}>
                <div className={`flex flex-col items-center ${index <= etapePaiement ? 'text-[#FEBD2E]' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${index <= etapePaiement ? 'bg-[#FEBD2E] text-white' : 'bg-gray-200'}`}>
                    {index + 1}
                  </div>
                  <span className="mt-2 text-sm">{etape}</span>
                </div>
                {index < etapes.length - 1 && (
                  <div className={`flex-1 h-1 ${index < etapePaiement ? 'bg-[#FEBD2E]' : 'bg-gray-200'}`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {etapePaiement === 0 && (
          <div>
            {panier.length === 0 ? (
              <p className="text-center text-gray-500 my-8">Votre panier est vide</p>
            ) : (
              <>
                {panier.map((item) => (
                  <div key={item.id} className="flex justify-between items-center mb-4 pb-4 border-b">
                    <div className="flex items-center">
                      <div className="relative w-16 h-16 mr-4">
                        <Image 
                          src={item.image} 
                          alt={item.name} 
                          layout="fill"
                          objectFit="cover"
                          className="rounded-lg"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-gray-600">{item.price.toLocaleString()} CFA</p>
                      </div>
                    </div>
                    <button onClick={() => retirerDuPanier(item.id)} className="text-red-500 hover:text-red-700">
                      Retirer
                    </button>
                  </div>
                ))}
                <div className="mt-6 text-right">
                  <p className="text-xl font-bold">Total: {totalPanier.toLocaleString()} CFA</p>
                </div>
              </>
            )}
          </div>
        )}

        {etapePaiement === 1 && (
          <form className="space-y-4">
            <input className="w-full p-2 border rounded" placeholder="Nom complet" required />
            <input className="w-full p-2 border rounded" placeholder="Adresse" required />
            <input className="w-full p-2 border rounded" placeholder="Ville" required />
            <input className="w-full p-2 border rounded" placeholder="Code postal" required />
            <input className="w-full p-2 border rounded" placeholder="Numéro de téléphone" required />
          </form>
        )}

        {etapePaiement === 2 && (
          <form className="space-y-4">
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2">
                <input type="radio" name="paymentMethod" value="card" defaultChecked />
                <span>Carte de crédit</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="radio" name="paymentMethod" value="paypal" />
                <span>PayPal</span>
              </label>
            </div>
            <input className="w-full p-2 border rounded" placeholder="Nom sur la carte" required />
            <input className="w-full p-2 border rounded" placeholder="Numéro de carte" required />
            <div className="flex space-x-4">
              <input className="w-1/2 p-2 border rounded" placeholder="MM/AA" required />
              <input className="w-1/2 p-2 border rounded" placeholder="CVC" required />
            </div>
          </form>
        )}

        {etapePaiement === 3 && (
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <span className="text-white text-5xl">✓</span>
            </motion.div>
            <h3 className="text-2xl font-bold mb-4">Commande Confirmée!</h3>
            <p className="text-gray-600 mb-4">Merci pour votre achat. Vous recevrez bientôt un email de confirmation.</p>
            <p className="text-gray-600">Numéro de commande: <span className="font-semibold">#OD{Math.floor(100000 + Math.random() * 900000)}</span></p>
          </div>
        )}

        <div className="mt-8 flex justify-between">
          {etapePaiement > 0 && etapePaiement < 3 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-200 text-gray-800 px-6 py-2 rounded-full"
              onClick={() => setEtapePaiement(etapePaiement - 1)}
            >
              Retour
            </motion.button>
          )}
          {etapePaiement < 3 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#FEBD2E] text-white px-6 py-2 rounded-full ml-auto"
              onClick={() => {
                if (etapePaiement === 2) {
                  // Ici, vous pourriez ajouter une logique de validation du paiement
                  setTimeout(() => setEtapePaiement(etapePaiement + 1), 1000); // Simuler un traitement
                } else {
                  setEtapePaiement(etapePaiement + 1);
                }
              }}
            >
              {etapePaiement === 2 ? "Payer" : "Suivant"}
            </motion.button>
          )}
          {etapePaiement === 3 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#FEBD2E] text-white px-6 py-2 rounded-full mx-auto"
              onClick={closeModal}
            >
              Fermer
            </motion.button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Boutique;