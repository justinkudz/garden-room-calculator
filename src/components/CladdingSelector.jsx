import { motion } from 'framer-motion';
import { PRICING } from '../utils/pricing';
import { USE_CASE_RECOMMENDATIONS } from '../utils/useCaseDefaults';

export default function CladdingSelector({ selected, onChange, wallArea, useCase }) {
  const recommendations = USE_CASE_RECOMMENDATIONS[useCase] || {};
  const showCedarRecommendation = recommendations.cedarCladding;
  
  const options = [
    {
      value: 'THERMOWOOD',
      label: 'Thermowood',
      description: 'Durable heat-treated timber (standard)',
      image: '/images/thermowood cladding.jpg',
      recommended: false
    },
    {
      value: 'CEDAR',
      label: 'Western Red Cedar',
      description: 'Premium natural finish, weathers beautifully',
      image: '/images/western red cedar.png',
      recommended: showCedarRecommendation
    },
    {
      value: 'COMPOSITE',
      label: 'Composite Cladding',
      description: 'Low maintenance modern finish',
      image: '/images/composite cladding.jpg',
      recommended: false
    },
    {
      value: 'RENDER',
      label: 'Smooth Render',
      description: 'Contemporary rendered exterior',
      image: '/images/rendered cladding.jpg',
      recommended: false
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
        External Cladding
      </h2>
      <p className="text-sm text-gray-400 mb-6">
        Choose your preferred exterior cladding finish
      </p>
      
      <div className="space-y-4">
        {options.map((option, index) => (
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
              w-full rounded-lg border-2 overflow-hidden transition-all relative
              ${selected === option.value
                ? 'border-purple-600 bg-purple-900/30 shadow-lg shadow-purple-600/20'
                : 'border-gray-700 hover:border-gray-600 bg-gray-800/50'
              }
              focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900
            `}
          >
            {option.recommended && (
              <span className="absolute top-3 right-3 z-10 bg-green-600 text-white text-xs px-2 py-1 rounded">
                Recommended
              </span>
            )}
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
        ))}
      </div>
    </motion.div>
  );
}
