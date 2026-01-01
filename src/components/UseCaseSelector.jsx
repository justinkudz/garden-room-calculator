import { motion } from 'framer-motion';
import { Briefcase, Music, Dumbbell, Palette, Leaf, Grid } from 'lucide-react';

const USE_CASES = [
  {
    id: 'HOME_OFFICE',
    icon: Briefcase,
    title: 'Home Office',
    description: 'Professional workspace for remote work',
    color: 'purple'
  },
  {
    id: 'MUSIC_STUDIO',
    icon: Music,
    title: 'Music Studio',
    description: 'Soundproofed space for music & recording',
    color: 'purple'
  },
  {
    id: 'GARDEN_GYM',
    icon: Dumbbell,
    title: 'Garden Gym',
    description: 'Personal fitness space',
    color: 'purple'
  },
  {
    id: 'ART_STUDIO',
    icon: Palette,
    title: 'Art Studio',
    description: 'Creative space with natural light',
    color: 'purple'
  },
  {
    id: 'GARDEN_RETREAT',
    icon: Leaf,
    title: 'Garden Retreat',
    description: 'Peaceful escape for relaxation',
    color: 'purple'
  },
  {
    id: 'MULTI_PURPOSE',
    icon: Grid,
    title: 'Multi-Purpose',
    description: 'Flexible space for various uses',
    color: 'purple'
  }
];

export default function UseCaseSelector({ selected, onChange }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-800"
    >
      <h2 className="text-2xl font-bold mb-2 text-white">
        What will you use your garden room for?
      </h2>
      <p className="text-sm text-gray-400 mb-6">
        Select your use case to see personalized recommendations
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {USE_CASES.map((useCase, index) => {
          const Icon = useCase.icon;
          const isSelected = selected === useCase.id;
          
          return (
            <motion.button
              key={useCase.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onChange(useCase.id)}
              className={`
                p-6 rounded-lg border-2 text-left transition-all
                ${isSelected
                  ? 'border-purple-600 bg-purple-900/30 shadow-lg shadow-purple-600/20'
                  : 'border-gray-700 hover:border-gray-600 bg-gray-800/50'
                }
                focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900
              `}
            >
              <Icon className={`w-8 h-8 mb-3 ${isSelected ? 'text-purple-400' : 'text-gray-400'}`} />
              <h3 className={`font-semibold text-lg mb-1 ${isSelected ? 'text-white' : 'text-gray-300'}`}>
                {useCase.title}
              </h3>
              <p className="text-sm text-gray-400">{useCase.description}</p>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}

