import { motion } from 'framer-motion';
import { PRICING } from '../utils/pricing';

export default function ElectricalDistanceSlider({ distance, onChange }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-800 hover:border-purple-600/50 transition-colors"
    >
      <h2 className="text-2xl font-bold mb-2 text-white">
        Electrical Connection
      </h2>
      <p className="text-sm text-gray-400 mb-6">
        Distance from your main electrical supply to the garden room
      </p>
      
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-semibold text-gray-300">
            Distance
          </label>
          <span className="text-lg font-bold text-purple-400">
            {distance}m
          </span>
        </div>
        <input
          type="range"
          min={5}
          max={50}
          step={1}
          value={distance}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="slider"
          aria-label="Electrical distance in meters"
          aria-valuemin={5}
          aria-valuemax={50}
          aria-valuenow={distance}
          aria-valuetext={`${distance} meters`}
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>5m</span>
          <span>50m</span>
        </div>
      </div>
      
    </motion.div>
  );
}
