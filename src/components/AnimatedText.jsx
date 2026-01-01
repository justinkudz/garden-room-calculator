import { motion } from 'framer-motion';

export default function AnimatedText({ 
  text, 
  className = '', 
  delay = 0,
  duration = 0.5 
}) {
  const words = text.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: delay },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
        duration: duration,
      },
    },
    hidden: {
      opacity: 0,
      x: -20,
    },
  };

  return (
    <motion.span
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={child}
          className="inline-block"
        >
          {word}
          {index < words.length - 1 && '\u00A0'}
        </motion.span>
      ))}
    </motion.span>
  );
}

