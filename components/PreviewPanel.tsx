
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CustomizationState } from '../App';

interface PreviewPanelProps {
  isGenerated: boolean;
  customization: CustomizationState;
}

const speedToDuration = {
  slow: 0.8,
  normal: 0.5,
  fast: 0.2,
};

const useTypingEffect = (text: string, speed: number, start: boolean) => {
    const [displayedText, setDisplayedText] = useState('');
  
    useEffect(() => {
      if (!start) return;
      setDisplayedText(''); 
      
      let i = 0;
      const intervalId = setInterval(() => {
        setDisplayedText(text.substring(0, i + 1));
        i++;
        if (i > text.length) {
          clearInterval(intervalId);
        }
      }, speed);
  
      return () => clearInterval(intervalId);
    }, [text, speed, start]);
  
    return displayedText;
  };

const TypingText: React.FC<{ text: string, speed?: number, className?: string, isGenerated: boolean }> = ({ text, speed = 50, className, isGenerated }) => {
    const typedText = useTypingEffect(text, speed, isGenerated);
    return <span className={className}>{typedText}</span>
};

const MockUI: React.FC<{ customization: CustomizationState; isGenerated: boolean }> = ({ customization, isGenerated }) => {
  const duration = speedToDuration[customization.speed];
  const { complexity } = customization;

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration, ease: 'easeOut' } },
  };

  const ComplexityBasedLayout = () => {
    const baseItems = (
      <>
        <motion.div variants={itemVariants} className="w-3/4 h-8 rounded-md" style={{ backgroundColor: `hsla(0, 0%, 100%, 0.1)` }}></motion.div>
        <motion.div variants={itemVariants} className="w-full h-16 bg-white/5 rounded-lg border border-white/10 flex items-center p-4">
          <div className="w-8 h-8 rounded-full button-glow" style={{ backgroundColor: `hsla(330, 80%, 60%, 0.5)` }}></div>
          <div className="w-1/3 h-4 bg-white/10 rounded-md ml-4"></div>
        </motion.div>
      </>
    );

    const mediumItems = (
      <>
        <div className="flex-grow grid grid-cols-2 gap-4">
          <motion.div variants={itemVariants} className="bg-white/5 border border-white/10 rounded-lg p-3">
            <div className="w-full h-4 bg-white/10 rounded-md mb-2"></div>
            <div className="w-2/3 h-4 bg-white/10 rounded-md"></div>
          </motion.div>
          <motion.div variants={itemVariants} className="border rounded-lg button-glow-violet flex items-center justify-center" style={{ backgroundColor: `hsla(270, 80%, 60%, 0.1)`, borderColor: `hsla(270, 80%, 60%, 0.2)`}}>
            <span style={{ color: `hsla(270, 80%, 80%, 1)` }}>Visualize</span>
          </motion.div>
        </div>
      </>
    );

     const highItems = (
      <>
        <div className="flex-grow grid grid-cols-3 gap-4">
           <motion.div variants={itemVariants} className="bg-white/5 border border-white/10 rounded-lg"></motion.div>
           <motion.div variants={itemVariants} className="bg-white/5 border border-white/10 rounded-lg"></motion.div>
           <motion.div variants={itemVariants} className="bg-white/5 border border-white/10 rounded-lg"></motion.div>
        </div>
      </>
    );

    const engageButton = (
      <motion.div variants={itemVariants} className="w-full h-10 rounded-lg button-glow flex items-center justify-center" style={{ backgroundColor: `hsla(330, 80%, 60%, 0.8)` }}>
        <TypingText text="Engage" speed={100} isGenerated={isGenerated} className="font-bold text-white"/>
      </motion.div>
    );
    
    switch(complexity) {
      case 'low':
        return <>{baseItems}{engageButton}</>;
      case 'medium':
        return <>{baseItems}{mediumItems}{engageButton}</>;
      case 'high':
        return <>{baseItems}{mediumItems}{highItems}{engageButton}</>;
      default:
        return <>{baseItems}{mediumItems}{engageButton}</>;
    }
  };

  return (
    <motion.div
      className="w-full h-full p-6 flex flex-col space-y-4"
      variants={{ visible: { transition: { staggerChildren: duration / 2 } } }}
      initial="hidden"
      animate="visible"
    >
      <ComplexityBasedLayout />
    </motion.div>
  );
};

const PreviewPanel: React.FC<PreviewPanelProps> = ({ isGenerated, customization }) => {
  return (
    <div className="glass-panel rounded-xl min-h-[450px] flex items-center justify-center">
      <AnimatePresence mode="wait">
        {!isGenerated ? (
          <motion.div
            key="placeholder"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-gray-500 text-center"
          >
            <p>Your generated UI will appear here.</p>
          </motion.div>
        ) : (
          <motion.div
            key="generated"
            className="w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <MockUI customization={customization} isGenerated={isGenerated} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PreviewPanel;