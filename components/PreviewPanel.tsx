import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CustomizationState, GeneratedVibe } from '../App';

interface PreviewPanelProps {
  generatedVibe: GeneratedVibe | null;
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

const GeneratedVibeUI: React.FC<{ customization: CustomizationState; vibe: GeneratedVibe }> = ({ customization, vibe }) => {
  const duration = speedToDuration[customization.speed];
  const { complexity } = customization;

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration, ease: 'easeOut' } },
  };

  const ComplexityBasedLayout = () => {
    const baseItems = (
      <>
        <motion.div variants={itemVariants} className="w-3/4 h-8 rounded-md" style={{ backgroundColor: vibe.backgroundColor, opacity: 0.6 }}></motion.div>
        <motion.div variants={itemVariants} className="w-full h-16 rounded-lg border flex items-center p-4" style={{ backgroundColor: vibe.backgroundColor, borderColor: vibe.accentColor }}>
          <div className="w-8 h-8 rounded-full" style={{ backgroundColor: vibe.primaryColor, boxShadow: `0 0 12px ${vibe.primaryColor}` }}></div>
          <div className="w-1/3 h-4 rounded-md ml-4" style={{ backgroundColor: vibe.textColor, opacity: 0.3 }}></div>
        </motion.div>
      </>
    );

    const mediumItems = (
      <>
        <div className="flex-grow grid grid-cols-2 gap-4">
          <motion.div variants={itemVariants} className="border rounded-lg p-3" style={{ backgroundColor: vibe.backgroundColor, borderColor: vibe.accentColor }}>
            <div className="w-full h-4 rounded-md mb-2" style={{ backgroundColor: vibe.textColor, opacity: 0.3 }}></div>
            <div className="w-2/3 h-4 rounded-md" style={{ backgroundColor: vibe.textColor, opacity: 0.3 }}></div>
          </motion.div>
          <motion.div variants={itemVariants} className="border rounded-lg flex items-center justify-center" style={{ backgroundColor: vibe.backgroundColor, borderColor: vibe.accentColor, boxShadow: `0 0 12px ${vibe.accentColor}` }}>
            <span className="font-semibold" style={{ color: vibe.accentColor }}>Visualize</span>
          </motion.div>
        </div>
      </>
    );

     const highItems = (
      <>
        <div className="flex-grow grid grid-cols-3 gap-4">
           <motion.div variants={itemVariants} className="rounded-lg" style={{ backgroundColor: vibe.backgroundColor, borderColor: vibe.accentColor, border: '1px solid' }}></motion.div>
           <motion.div variants={itemVariants} className="rounded-lg" style={{ backgroundColor: vibe.backgroundColor, borderColor: vibe.accentColor, border: '1px solid' }}></motion.div>
           <motion.div variants={itemVariants} className="rounded-lg" style={{ backgroundColor: vibe.backgroundColor, borderColor: vibe.accentColor, border: '1px solid' }}></motion.div>
        </div>
      </>
    );

    const engageButton = (
      <motion.div variants={itemVariants} className="w-full h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: vibe.primaryColor, boxShadow: `0 0 12px ${vibe.primaryColor}` }}>
        <TypingText text={vibe.title || "Engage"} speed={100} isGenerated={!!vibe} className="font-bold text-white"/>
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

const PreviewPanel: React.FC<PreviewPanelProps> = ({ generatedVibe, customization }) => {
  return (
    <div className="bg-white/60 dark:bg-white/5 backdrop-blur-lg border border-gray-200/80 dark:border-white/10 rounded-xl min-h-[450px] flex items-center justify-center transition-colors duration-300">
      <AnimatePresence mode="wait">
        {!generatedVibe ? (
          <motion.div
            key="placeholder"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-gray-600 dark:text-gray-500 text-center"
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
            <GeneratedVibeUI customization={customization} vibe={generatedVibe} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PreviewPanel;