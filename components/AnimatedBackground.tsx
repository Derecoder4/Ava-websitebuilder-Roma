
import React from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground: React.FC = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-70">
      <motion.div
        className="absolute top-[10%] left-[10%] w-[400px] h-[400px] bg-pink-500/10 rounded-full filter blur-3xl"
        animate={{
          x: [0, 100, 0, -50, 0],
          y: [0, -50, 50, 100, 0],
          scale: [1, 1.2, 1, 1.1, 1],
        }}
        transition={{
          duration: 35,
          ease: 'easeInOut',
          repeat: Infinity,
        }}
      />
      <motion.div
        className="absolute bottom-[5%] right-[15%] w-[500px] h-[500px] bg-purple-600/10 rounded-full filter blur-3xl"
        animate={{
          x: [0, -80, 0, 100, 0],
          y: [0, 60, -40, 0, 0],
          scale: [1, 1.1, 1.2, 1, 1],
        }}
        transition={{
          duration: 40,
          ease: 'easeInOut',
          repeat: Infinity,
          delay: 5,
        }}
      />
       <motion.div
        className="absolute top-[25%] right-[5%] w-[300px] h-[300px] bg-violet-500/5 rounded-full filter blur-2xl"
        animate={{
          x: [0, -40, 0, 50, 0],
          y: [0, 30, -20, 0, 0],
          rotate: [0, 90, 180, 270, 360]
        }}
        transition={{
          duration: 50,
          ease: 'linear',
          repeat: Infinity,
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
