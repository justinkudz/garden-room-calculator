import { motion } from 'framer-motion';

export default function Sparkle({ top, left, right, bottom, delay = 0, duration = 3 }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        top,
        left,
        right,
        bottom,
        width: '4px',
        height: '4px',
        zIndex: 0,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, 1, 0],
        y: [-20, -60],
        x: [0, Math.random() * 40 - 20],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeOut',
      }}
    >
      <div
        className="w-full h-full rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(192, 192, 192, 0.9) 0%, rgba(107, 92, 231, 0.6) 50%, transparent 100%)',
          boxShadow: '0 0 8px rgba(107, 92, 231, 0.5)',
        }}
      />
    </motion.div>
  );
}

export function ShootingStar({ top, left, delay = 0 }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        top,
        left,
        width: '2px',
        height: '60px',
        zIndex: 0,
      }}
      initial={{ opacity: 0, x: 0, y: 0, rotate: -45 }}
      animate={{
        opacity: [0, 1, 0],
        x: [0, 200],
        y: [0, 200],
      }}
      transition={{
        duration: 1.5,
        delay,
        repeat: Infinity,
        repeatDelay: 5,
        ease: 'easeOut',
      }}
    >
      <div
        className="w-full h-full"
        style={{
          background: 'linear-gradient(to bottom, rgba(192, 192, 192, 0.8) 0%, rgba(107, 92, 231, 0.6) 50%, transparent 100%)',
          boxShadow: '0 0 10px rgba(107, 92, 231, 0.4)',
        }}
      />
    </motion.div>
  );
}

