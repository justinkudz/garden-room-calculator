// Smart defaults based on use case selection

export const USE_CASE_DEFAULTS = {
  'HOME_OFFICE': {
    acoustic: 'ENHANCED',
    ethernet: 1,
    sockets: 6,
    heating: 'INFRARED',
    windows: { fixed: 1, opening: 0 },
    flooring: 'LAMINATE',
    interior: 'PLASTERED',
    cladding: 'THERMOWOOD',
  },
  'MUSIC_STUDIO': {
    acoustic: 'STUDIO_GRADE',
    ethernet: 0,
    sockets: 8,
    heating: 'UNDERFLOOR',
    windows: { fixed: 1, opening: 0 },
    flooring: 'LVT',
    interior: 'PLASTERED',
    cladding: 'THERMOWOOD',
  },
  'GARDEN_GYM': {
    acoustic: 'STANDARD',
    ethernet: 0,
    sockets: 4,
    heating: 'AIR_CONDITIONING',
    windows: { fixed: 1, opening: 0 },
    flooring: 'RUBBER',
    interior: 'PLASTERED',
    cladding: 'THERMOWOOD',
  },
  'ART_STUDIO': {
    acoustic: 'STANDARD',
    ethernet: 0,
    sockets: 4,
    heating: 'PANEL',
    windows: { fixed: 2, opening: 1 },
    flooring: 'LVT',
    interior: 'PAINTED_TIMBER',
    cladding: 'THERMOWOOD',
  },
  'GARDEN_RETREAT': {
    acoustic: 'STANDARD',
    ethernet: 0,
    sockets: 4,
    heating: 'UNDERFLOOR',
    windows: { fixed: 1, opening: 0 },
    flooring: 'LAMINATE',
    interior: 'EXPOSED_TIMBER',
    cladding: 'CEDAR',
  },
  'MULTI_PURPOSE': {
    acoustic: 'STANDARD',
    ethernet: 0,
    sockets: 4,
    heating: 'PANEL',
    windows: { fixed: 1, opening: 0 },
    flooring: 'LAMINATE',
    interior: 'PLASTERED',
    cladding: 'THERMOWOOD',
  },
};

export const USE_CASE_RECOMMENDATIONS = {
  'HOME_OFFICE': {
    enhancedAcoustic: 'Recommended for video calls',
    infraredHeating: 'Popular choice',
    ethernet: 'Reliable connection for video calls',
  },
  'MUSIC_STUDIO': {
    studioAcoustic: 'Essential for music',
    lvtFlooring: 'Recommended',
  },
  'GARDEN_GYM': {
    rubberFlooring: 'Recommended',
    airConditioning: 'Recommended',
  },
  'ART_STUDIO': {
    windows: 'Maximise natural light',
    lvtFlooring: 'Recommended',
  },
  'GARDEN_RETREAT': {
    cedarCladding: 'Recommended',
  },
};

