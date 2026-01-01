// Input validation functions

export function validateDimensions(length, width) {
  const errors = [];
  
  if (length < 2.5 || length > 6) {
    errors.push('Length must be between 2.5m and 6m');
  }
  
  if (width < 2.5 || width > 4) {
    errors.push('Width must be between 2.5m and 4m');
  }
  
  return errors;
}

export function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export function validatePhone(phone) {
  // Remove all spaces and dashes
  const cleaned = phone.replace(/[\s-]/g, '');
  // UK phone: +44 or 0 followed by 10 digits, or 11 digits starting with 0
  const re = /^(\+44|0)[1-9]\d{8,9}$/;
  return re.test(cleaned);
}

export function validatePostcode(postcode) {
  // UK postcode format: A9 9AA or A99 9AA or AA9 9AA or AA99 9AA
  const re = /^[A-Z]{1,2}\d{1,2}\s?\d[A-Z]{2}$/i;
  return re.test(postcode.trim());
}

export function validateForm(formData) {
  const errors = {};
  
  if (!formData.firstName || formData.firstName.trim().length < 2) {
    errors.firstName = 'First name must be at least 2 characters';
  }
  
  if (!formData.phone || !validatePhone(formData.phone)) {
    errors.phone = 'Please enter a valid UK phone number';
  }
  
  if (!formData.email || !validateEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

