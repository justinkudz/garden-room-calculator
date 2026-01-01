import { motion } from 'framer-motion';
import { PRICING } from '../utils/pricing';
import { USE_CASE_RECOMMENDATIONS } from '../utils/useCaseDefaults';

export default function AcousticSelector({ selected, onChange, totalSurfaceArea, useCase }) {
  const recommendations = USE_CASE_RECOMMENDATIONS[useCase] || {};
  const enhancedRecommended = recommendations.enhancedAcoustic;
  const studioRecommended = recommendations.studioAcoustic;
  
  const enhancedCost = totalSurfaceArea * PRICING.ACOUSTIC.ENHANCED;
  const studioCost = totalSurfaceArea * PRICING.ACOUSTIC.STUDIO_GRADE;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-800 hover:border-purple-600/50 transition-colors"
    >
      <h2 className="text-2xl font-bold mb-2 text-white">
        Acoustic Package
      </h2>
      <p className="text-sm text-gray-400 mb-6">
        Add professional acoustic treatment for music studios or home cinemas
      </p>
      
      <div className="space-y-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onChange('STANDARD')}
          className={`
            w-full p-4 rounded-lg border-2 text-left transition-all
            ${selected === 'STANDARD'
              ? 'border-purple-600 bg-purple-900/30 shadow-lg shadow-purple-600/20'
              : 'border-gray-700 hover:border-gray-600 bg-gray-800/50'
            }
            focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900
          `}
          aria-label="Standard insulation, included"
        >
          <div className="flex items-center justify-between">
            <div>
              <span className="font-semibold text-white">Standard Insulation</span>
              <p className="text-sm text-gray-400 mt-1">Great thermal, basic acoustic</p>
            </div>
          </div>
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onChange('ENHANCED')}
          className={`
            w-full p-4 rounded-lg border-2 text-left transition-all relative
            ${selected === 'ENHANCED'
              ? 'border-purple-600 bg-purple-900/30 shadow-lg shadow-purple-600/20'
              : 'border-gray-700 hover:border-gray-600 bg-gray-800/50'
            }
            focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900
          `}
          aria-label="Select Enhanced Acoustic package"
        >
          {enhancedRecommended && (
            <span className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
              {enhancedRecommended}
            </span>
          )}
          <div className="flex items-center justify-between">
            <div>
              <span className="font-semibold text-white">Enhanced Acoustic</span>
              <p className="text-sm text-gray-400 mt-1">
                Rockwool upgrade, acoustic plasterboard ({totalSurfaceArea.toFixed(1)} m²)
              </p>
            </div>
          </div>
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onChange('STUDIO_GRADE')}
          className={`
            w-full p-4 rounded-lg border-2 text-left transition-all relative
            ${selected === 'STUDIO_GRADE'
              ? 'border-purple-600 bg-purple-900/30 shadow-lg shadow-purple-600/20'
              : 'border-gray-700 hover:border-gray-600 bg-gray-800/50'
            }
            focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900
          `}
          aria-label="Select Studio Grade acoustic package"
        >
          {studioRecommended && (
            <span className="absolute top-2 right-2 bg-amber-600 text-white text-xs px-2 py-1 rounded">
              {studioRecommended}
            </span>
          )}
          <div className="flex items-center justify-between">
            <div>
              <span className="font-semibold text-white">Studio Grade</span>
              <p className="text-sm text-gray-400 mt-1">
                Resilient bars, double board, acoustic membrane ({totalSurfaceArea.toFixed(1)} m²)
              </p>
            </div>
          </div>
        </motion.button>
      </div>
    </motion.div>
  );
}
