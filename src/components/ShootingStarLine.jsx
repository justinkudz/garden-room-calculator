import { motion } from 'framer-motion';

export default function ShootingStarLine({ className = '', delay = 0 }) {
  return (
    <div className={`relative h-0.5 overflow-hidden mb-4 ${className}`}>
      {/* Base purple line */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-600 to-transparent opacity-30"></div>
      
      {/* Shooting star effect */}
      <motion.div
        className="absolute inset-0"
        initial={{ x: '-100%' }}
        whileInView={{ x: '100%' }}
        viewport={{ once: true }}
        transition={{
          duration: 1.5,
          delay: delay,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatDelay: 2,
        }}
      >
        <div 
          className="h-full w-32 bg-gradient-to-r from-transparent via-purple-400 to-transparent"
          style={{
            boxShadow: '0 0 20px rgba(139, 92, 246, 0.8), 0 0 40px rgba(139, 92, 246, 0.6)',
            filter: 'blur(1px)',
          }}
        ></div>
      </motion.div>
      
      {/* Glow trail */}
      <motion.div
        className="absolute inset-0"
        initial={{ x: '-100%' }}
        whileInView={{ x: '100%' }}
        viewport={{ once: true }}
        transition={{
          duration: 1.5,
          delay: delay + 0.1,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatDelay: 2,
        }}
      >
        <div 
          className="h-full w-16 bg-gradient-to-r from-transparent via-purple-300 to-transparent opacity-50"
          style={{
            boxShadow: '0 0 15px rgba(196, 181, 253, 0.6)',
            filter: 'blur(2px)',
          }}
        ></div>
      </motion.div>
    </div>
  );
}

