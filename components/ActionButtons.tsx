import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TooltipButtonProps {
  children: React.ReactNode;
}

const TooltipButton: React.FC<TooltipButtonProps> = ({ children }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full mb-2 w-max px-2 py-1 text-xs text-white bg-black/80 rounded"
          >
            Coming soon...
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="bg-white/60 dark:bg-white/5 backdrop-blur-lg border border-gray-200/80 dark:border-white/10 text-sm px-4 py-2 rounded-lg hover:border-pink-500/50 transition-colors duration-300"
      >
        {children}
      </motion.button>
    </div>
  );
};

const ActionButtons: React.FC = () => {
  return (
    <div className="my-8 flex flex-wrap items-center justify-center gap-4">
      <TooltipButton>Preview in Sandbox</TooltipButton>
      <TooltipButton>Download Code</TooltipButton>
      <TooltipButton>Deploy to Vercel</TooltipButton>
    </div>
  );
};

export default ActionButtons;