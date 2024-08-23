import React, { useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Play, Utensils, Coffee, Cake } from 'lucide-react';

const Hero = ({ setCurrentSection }) => {
  const tiltRef = useRef(null);
  const parallaxRef = useRef(null);
  const controls = useAnimation();

  useEffect(() => {
    const tiltElement = tiltRef.current;
    let rect = tiltElement.getBoundingClientRect();

    const handleMouseMove = (e) => {
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const tiltX = (mouseY / rect.height - 0.5) * 20;
      const tiltY = -(mouseX / rect.width - 0.5) * 20;

      tiltElement.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.05, 1.05, 1.05)`;
    };

    const handleMouseLeave = () => {
      tiltElement.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    };

    const handleResize = () => {
      rect = tiltElement.getBoundingClientRect();
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      parallaxRef.current.style.transform = `translateY(${scrollY * 0.5}px)`;
    };

    tiltElement.addEventListener('mousemove', handleMouseMove);
    tiltElement.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    controls.start({ opacity: 1, y: 0 });

    return () => {
      tiltElement.removeEventListener('mousemove', handleMouseMove);
      tiltElement.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [controls]);

 
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-b from-[#FEBD2E] to-[#FEA82E] text-white relative overflow-hidden min-h-screen flex items-center"
    >
      <div className="absolute inset-0 opacity-10 bg-repeat" style={{ backgroundImage: "url('/pattern.png')" }}></div>

      <FloatingElement Icon={Utensils} top="5%" left="5%" size={40} />
      <FloatingElement Icon={Coffee} top="15%" right="10%" size={30} />
      <FloatingElement Icon={Cake} bottom="10%" left="15%" size={35} />

      <div ref={parallaxRef} className="container mx-auto px-4 py-8 sm:py-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-center">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={controls}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full lg:w-1/2 mb-8 lg:mb-0 space-y-4 text-center"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight font-['Lobster'] text-shadow-lg">
              Secrets de l&apos;Académie des Chefs
            </h1>
            
            <p className="text-sm sm:text-base md:text-lg lg:text-xl font-['Poppins'] mx-auto max-w-md lg:max-w-lg">
              <span className="inline-block bg-white text-[#FEBD2E] rounded-full px-3 py-1 sm:px-4 sm:py-2 font-semibold shadow-md">
                La nature s&apos;éveille, vos papilles aussi : à vos fourneaux !
              </span>
            </p>
            
            <div className="flex justify-center">
              <StartButton setCurrentSection={setCurrentSection} />
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full lg:w-1/2 flex justify-center"
          >
            <div
              ref={tiltRef}
              className="transition-transform duration-300 ease-out relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <img 
                src="/cook1.png" 
                alt="Illustration d'un chef" 
                className="w-full h-auto object-cover rounded-lg shadow-2xl"
              /> 
              <motion.div
                className="absolute -top-2 -left-2 sm:-top-4 sm:-left-4 bg-white rounded-full p-2 sm:p-3 shadow-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <img src="/chef.png" alt="Chef's hat" className="w-8 h-8 sm:w-12 sm:h-12" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.main>
  );
};

const FloatingElement = ({ Icon, top, left, right, bottom, size }) => (
  <motion.div
    className="absolute text-white opacity-50 hidden sm:block"
    style={{ top, left, right, bottom }}
    animate={{
      y: [0, -10, 0],
      rotate: [0, 5, -5, 0],
    }}
    transition={{
      duration: 5,
      repeat: Infinity,
      repeatType: "reverse",
    }}
  >
    <Icon size={size} />
  </motion.div>
);

const StartButton = ({ setCurrentSection }) => (
  <motion.button
    whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgb(255,255,255)" }}
    whileTap={{ scale: 0.95 }}
    className="bg-red-500 text-white rounded-full px-4 py-2 sm:px-6 sm:py-3 hover:bg-red-600 transition duration-300 flex items-center shadow-lg font-['Poppins'] text-sm sm:text-base"
    onClick={() => setCurrentSection('recettes')}
  >
    <Play size={20} className="mr-2" />
    Commencer
  </motion.button>
);

export default Hero;