
import React from 'react';
import { motion } from 'framer-motion';

const Navbar: React.FC = () => {
  const navVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const navLinks = ['Showcase', 'Docs', 'Community'];

  return (
    <motion.nav 
      className="relative w-full py-4 flex justify-between items-center"
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex items-center gap-3">
        <motion.div
          className="w-4 h-4 rounded-full bg-pink-500"
          animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{
             boxShadow: '0 0 12px rgba(255,102,178,0.8)',
          }}
        />
        <h1 className="text-4xl md:text-5xl font-bold">
            <motion.span
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              className="text-glow"
              style={{
                background: 'linear-gradient(90deg, #ff66b2, #bf5af2, #ff66b2)',
                backgroundSize: '200% 200%',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Ava
            </motion.span>
        </h1>
      </div>

      <div className="hidden md:flex items-center gap-6">
        {navLinks.map(link => (
            <a key={link} href="#" className="text-sm text-gray-400 hover:text-white transition-colors duration-300">
                {link}
            </a>
        ))}
      </div>
    </motion.nav>
  );
};

export default Navbar;
