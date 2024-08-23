
import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const Modal = ({ showModal, setShowModal, modalType }) => {
  const modalRef = useRef(null);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleCloseModal}
        >
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-xl p-6 max-w-lg mx-auto"
            onClick={(e) => e.stopPropagation()} // Empêche la fermeture lors du clic sur le contenu
          >
            <button className="absolute top-3 right-3" onClick={handleCloseModal}>
              <X size={20} />
            </button>
            {modalType === 'faq' && <FAQContent />}
            {modalType === 'contact' && <ContactContent />}
            {modalType === 'connexion' && <ConnexionContent />}
            {modalType === 'inscription' && <InscriptionContent />}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Sous-composant pour le contenu FAQ
const FAQContent = () => (
  <div>
    <h2 className="text-2xl font-semibold mb-4">FAQ</h2>
    <ul className="list-disc pl-5 mb-8 text-gray-700">
      <li className="mb-2">
        <strong>Question : </strong>Comment puis-je me connecter à TopChef ?
        <p>
          <strong>Réponse :</strong>Il n&apos;est pas encore possible de se connecter ou s&apos;inscrire sur TopChef, cette fonctionnalité viendra lors de futurs mises à jour.
        </p>
      </li>
     
    </ul>
  </div>
);

// Sous-composant pour le contenu Contact
const ContactContent = () => (
  <div>
    <h2 className="text-2xl font-semibold mb-4">Contact</h2>
    <p className="mb-4">Pour toute question ou suggestion, n&apos;hésitez pas à nous contacter : </p>
    <p>
      <strong>Email :</strong> babisitecontact@gmail.com
      <br />
      <strong>Téléphone :</strong> +225 07 06 70 93 90
    </p>
  </div>
);

// Sous-composant pour le formulaire de connexion
const ConnexionContent = () => (
  <div>
    <h2 className="text-2xl font-semibold mb-4">Connexion</h2>
    <p className="mb-4">Veuillez saisir votre email et votre mot de passe pour vous connecter.</p>
    <form>
      <InputField id="email" type="email" label="Email :" />
      <InputField id="password" type="password" label="Mot de passe :" />
      <div className="flex items-center justify-between mt-6">
        <button
          type="submit"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Se connecter
        </button>
        <a className="inline-block align-baseline font-bold text-sm text-red-500 hover:text-red-800" href="#">
          Mot de passe oublié ?
        </a>
      </div>
    </form>
  </div>
);

// Sous-composant pour le formulaire d'inscription
const InscriptionContent = () => (
  <div>
    <h2 className="text-2xl font-semibold mb-4">Inscription</h2>
    <p className="mb-4">Veuillez renseigner les informations suivantes pour créer un compte.</p>
    <form>
      <InputField id="nom" type="text" label="Nom :" />
      <InputField id="email" type="email" label="Email :" />
      <InputField id="password" type="password" label="Mot de passe :" />
      <InputField id="confirmPassword" type="password" label="Confirmer mot de passe :" />
      <div className="flex items-center justify-between mt-6">
        <button
          type="submit"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          S&apos;inscrire
        </button>
      </div>
    </form>
  </div>
);

// Composant réutilisable pour les champs de formulaire
const InputField = ({ id, type, label }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-gray-700 text-sm font-bold mb-2">
      {label}
    </label>
    <input
      type={type}
      id={id}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
  </div>
);

export default Modal;