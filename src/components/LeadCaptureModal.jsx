import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { validateForm } from '../utils/validation';

export default function LeadCaptureModal({ isOpen, onClose, onSubmit, currentPrice }) {
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validation = validateForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    
    setIsSubmitting(true);
    setErrors({});
    
    try {
      await onSubmit(formData);
    } catch (error) {
      setErrors({ submit: 'Failed to submit. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  if (!isOpen) return null;

  const priceRange = Math.floor(currentPrice / 1000);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-gray-900 border border-gray-800 rounded-xl shadow-2xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-2xl font-bold text-white">
                  Reserve Your Limited Time Discount
                </h3>
                <p className="text-sm text-gray-400 mt-1">
                  Estimated: £{priceRange}k - £{priceRange + 2}k
                </p>
              </div>
              <button 
                onClick={onClose} 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              First Name *
            </label>
            <input
              type="text"
              required
              value={formData.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
              className={`w-full px-4 py-2 bg-gray-800 border rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                errors.firstName ? 'border-red-500' : 'border-gray-700'
              }`}
              placeholder="John"
            />
            {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className={`w-full px-4 py-2 bg-gray-800 border rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                errors.email ? 'border-red-500' : 'border-gray-700'
              }`}
              placeholder="john@example.com"
            />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Phone Number *
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className={`w-full px-4 py-2 bg-gray-800 border rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                errors.phone ? 'border-red-500' : 'border-gray-700'
              }`}
              placeholder="07XXX XXXXXX"
            />
            {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
          </div>
          
          {errors.submit && (
            <p className="text-red-400 text-sm text-center">{errors.submit}</p>
          )}
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting}
            className="w-full animated-gradient-button text-white font-bold py-3 px-6 rounded-lg transition-all disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting...' : 'Reserve Discount'}
          </motion.button>
          
          <p className="text-xs text-center text-gray-500">
            One of our specialists will contact you soon
          </p>
        </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

