import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

const Navbar: React.FC<NavbarProps> = ({ theme, setTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const navVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };
  
  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: 'easeIn' } },
  };

  const navLinks = [
    { name: 'Blog', href: '#' },
    { name: 'Projects', href: '#' },
    { name: 'Community', href: '#' },
  ];

  const HamburgerIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
    </svg>
  );
  
  const CloseIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );

  const SunIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );
  
  const MoonIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  );

  return (
    <motion.header 
      className="relative w-full z-20"
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      <nav className="bg-white/60 dark:bg-white/5 backdrop-blur-lg border border-gray-200/80 dark:border-white/10 rounded-full px-4 sm:px-6 py-3 flex justify-between items-center transition-colors duration-300">
        <div className="flex items-center gap-3">
          <motion.div
            className="w-4 h-4 rounded-full bg-pink-500"
            animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
               boxShadow: '0 0 12px rgba(255,102,178,0.8)',
            }}
          />
          <h1 className="text-2xl md:text-3xl font-bold">
              <motion.span
                animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                className="dark:text-glow"
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

        <div className="hidden md:flex items-center gap-4">
          {navLinks.map(link => (
              <a key={link.name} href={link.href} className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-300">
                  {link.name}
              </a>
          ))}
           <button onClick={toggleTheme} className="p-2 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors duration-300" aria-label="Toggle theme">
              {theme === 'light' ? <MoonIcon /> : <SunIcon />}
          </button>
          <a href="#">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-900 text-white dark:bg-white/10 dark:text-gray-200 text-sm px-4 py-2 rounded-full hover:bg-gray-700 dark:hover:bg-white/20 transition-colors duration-300"
            >
              Get Started
            </motion.button>
          </a>
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="focus:outline-none p-1" aria-label="Toggle menu" aria-expanded={isMenuOpen}>
            {isMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden mt-2 bg-white/80 dark:bg-black/70 backdrop-blur-lg border border-gray-200/80 dark:border-white/10 rounded-xl p-4 flex flex-col items-center space-y-4"
          >
            {navLinks.map(link => (
              <a key={link.name} href={link.href} className="text-gray-800 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-300 w-full text-center py-2">
                  {link.name}
              </a>
            ))}
            <a href="#" className="w-full">
                <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-pink-500 w-full text-white font-bold py-3 px-4 rounded-lg button-shadow-light dark:button-glow transition-all duration-300"
                >
                    Get Started
                </motion.button>
            </a>
            <button onClick={toggleTheme} className="p-2 mt-2 rounded-full text-gray-600 dark:text-gray-400 bg-gray-200 dark:bg-white/10" aria-label="Toggle theme">
                {theme === 'light' ? <MoonIcon /> : <SunIcon />}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;