import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import UseCaseSelector from './components/UseCaseSelector';
import DimensionSliders from './components/DimensionSliders';
import AccessTypeSelector from './components/AccessTypeSelector';
import CladdingSelector from './components/CladdingSelector';
import DoorSelector from './components/DoorSelector';
import AcousticSelector from './components/AcousticSelector';
import ElectricalDistanceSlider from './components/ElectricalDistanceSlider';
import PriceSummaryPanel from './components/PriceSummaryPanel';
import LeadCaptureModal from './components/LeadCaptureModal';
import ImageGallery from './components/ImageGallery';
import FinalQuoteDisplay from './components/FinalQuoteDisplay';
import Reviews from './components/Reviews';
import { calculatePrice, calculateGeometry, PRICING } from './utils/pricing';
import { USE_CASE_DEFAULTS } from './utils/useCaseDefaults';
import { submitLeadToMailerLite } from './utils/mailerlite';
import { generatePDF } from './utils/pdfGenerator';

function App() {
  // Step 1: Use Case Selection
  const [useCase, setUseCase] = useState(null);
  
  // Step 2: Dimensions
  const [length, setLength] = useState(4.0);
  const [width, setWidth] = useState(3.0);
  
  // Step 3: Configuration
  const [accessType, setAccessType] = useState('THROUGH_HOUSE_GROUND');
  const [cladding, setCladding] = useState('THERMOWOOD');
  const [doors, setDoors] = useState('UPVC_FRENCH');
  const [acoustic, setAcoustic] = useState('STANDARD');
  const [electricalDistance, setElectricalDistance] = useState(15);
  
  // Additional config (simplified for now - can be expanded)
  const [windows, setWindows] = useState({ fixed: 1, opening: 0 });
  const [flooring, setFlooring] = useState('LAMINATE');
  const [heating, setHeating] = useState('PANEL');
  const [interior, setInterior] = useState('PLASTERED');
  const [sockets, setSockets] = useState(4);
  const [usbPorts, setUsbPorts] = useState(0);
  const [ethernet, setEthernet] = useState(0);
  const [consumerUnitUpgrade, setConsumerUnitUpgrade] = useState(false);
  const [foundation, setFoundation] = useState('GROUND_SCREWS');
  const [extras, setExtras] = useState({
    decking: false,
    ledLighting: false,
    smartLock: false,
    greenRoof: false,
    roofLantern: false
  });
  const [deckingSize, setDeckingSize] = useState(4);
  
  // UI state
  const [modalOpen, setModalOpen] = useState(false);
  const [quoteUnlocked, setQuoteUnlocked] = useState(false);
  const [leadData, setLeadData] = useState(null);
  
  // Apply smart defaults when use case is selected
  useEffect(() => {
    if (useCase && USE_CASE_DEFAULTS[useCase]) {
      const defaults = USE_CASE_DEFAULTS[useCase];
      setAcoustic(defaults.acoustic);
      setEthernet(defaults.ethernet);
      setSockets(defaults.sockets);
      setHeating(defaults.heating);
      setWindows(defaults.windows);
      setFlooring(defaults.flooring);
      setInterior(defaults.interior);
      setCladding(defaults.cladding);
    }
  }, [useCase]);
  
  // Calculate geometry
  const geometry = useMemo(() => {
    return calculateGeometry(length, width);
  }, [length, width]);
  
  // Calculate price with all new options
  const priceBreakdown = useMemo(() => {
    return calculatePrice({
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
    });
  }, [
    length, width, accessType, cladding, doors, windows, flooring,
    heating, acoustic, interior, sockets, usbPorts, ethernet,
    consumerUnitUpgrade, electricalDistance, foundation, extras, deckingSize
  ]);
  
  // Handle lead submission
  const handleLeadSubmit = async (formData) => {
    try {
      await submitLeadToMailerLite(formData, priceBreakdown);
      setLeadData(formData);
      setQuoteUnlocked(true);
      setModalOpen(false);
    } catch (error) {
      console.error('Failed to submit lead:', error);
      setLeadData(formData);
      setQuoteUnlocked(true);
      setModalOpen(false);
    }
  };
  
  const handleDownloadPDF = () => {
    if (leadData) {
      generatePDF(priceBreakdown, leadData);
    }
  };
  
  const handleBookVisit = () => {
    alert('Thank you for your interest! We will contact you shortly to arrange a site visit.');
  };
  
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Header />
      
      {/* Image Gallery - Below Header, Above Hero */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <ImageGallery />
      </div>
      
      <HeroSection />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Step 1: Use Case Selection */}
        {!useCase && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <UseCaseSelector
              selected={useCase}
              onChange={setUseCase}
            />
          </motion.div>
        )}
        
        {/* Step 2 & 3: Configuration */}
        {useCase && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Form Column */}
            <div className="lg:col-span-2 space-y-6">
              <DimensionSliders
                length={length}
                width={width}
                onLengthChange={setLength}
                onWidthChange={setWidth}
              />
              
              <AccessTypeSelector
                selected={accessType}
                onChange={setAccessType}
              />
              
              <CladdingSelector
                selected={cladding}
                onChange={setCladding}
                wallArea={geometry.wallArea}
                useCase={useCase}
              />
              
              <DoorSelector
                selected={doors}
                onChange={setDoors}
              />
              
              <AcousticSelector
                selected={acoustic}
                onChange={setAcoustic}
                totalSurfaceArea={geometry.totalSurfaceArea}
                useCase={useCase}
              />
              
              <ElectricalDistanceSlider
                distance={electricalDistance}
                onChange={setElectricalDistance}
              />
              
              {/* Final Quote Display */}
              {quoteUnlocked && leadData && (
                <FinalQuoteDisplay
                  breakdown={priceBreakdown}
                  leadData={leadData}
                />
              )}
            </div>
            
            {/* Price Summary Column */}
            <div className="lg:col-span-1">
              <PriceSummaryPanel
                breakdown={priceBreakdown}
                onRequestQuote={() => setModalOpen(true)}
                quoteUnlocked={quoteUnlocked}
                onDownloadPDF={handleDownloadPDF}
                onBookVisit={handleBookVisit}
              />
            </div>
          </div>
        )}
      </div>
      
      {/* Reviews Section */}
      <Reviews />
      
      {/* Lead Capture Modal */}
      <LeadCaptureModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleLeadSubmit}
        currentPrice={priceBreakdown.totalPrice}
      />
    </div>
  );
}

export default App;
