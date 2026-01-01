// MailerLite API integration

export async function submitLeadToMailerLite(formData, quoteData) {
  const apiKey = import.meta.env.VITE_MAILERLITE_API_KEY;
  const groupId = import.meta.env.VITE_MAILERLITE_GROUP_ID;
  
  if (!apiKey) {
    console.warn('MailerLite API key not configured - skipping email submission');
    // Return a mock success for demo purposes
    return { id: 'demo', email: formData.email, status: 'active' };
  }
  
  // Format quote breakdown for notes
  const quoteNotes = `
Floor Area: ${quoteData.floorArea.toFixed(1)} m²
Base Price: £${quoteData.basePrice.toLocaleString()}
Access Cost: £${quoteData.accessCost.toLocaleString()}
Cladding Cost: £${quoteData.claddingCost.toLocaleString()}
Door Cost: £${quoteData.doorCost.toLocaleString()}
Acoustic Cost: £${quoteData.acousticCost.toLocaleString()}
Electrical Cost: £${quoteData.electricalCost.toLocaleString()}
Total Price: £${quoteData.totalPrice.toLocaleString()}
Price per m²: £${quoteData.pricePerM2.toLocaleString(undefined, {maximumFractionDigits: 0})}
  `.trim();
  
  const subscriberData = {
    email: formData.email,
    name: formData.firstName,
    fields: {
      phone: formData.phone,
      first_name: formData.firstName,
      floor_area: quoteData.floorArea.toFixed(1),
      total_price: quoteData.totalPrice,
      quote_notes: quoteNotes
    },
    status: 'active'
  };
  
  // Add to group if groupId is provided
  if (groupId) {
    subscriberData.groups = [groupId];
  }
  
  try {
    const response = await fetch('https://api.mailerlite.com/api/v2/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-MailerLite-ApiKey': apiKey
      },
      body: JSON.stringify(subscriberData)
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('MailerLite submission error:', error);
    throw error;
  }
}

