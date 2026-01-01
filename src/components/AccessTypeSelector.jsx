import { motion } from 'framer-motion';
import { CheckCircle2, AlertTriangle, Home, Building2 } from 'lucide-react';
import { PRICING } from '../utils/pricing';

export default function AccessTypeSelector({ selected, onChange }) {
  const options = [
    {
      value: 'STANDARD',
      label: 'Standard Side Access',
      description: 'Clear path alongside property',
      cost: PRICING.ACCESS_TYPES.STANDARD,
      icon: CheckCircle2,
    },
    {
      value: 'NARROW',
      label: 'Narrow Side Access',
      description: 'Passage under 1 metre wide',
      cost: PRICING.ACCESS_TYPES.NARROW,
      icon: AlertTriangle,
    },
    {
      value: 'THROUGH_HOUSE_GROUND',
      label: 'Through House (Ground Floor)',
      description: 'Materials carried through your home',
      cost: PRICING.ACCESS_TYPES.THROUGH_HOUSE_GROUND,
      icon: Home,
      highlight: true
    },
    {
      value: 'THROUGH_HOUSE_UPPER',
      label: 'Through House (Upper Floor)',
      description: 'Tenement or flat with internal stairs',
      cost: PRICING.ACCESS_TYPES.THROUGH_HOUSE_UPPER,
      icon: Building2,
      highlight: true
    }
  ];

  const showTenementBadge = selected === 'THROUGH_HOUSE_GROUND' || selected === 'THROUGH_HOUSE_UPPER';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-800 hover:border-purple-600/50 transition-colors"
    >
      <h2 className="text-2xl font-bold mb-2 text-white">
        Site Access
      </h2>
      <p className="text-sm text-gray-400 mb-6">
        How will we access your garden?
      </p>
      
      {showTenementBadge && (
        <div className="mb-4 p-3 bg-purple-900/30 border border-purple-600/50 rounded-lg">
          <p className="text-sm text-purple-300">
            <strong>Glasgow Tenement? We're specialists</strong> - We handle difficult access builds every day.
          </p>
        </div>
      )}
      
      <div className="space-y-3">
        {options.map((option, index) => {
          const Icon = option.icon;
          const isSelected = selected === option.value;
          
          return (
            <motion.button
              key={option.value}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              onClick={() => onChange(option.value)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`
                w-full p-4 rounded-lg border-2 text-left transition-all
                ${isSelected 
                  ? 'border-purple-600 bg-purple-900/30 shadow-lg shadow-purple-600/20' 
                  : 'border-gray-700 hover:border-gray-600 bg-gray-800/50'
                }
                ${option.highlight && !isSelected ? 'ring-2 ring-purple-500/30' : ''}
                focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900
              `}
              aria-label={`Select ${option.label}${option.cost > 0 ? `, adds £${option.cost.toLocaleString()} to total` : ''}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon 
                      className={`w-5 h-5 ${
                        isSelected ? 'text-purple-400' : 'text-gray-500'
                      }`} 
                    />
                    <span className={`font-semibold ${
                      isSelected ? 'text-white' : 'text-gray-300'
                    }`}>
                      {option.label}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 ml-7">{option.description}</p>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
      
      <p className="text-xs text-gray-500 mt-4 italic">
        *Not sure? We'll confirm at your free site survey
      </p>
    </motion.div>
  );
}
