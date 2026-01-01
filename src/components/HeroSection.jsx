import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Sparkle, { ShootingStar } from './Sparkles';
import AnimatedText from './AnimatedText';
import ShootingStarLine from './ShootingStarLine';

export default function HeroSection() {
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    const newSparkles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 3,
    }));
    setSparkles(newSparkles);
  }, []);

  return (
    <div className="relative bg-[#0A0A0A] text-white py-16 px-4 overflow-hidden">
      {/* Sparkles and Shooting Stars */}
      {sparkles.map((sparkle) => (
        <Sparkle
          key={sparkle.id}
          top={sparkle.top}
          left={sparkle.left}
          delay={sparkle.delay}
          duration={2 + Math.random() * 2}
        />
      ))}
      <ShootingStar top="10%" left="20%" delay={0} />
      <ShootingStar top="60%" left="70%" delay={2} />
      
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 relative"
        >
          <ShootingStarLine className="absolute -top-4 left-0 right-0 mb-0" delay={0.3} />
          Design Your Perfect Garden Room
        </motion.h2>
        <div className="text-gray-400 text-lg md:text-xl">
          <AnimatedText 
            text="Use our interactive calculator to get an instant estimate for your custom garden room. Complete your details to receive a detailed, personalized quote."
            delay={0.2}
          />
        </div>
      </div>
    </div>
  );
}

