import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

export default function FinalQuoteDisplay({ breakdown, leadData }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 border-2 border-purple-600/50 rounded-xl p-6 shadow-lg"
    >
      <div className="flex items-center gap-2 mb-4">
        <CheckCircle className="w-6 h-6 text-purple-400" />
        <h3 className="text-2xl font-bold text-white">
          Quote Generated Successfully!
        </h3>
      </div>
      
      <p className="text-gray-300 mb-6">
        Thank you, <span className="font-semibold text-white">{leadData?.firstName}</span>! 
        Your detailed quote has been sent to <span className="font-semibold text-white">{leadData?.email}</span>.
      </p>
      
      <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
        <h4 className="text-lg font-bold text-white mb-4">Your Quote Summary</h4>
        
        <div className="space-y-2 text-sm mb-4">
          <div className="flex justify-between">
            <span className="text-gray-400">Floor Area:</span>
            <span className="font-semibold text-white">{breakdown.floorArea.toFixed(1)} m²</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Base Build:</span>
            <span className="font-semibold text-white">£{breakdown.basePrice.toLocaleString()}</span>
          </div>
          {breakdown.accessCost > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-400">Access Premium:</span>
              <span className="font-semibold text-white">£{breakdown.accessCost.toLocaleString()}</span>
            </div>
          )}
          {breakdown.claddingCost > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-400">Cedar Cladding:</span>
              <span className="font-semibold text-white">£{breakdown.claddingCost.toLocaleString()}</span>
            </div>
          )}
          {breakdown.doorCost > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-400">Premium Doors:</span>
              <span className="font-semibold text-white">£{breakdown.doorCost.toLocaleString()}</span>
            </div>
          )}
          {breakdown.acousticCost > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-400">Acoustic Package:</span>
              <span className="font-semibold text-white">£{breakdown.acousticCost.toLocaleString()}</span>
            </div>
          )}
          {breakdown.electricalCost > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-400">Electrical ({breakdown.electricalDistance}m):</span>
              <span className="font-semibold text-white">£{breakdown.electricalCost.toLocaleString()}</span>
            </div>
          )}
        </div>
        
        <div className="border-t border-gray-700 pt-4 mt-4">
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold text-white">Total Price:</span>
            <span className="text-3xl font-bold text-purple-400">
              £{breakdown.totalPrice.toLocaleString()}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1 text-right">
            £{breakdown.pricePerM2.toLocaleString(undefined, {maximumFractionDigits: 0})} per m² | Includes VAT
          </p>
        </div>
      </div>
      
      <p className="text-sm text-gray-400 mt-4 text-center">
        A detailed PDF quote has been sent to your email address.
      </p>
    </motion.div>
  );
}
