import { motion } from 'framer-motion';
import AnimatedGradientText from './AnimatedGradientText';
import ShootingStarLine from './ShootingStarLine';

export default function Header() {
  return (
    <header className="bg-[#0A0A0A] border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl lg:text-7xl font-black text-white text-center leading-tight relative"
        >
          <ShootingStarLine className="absolute top-0 left-0 right-0 mb-0" delay={0.3} />
          <AnimatedGradientText>Glasgow Garden Room</AnimatedGradientText> Cost Calculator
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center text-gray-400 mt-4 text-xl"
        >
          Premium Garden Rooms from <span className="font-bold text-purple-400">£10,000</span>
        </motion.p>
      </div>
    </header>
  );
}

