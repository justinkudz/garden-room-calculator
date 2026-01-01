import { motion } from 'framer-motion';
import { PRICING } from '../utils/pricing';

export default function DimensionSliders({ length, width, onLengthChange, onWidthChange }) {
  const floorArea = (length * width).toFixed(1);
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-800 hover:border-purple-600/50 transition-colors"
    >
      <h2 className="text-2xl font-bold mb-2 text-white">
        Room Dimensions
      </h2>
      <p className="text-sm text-gray-400 mb-6">
        Adjust the sliders to set your desired room size
      </p>
      
      {/* Popular Size Shortcuts */}
      <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-3">
        {PRICING.POPULAR_SIZES.map((size) => (
          <motion.button
            key={size.label}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              onLengthChange(size.length);
              onWidthChange(size.width);
            }}
            className={`
              p-3 rounded-lg border-2 text-center transition-all
              ${length === size.length && width === size.width
                ? 'border-purple-600 bg-purple-900/30'
                : 'border-gray-700 hover:border-gray-600 bg-gray-800/50'
              }
            `}
          >
            <div className="text-sm font-semibold text-white">{size.label}</div>
            <div className="text-xs text-gray-400 mt-1">
              {size.length}m × {size.width}m
            </div>
            {size.popular && (
              <div className="text-xs text-purple-400 mt-1 font-semibold">Most Popular</div>
            )}
          </motion.button>
        ))}
      </div>
      
      {/* Length Slider */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-semibold text-gray-300">
            Length
          </label>
          <span className="text-lg font-bold text-purple-400">
            {length.toFixed(1)}m
          </span>
        </div>
        <input
          type="range"
          min={PRICING.MIN_LENGTH}
          max={PRICING.MAX_LENGTH}
          step={0.1}
          value={length}
          onChange={(e) => onLengthChange(parseFloat(e.target.value))}
          className="slider"
          aria-label="Room length in meters"
          aria-valuemin={PRICING.MIN_LENGTH}
          aria-valuemax={PRICING.MAX_LENGTH}
          aria-valuenow={length}
          aria-valuetext={`${length} meters`}
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>{PRICING.MIN_LENGTH}m</span>
          <span>{PRICING.MAX_LENGTH}m</span>
        </div>
      </div>
      
      {/* Width Slider */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-semibold text-gray-300">
            Width
          </label>
          <span className="text-lg font-bold text-purple-400">
            {width.toFixed(1)}m
          </span>
        </div>
        <input
          type="range"
          min={PRICING.MIN_WIDTH}
          max={PRICING.MAX_WIDTH}
          step={0.1}
          value={width}
          onChange={(e) => onWidthChange(parseFloat(e.target.value))}
          className="slider"
          aria-label="Room width in meters"
          aria-valuemin={PRICING.MIN_WIDTH}
          aria-valuemax={PRICING.MAX_WIDTH}
          aria-valuenow={width}
          aria-valuetext={`${width} meters`}
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>{PRICING.MIN_WIDTH}m</span>
          <span>{PRICING.MAX_WIDTH}m</span>
        </div>
      </div>
      
      {/* Floor Area Display */}
      <div className="mt-6 p-4 bg-gradient-to-r from-purple-900/30 to-purple-800/30 rounded-lg border border-purple-600/30">
        <p className="text-center">
          <span className="text-sm text-gray-400">Floor Area: </span>
          <span className="text-2xl font-bold text-purple-400">
            {floorArea} m²
          </span>
        </p>
      </div>
    </motion.div>
  );
}

