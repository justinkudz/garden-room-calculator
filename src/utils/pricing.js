// PRICING CONSTANTS (All prices include VAT)
export const PRICING = {
  BASE_RATE_PER_M2: 1750, // £/m² base cost
  
  ACCESS_TYPES: {
    STANDARD: 0,
    NARROW: 500,
    THROUGH_HOUSE_GROUND: 1200,
    THROUGH_HOUSE_UPPER: 2000
  },
  
  CLADDING: {
    THERMOWOOD: 0,
    CEDAR: 85, // £/m² of wall area
    COMPOSITE: 45,
    RENDER: 65
  },
  
  DOORS: {
    UPVC_FRENCH: 0,
    UPVC_SLIDER: 800,
    ALU_BIFOLD_3M: 2500,
    ALU_BIFOLD_4M: 3200,
    ALU_SLIDER: 2200
  },
  
  WINDOWS: {
    FIXED_INCLUDED: 1, // First one included
    FIXED_ADDITIONAL: 400, // Each additional
    OPENING: 550 // Each
  },
  
  FLOORING: {
    LAMINATE: 0,
    LVT: 35, // £/m²
    KARNDEAN: 55,
    ENGINEERED_OAK: 75,
    RUBBER: 40
  },
  
  HEATING: {
    PANEL: 0,
    INFRARED: 650,
    UNDERFLOOR: 80, // £/m²
    AIR_CONDITIONING: 1800
  },
  
  ACOUSTIC: {
    STANDARD: 0,
    ENHANCED: 45, // £/m² total surface
    STUDIO_GRADE: 95
  },
  
  INTERIOR: {
    PLASTERED: 0,
    EXPOSED_TIMBER: 0,
    PAINTED_TIMBER: 15 // £/m² wall area
  },
  
  ELECTRICAL: {
    SOCKETS_INCLUDED: 4,
    SOCKETS_ADDITIONAL: 65, // Each
    USB_CONVERSION: 30, // Per socket
    ETHERNET: 95, // Each
    CONSUMER_UNIT_UPGRADE: 180,
    CABLE_RATE_PER_M: 85
  },
  
  FOUNDATION: {
    GROUND_SCREWS: 0,
    CUSTOMER_BASE: -600, // Discount
    ADJUSTABLE_FRAME: 450,
    RAISED_DECK: 1200
  },
  
  EXTRAS: {
    DECKING: 120, // £/m²
    LED_LIGHTING: 280,
    SMART_LOCK: 320,
    GREEN_ROOF: 2400,
    ROOF_LANTERN: 1100
  },
  
  // Geometry
  DEFAULT_WALL_HEIGHT: 2.4, // meters
  WALL_AREA_FACTOR: 0.85, // Accounts for door/window openings
  SURFACE_AREA_MULTIPLIER: 2.5, // For total surface area calculation
  
  // Size constraints
  MIN_LENGTH: 2.5,
  MAX_LENGTH: 6,
  MIN_WIDTH: 2.5,
  MAX_WIDTH: 4,
  POPULAR_SIZES: [
    { label: 'Compact', length: 3, width: 2.5 },
    { label: 'Standard', length: 4, width: 3, popular: true },
    { label: 'Large', length: 5, width: 3.5 },
    { label: 'Extra Large', length: 6, width: 4 },
  ]
};

export function calculateGeometry(length, width) {
  const floorArea = length * width;
  const perimeter = (length + width) * 2;
  const wallArea = perimeter * PRICING.DEFAULT_WALL_HEIGHT * PRICING.WALL_AREA_FACTOR;
  const totalSurfaceArea = floorArea * PRICING.SURFACE_AREA_MULTIPLIER;
  
  return { floorArea, wallArea, totalSurfaceArea };
}

export function calculatePrice(inputs) {
  const {
    length,
    width,
    accessType,
    cladding,
    doors,
    windows,
    flooring,
    heating,
    acoustic,
    interior,
    sockets,
    usbPorts,
    ethernet,
    consumerUnitUpgrade,
    electricalDistance,
    foundation,
    extras,
    deckingSize
  } = inputs;
  
  // 1. GEOMETRY
  const { floorArea, wallArea, totalSurfaceArea } = calculateGeometry(length, width);
  
  // 2. BASE PRICE
  const basePrice = floorArea * PRICING.BASE_RATE_PER_M2;
  
  // 3. ACCESS SURCHARGE
  const accessCost = PRICING.ACCESS_TYPES[accessType] || 0;
  
  // 4. CLADDING UPGRADE
  const claddingCost = cladding !== 'THERMOWOOD' 
    ? wallArea * PRICING.CLADDING[cladding] 
    : 0;
  
  // 5. DOOR UPGRADE
  const doorCost = PRICING.DOORS[doors] || 0;
  
  // 6. WINDOWS
  let windowCost = 0;
  if (windows.fixed > 1) {
    windowCost += (windows.fixed - 1) * PRICING.WINDOWS.FIXED_ADDITIONAL;
  }
  windowCost += windows.opening * PRICING.WINDOWS.OPENING;
  
  // 7. FLOORING UPGRADE
  const flooringCost = flooring !== 'LAMINATE'
    ? floorArea * PRICING.FLOORING[flooring]
    : 0;
  
  // 8. HEATING
  let heatingCost = 0;
  if (heating === 'INFRARED') {
    heatingCost = PRICING.HEATING.INFRARED;
  } else if (heating === 'UNDERFLOOR') {
    heatingCost = floorArea * PRICING.HEATING.UNDERFLOOR;
  } else if (heating === 'AIR_CONDITIONING') {
    heatingCost = PRICING.HEATING.AIR_CONDITIONING;
  }
  
  // 9. ACOUSTIC UPGRADE
  let acousticCost = 0;
  if (acoustic === 'ENHANCED') {
    acousticCost = totalSurfaceArea * PRICING.ACOUSTIC.ENHANCED;
  } else if (acoustic === 'STUDIO_GRADE') {
    acousticCost = totalSurfaceArea * PRICING.ACOUSTIC.STUDIO_GRADE;
  }
  
  // 10. INTERIOR FINISH
  const interiorCost = interior === 'PAINTED_TIMBER'
    ? wallArea * PRICING.INTERIOR.PAINTED_TIMBER
    : 0;
  
  // 11. ELECTRICAL
  let electricalCost = 0;
  if (sockets > PRICING.ELECTRICAL.SOCKETS_INCLUDED) {
    electricalCost += (sockets - PRICING.ELECTRICAL.SOCKETS_INCLUDED) * PRICING.ELECTRICAL.SOCKETS_ADDITIONAL;
  }
  electricalCost += usbPorts * PRICING.ELECTRICAL.USB_CONVERSION;
  electricalCost += ethernet * PRICING.ELECTRICAL.ETHERNET;
  if (consumerUnitUpgrade) {
    electricalCost += PRICING.ELECTRICAL.CONSUMER_UNIT_UPGRADE;
  }
  electricalCost += electricalDistance * PRICING.ELECTRICAL.CABLE_RATE_PER_M;
  
  // 12. FOUNDATION
  const foundationCost = PRICING.FOUNDATION[foundation] || 0;
  
  // 13. EXTRAS
  let extrasCost = 0;
  if (extras.decking) {
    extrasCost += (deckingSize || 4) * PRICING.EXTRAS.DECKING;
  }
  if (extras.ledLighting) extrasCost += PRICING.EXTRAS.LED_LIGHTING;
  if (extras.smartLock) extrasCost += PRICING.EXTRAS.SMART_LOCK;
  if (extras.greenRoof) extrasCost += PRICING.EXTRAS.GREEN_ROOF;
  if (extras.roofLantern) extrasCost += PRICING.EXTRAS.ROOF_LANTERN;
  
  // 14. TOTAL
  const totalPrice = basePrice + accessCost + claddingCost + doorCost + windowCost + 
                     flooringCost + heatingCost + acousticCost + interiorCost + 
                     electricalCost + foundationCost + extrasCost;
  const pricePerM2 = totalPrice / floorArea;
  
  return {
    basePrice,
    accessCost,
    claddingCost,
    doorCost,
    windowCost,
    flooringCost,
    heatingCost,
    acousticCost,
    interiorCost,
    electricalCost,
    foundationCost,
    extrasCost,
    totalPrice,
    pricePerM2,
    floorArea,
    wallArea,
    totalSurfaceArea,
    electricalDistance
  };
}
