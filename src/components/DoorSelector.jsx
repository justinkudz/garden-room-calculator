import { motion } from 'framer-motion';
import { PRICING } from '../utils/pricing';

export default function DoorSelector({ selected, onChange }) {
  const options = [
    {
      value: 'UPVC_FRENCH',
      label: 'uPVC French Doors',
      description: 'Standard double doors with energy-efficient glazing',
      image: '/images/french-doors1.jpg'
    },
    {
      value: 'UPVC_SLIDER',
      label: 'uPVC Sliding Door',
      description: 'Space-saving slide mechanism',
      image: '/images/upvs sliding door.webp'
    },
    {
      value: 'ALU_SLIDER',
      label: 'Aluminium Sliding Doors',
      description: 'Sleek sliding system',
      image: '/images/aluminium sliding doors.webp'
    },
    {
      value: 'ALU_BIFOLD_3M',
      label: 'Aluminium Bi-Fold Doors',
      description: 'Premium bi-fold system',
      image: '/images/bifold doors.jpg'
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-800 hover:border-purple-600/50 transition-colors"
    >
      <h2 className="text-2xl font-bold mb-2 text-white">
        Door System
      </h2>
      <p className="text-sm text-gray-400 mb-6">
        Choose your preferred door configuration
      </p>
      
      <div className="space-y-4">
        {options.map((option, index) => {
          const isSelected = selected === option.value;
          
          return (
            <motion.button
              key={option.value}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => onChange(option.value)}
              className={`
                w-full rounded-lg border-2 overflow-hidden transition-all
                ${isSelected
                  ? 'border-purple-600 bg-purple-900/30 shadow-lg shadow-purple-600/20'
                  : 'border-gray-700 hover:border-gray-600 bg-gray-800/50'
                }
                focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900
              `}
            >
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-48 h-32 md:h-auto bg-gray-800 overflow-hidden">
                  <img
                    src={option.image}
                    alt={option.label}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
                <div className="flex-1 p-4 text-left">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-white text-lg">{option.label}</span>
                      <p className="text-sm text-gray-400 mt-1">{option.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
