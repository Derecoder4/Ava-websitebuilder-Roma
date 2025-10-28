
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full text-center text-xs text-gray-600 py-4">
        <div className="flex items-center justify-center gap-2">
            <span>Powered by ROMA — Ava, the Sentient Vibe Builder.</span>
            <span className="text-gray-700">|</span>
            <a href="#" className="hover:text-gray-400 transition-colors">Built by Josh</a>
        </div>
    </footer>
  );
};

export default Footer;
