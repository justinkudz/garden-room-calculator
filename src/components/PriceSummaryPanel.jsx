import { motion } from 'framer-motion';
import { Download, Calendar } from 'lucide-react';

export default function PriceSummaryPanel({ breakdown, onRequestQuote, quoteUnlocked, onDownloadPDF, onBookVisit }) {
  // Calculate tighter price range (±10% variance)
  const priceRange = {
    min: Math.round(breakdown.totalPrice * 0.90 / 1000) * 1000,
    max: Math.round(breakdown.totalPrice * 1.10 / 1000) * 1000,
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="lg:sticky lg:top-4 bg-gradient-to-br from-gray-900 to-black text-white p-4 md:p-6 rounded-xl shadow-2xl border border-gray-800 hover:border-purple-600/50 transition-colors"
    >
      <h3 className="text-xl font-bold mb-4 text-white">Your Estimate</h3>
      
      {/* Price Display - Only Range */}
      <div className="border-t border-gray-700 pt-4 mb-6">
        <div className="text-center">
          <motion.div 
            className="text-4xl md:text-5xl font-black text-purple-400 mb-2"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 0.3 }}
          >
            £{(priceRange.min / 1000).toFixed(0)}k - £{(priceRange.max / 1000).toFixed(0)}k
          </motion.div>
          <p className="text-xs text-gray-500 mt-2">
            inc. VAT • subject to site survey
          </p>
        </div>
      </div>
      
      {/* CTA Button */}
      {!quoteUnlocked && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onRequestQuote}
          className="w-full animated-gradient-button text-white font-bold py-3 px-6 rounded-lg transition-all"
        >
          Reserve Limited Time Discount →
        </motion.button>
      )}
      
      {quoteUnlocked && (
        <div className="flex flex-col gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onDownloadPDF}
            className="flex items-center justify-center gap-2 animated-gradient-button text-white font-semibold py-2 px-4 rounded-lg transition-all"
          >
            <Download className="w-4 h-4" />
            One of our specialists will contact you soon
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onBookVisit}
            className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            <Calendar className="w-4 h-4" />
            Book Site Visit
          </motion.button>
        </div>
      )}
    </motion.div>
  );
}
