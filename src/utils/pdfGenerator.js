import jsPDF from 'jspdf';

export function generatePDF(breakdown, leadData) {
  const doc = new jsPDF();
  
  // Title
  doc.setFontSize(20);
  doc.setTextColor(16, 185, 129); // emerald-500
  doc.text('Garden Room Quote', 20, 20);
  
  // Customer Info
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text(`Customer: ${leadData.firstName}`, 20, 35);
  doc.text(`Email: ${leadData.email}`, 20, 42);
  doc.text(`Phone: ${leadData.phone}`, 20, 49);
  
  // Quote Details
  let yPos = 75;
  doc.setFontSize(14);
  doc.text('Quote Breakdown', 20, yPos);
  yPos += 10;
  
  doc.setFontSize(10);
  doc.text(`Floor Area: ${breakdown.floorArea.toFixed(1)} m²`, 20, yPos);
  yPos += 8;
  doc.text(`Base Build: £${breakdown.basePrice.toLocaleString()}`, 20, yPos);
  yPos += 8;
  
  if (breakdown.accessCost > 0) {
    doc.text(`Access Premium: £${breakdown.accessCost.toLocaleString()}`, 20, yPos);
    yPos += 8;
  }
  
  if (breakdown.claddingCost > 0) {
    doc.text(`Cedar Cladding: £${breakdown.claddingCost.toLocaleString()}`, 20, yPos);
    yPos += 8;
  }
  
  if (breakdown.doorCost > 0) {
    doc.text(`Premium Doors: £${breakdown.doorCost.toLocaleString()}`, 20, yPos);
    yPos += 8;
  }
  
  if (breakdown.acousticCost > 0) {
    doc.text(`Acoustic Package: £${breakdown.acousticCost.toLocaleString()}`, 20, yPos);
    yPos += 8;
  }
  
  if (breakdown.electricalCost > 0) {
    doc.text(`Electrical (${breakdown.electricalDistance}m): £${breakdown.electricalCost.toLocaleString()}`, 20, yPos);
    yPos += 8;
  }
  
  // Total
  yPos += 5;
  doc.setDrawColor(16, 185, 129);
  doc.line(20, yPos, 190, yPos);
  yPos += 10;
  
  doc.setFontSize(16);
  doc.setFont(undefined, 'bold');
  doc.text(`Total Price: £${breakdown.totalPrice.toLocaleString()}`, 20, yPos);
  yPos += 8;
  
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  doc.text(`Price per m²: £${breakdown.pricePerM2.toLocaleString(undefined, {maximumFractionDigits: 0})}`, 20, yPos);
  yPos += 8;
  doc.text('All prices include VAT', 20, yPos);
  
  // Footer
  yPos = 280;
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.text('This is an estimate. Final pricing may vary based on site survey.', 20, yPos);
  
  // Save PDF
  const fileName = `Garden-Room-Quote-${leadData.firstName.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(fileName);
}

