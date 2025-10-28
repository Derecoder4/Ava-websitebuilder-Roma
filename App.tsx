
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import AnimatedBackground from './components/AnimatedBackground';
import Navbar from './components/Header';
import InputPanel from './components/InputPanel';
import PreviewPanel from './components/PreviewPanel';
import ActionButtons from './components/ActionButtons';
import Footer from './components/Footer';

export interface CustomizationState {
  speed: 'slow' | 'normal' | 'fast';
  complexity: 'low' | 'medium' | 'high';
}

const defaultCustomization: CustomizationState = {
  speed: 'normal',
  complexity: 'medium',
};

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [customization, setCustomization] = useState<CustomizationState>(() => {
    try {
      const savedSettings = localStorage.getItem('ava-customization-settings');
      if (savedSettings) {
        return JSON.parse(savedSettings);
      }
    } catch (error) {
      console.error("Failed to load customization settings from localStorage", error);
    }
    return defaultCustomization;
  });

  useEffect(() => {
    try {
      localStorage.setItem('ava-customization-settings', JSON.stringify(customization));
    } catch (error) {
      console.error("Failed to save customization settings to localStorage", error);
    }
  }, [customization]);

  const handleGenerate = () => {
    setIsLoading(true);
    setIsGenerated(false);
    setTimeout(() => {
      setIsLoading(false);
      setIsGenerated(true);
    }, 3500);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="relative min-h-screen w-full bg-black text-gray-200 overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10 flex flex-col min-h-screen p-4 sm:p-6 lg:p-8">
        <Navbar />
        
        <main className="flex-grow flex items-center justify-center my-8 md:my-12">
          <motion.div 
            className="w-full max-w-7xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
                <InputPanel 
                  onGenerate={handleGenerate} 
                  isLoading={isLoading}
                  customization={customization}
                  setCustomization={setCustomization}
                />
                <PreviewPanel 
                  isGenerated={isGenerated} 
                  customization={customization}
                />
              </div>
            </motion.div>
          </motion.div>
        </main>
        
        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <ActionButtons />
        </motion.div>
        <Footer />
      </div>
    </div>
  );
};

export default App;