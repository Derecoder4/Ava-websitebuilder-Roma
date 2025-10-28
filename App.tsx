import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import AnimatedBackground from './components/AnimatedBackground';
import Navbar from './components/Header';
import InputPanel from './components/InputPanel';
import PreviewPanel from './components/PreviewPanel';
import ActionButtons from './components/ActionButtons';
import Footer from './components/Footer';
import AnimatedText from './components/AnimatedText';

export interface CustomizationState {
  speed: 'slow' | 'normal' | 'fast';
  complexity: 'low' | 'medium' | 'high';
}

export interface GeneratedVibe {
  title: string;
  description: string;
  primaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
}

const defaultCustomization: CustomizationState = {
  speed: 'normal',
  complexity: 'medium',
};

// Helper function to determine the initial theme
const getInitialTheme = (): 'light' | 'dark' => {
  if (typeof window !== 'undefined') {
    const savedTheme = localStorage.getItem('ava-theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }
    if (window.matchMedia?.('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
  }
  return 'dark';
};

const App: React.FC = () => {
  // Use lazy initialization for the theme state for robustness
  const [theme, setTheme] = useState<'light' | 'dark'>(getInitialTheme);
  const [isLoading, setIsLoading] = useState(false);
  const [vibe, setVibe] = useState('');
  const [generatedVibe, setGeneratedVibe] = useState<GeneratedVibe | null>(null);
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

  // Effect to apply theme class and save to localStorage
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('ava-theme', theme);
    } catch (error) {
      console.error("Failed to save theme to localStorage", error);
    }
  }, [theme]);

  useEffect(() => {
    try {
      localStorage.setItem('ava-customization-settings', JSON.stringify(customization));
    } catch (error) {
      console.error("Failed to save customization settings to localStorage", error);
    }
  }, [customization]);

  const handleGenerate = async () => {
    if (!vibe.trim()) return;
    setIsLoading(true);
    setGeneratedVibe(null);
  
    // Simulate API call delay with mock data
    setTimeout(() => {
      // Simple hash function to generate a number from the vibe string
      let hash = 0;
      for (let i = 0; i < vibe.length; i++) {
        const char = vibe.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0; // Convert to 32bit integer
      }

      const h = (hash % 360 + 360) % 360; // Hue
      const s = 70 + (hash % 15); // Saturation
      const l = 55 + (hash % 10); // Lightness

      const mockVibe: GeneratedVibe = {
        title: vibe.split(' ').slice(0, 3).join(' ') || 'Generated Vibe',
        description: `A unique aesthetic based on your idea.`,
        primaryColor: `hsl(${h}, ${s}%, ${l}%)`,
        accentColor: `hsl(${(h + 120) % 360}, ${s - 10}%, ${l + 15}%)`,
        backgroundColor: `hsl(${(h + 200) % 360}, 10%, 15%)`,
        textColor: `hsl(${(h + 200) % 360}, 5%, 85%)`,
      };

      setGeneratedVibe(mockVibe);
      setIsLoading(false);
    }, 2000); // 2 second delay
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
    <div className="relative min-h-screen w-full bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-200 overflow-hidden transition-colors duration-300">
      <AnimatedBackground />
      <div className="relative z-10 flex flex-col min-h-screen p-4 sm:p-6 lg:p-8">
        <Navbar theme={theme} setTheme={setTheme} />
        
        <motion.div
            className="text-center my-6 md:my-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        >
            <h2 className="text-3xl md:text-4xl font-bold">
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
                    <AnimatedText text="Hello, I am Ava" />
                </motion.span>
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
                I'm your personal vibe weaver. Describe an idea, a feeling, or a concept, and I'll generate a unique visual representation for you. Let's create something beautiful together.
            </p>
        </motion.div>

        <main className="flex-grow flex justify-center">
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
                  vibe={vibe}
                  setVibe={setVibe}
                />
                <PreviewPanel 
                  generatedVibe={generatedVibe} 
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