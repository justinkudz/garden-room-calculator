import { motion } from 'framer-motion';

export default function AnimatedGradientText({ children, className = '' }) {
  const cleanClassName = className.replace(/text-(white|purple-\d+)/g, '').trim();
  
  return (
    <motion.span
      className={`inline-block ${cleanClassName}`}
      animate={{
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        filter: [
          'drop-shadow(0 0 8px rgba(107, 92, 231, 0.6))',
          'drop-shadow(0 0 16px rgba(107, 92, 231, 0.9))',
          'drop-shadow(0 0 8px rgba(107, 92, 231, 0.6))',
        ],
      }}
      transition={{
        backgroundPosition: {
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        },
        filter: {
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      }}
      style={{
        background: 'linear-gradient(90deg, #6B5CE7 0%, #9F7AEA 50%, #C4B5FD 100%, #9F7AEA 50%, #6B5CE7 0%)',
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        display: 'inline-block',
      }}
    >
      {children}
    </motion.span>
  );
}

