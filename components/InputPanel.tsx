
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CustomizationState } from '../App';

interface InputPanelProps {
  onGenerate: () => void;
  isLoading: boolean;
  customization: CustomizationState;
  setCustomization: React.Dispatch<React.SetStateAction<CustomizationState>>;
}

const loadingMessages = [
  "Ava is dreaming your vibe...",
  "Compiling aesthetics...",
  "Visualizing concepts...",
  "Rendering pixels with soul...",
  "Harmonizing design elements..."
];

const LoadingSpinner: React.FC = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex(prevIndex => (prevIndex + 1) % loadingMessages.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <motion.div
        className="w-16 h-16 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255,102,178,0.8) 0%, rgba(191, 90, 242,0.5) 100%)',
          boxShadow: '0 0 20px rgba(255,102,178,0.7), 0 0 35px rgba(191, 90, 242,0.5)',
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
      <AnimatePresence mode="wait">
        <motion.p 
          key={messageIndex}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.4 }}
          className="text-gray-300 text-sm"
        >
          {loadingMessages[messageIndex]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};

const CustomizationControl: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
  <div>
    <label className="block text-sm font-medium text-gray-400 mb-2">{title}</label>
    {children}
  </div>
);

const ToggleButtonGroup: React.FC<{ options: string[], selected: string, onChange: (value: any) => void }> = ({ options, selected, onChange }) => (
    <div className="flex items-center space-x-2">
        {options.map(option => (
            <button
                key={option}
                onClick={() => onChange(option)}
                className={`px-3 py-1 text-sm rounded-md transition-all duration-200 capitalize w-full
                    ${selected === option ? 'bg-pink-500/80 text-white button-glow' : 'bg-white/10 hover:bg-white/20'}`}
            >
                {option}
            </button>
        ))}
    </div>
);


const InputPanel: React.FC<InputPanelProps> = ({ onGenerate, isLoading, customization, setCustomization }) => {
  const [vibe, setVibe] = useState('');

  return (
    <div className="glass-panel rounded-xl p-6 min-h-[450px] flex flex-col justify-between">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loader"
            className="flex-grow flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LoadingSpinner />
          </motion.div>
        ) : (
          <motion.div
            key="input"
            className="flex-grow flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <textarea
              value={vibe}
              onChange={(e) => setVibe(e.target.value)}
              placeholder="Type your vibe… e.g., ‘A Sentient-inspired dashboard with floating AI orbs and pink energy waves.’"
              className="w-full flex-grow bg-transparent border-0 text-gray-200 placeholder-gray-500 focus:ring-0 resize-none outline-none p-2 text-base"
            />
            
            <div className="mt-4 border-t border-white/10 pt-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CustomizationControl title="Animation Speed">
                    <ToggleButtonGroup
                        options={['slow', 'normal', 'fast']}
                        selected={customization.speed}
                        onChange={(speed) => setCustomization(prev => ({...prev, speed}))}
                    />
                </CustomizationControl>
                <CustomizationControl title="Complexity Level">
                     <ToggleButtonGroup
                        options={['low', 'medium', 'high']}
                        selected={customization.complexity}
                        onChange={(complexity) => setCustomization(prev => ({...prev, complexity}))}
                    />
                </CustomizationControl>
              </div>
            </div>
             <div className="mt-6">
                <button
                    onClick={onGenerate}
                    className="w-full bg-pink-500/90 hover:bg-pink-500 text-white font-bold py-3 px-4 rounded-lg button-glow transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isLoading}
                >
                    Generate with Ava
                </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InputPanel;