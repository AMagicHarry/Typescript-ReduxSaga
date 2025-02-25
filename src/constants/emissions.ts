export const EMISSION_FACTORS = {
  publicTransportMix: {
    value: 0.02,
    unit: 'kg CO₂/person km',
    description: 'Public transportation including buses and trains'
  },
  cyclingAndWorking: {
    value: 0,
    unit: 'kg CO₂/km',
    description: 'Cycling and walking activities'
  },
  passengerCar: {
    value: 0.193,
    unit: 'kg CO₂/km',
    description: 'Regular passenger vehicles'
  },
  gasolineCar: {
    value: 0.204,
    unit: 'kg CO₂/km',
    description: 'Gasoline-powered vehicles'
  },
  dieselCar: {
    value: 0.18,
    unit: 'kg CO₂/km',
    description: 'Diesel-powered vehicles'
  },
  hybridCar: {
    value: 0.137,
    unit: 'kg CO₂/km',
    description: 'Hybrid electric vehicles'
  },
  electricCar: {
    value: 0.069,
    unit: 'kg CO₂/km',
    description: 'Fully electric vehicles'
  },
  airplaneEurope: {
    value: 0.022,
    unit: 'kg CO₂/km',
    description: 'European air travel'
  }
};

export type TransportMode = keyof typeof EMISSION_FACTORS;

export function formatUnit(unit: string): string {
  return unit.replace('CO2', 'CO₂');
}

export function calculateEmissions(mode: TransportMode, distance: number): number {
  return Math.round(EMISSION_FACTORS[mode].value * distance * 1000) / 1000;
}

export const INITIAL_EMISSIONS_DATA = {
  2024: {
    Q1: {
      publicTransportMix: {
        value: 2111,
        status: "approved",
        lastModified: new Date(),
      },
      cyclingAndWorking: {
        value: 2000,
        status: "approved",
        lastModified: new Date(),
      },
      passengerCar: {
        value: 1000,
        status: "approved",
        lastModified: new Date(),
      },
      gasolineCar: {
        value: 650,
        status: "approved",
        lastModified: new Date(),
      },
      dieselCar: {
        value: 52,
        status: "approved",
        lastModified: new Date(),
      },
      hybridCar: {
        value: 45,
        status: "approved",
        lastModified: new Date(),
      },
      electricCar: {
        value: 122,
        status: "approved",
        lastModified: new Date(),
      },
      airplaneEurope: {
        value: 2000,
        status: "approved",
        lastModified: new Date(),
      },
    },
    Q2: {
      publicTransportMix: {
        value: 4000,
        status: "approved",
        lastModified: new Date(),
      },
      cyclingAndWorking: {
        value: 3500,
        status: "approved",
        lastModified: new Date(),
      },
      passengerCar: {
        value: 1500,
        status: "approved",
        lastModified: new Date(),
      },
      gasolineCar: {
        value: 500,
        status: "approved",
        lastModified: new Date(),
      },
      dieselCar: {
        value: 400,
        status: "approved",
        lastModified: new Date(),
      },
      hybridCar: {
        value: 200,
        status: "approved",
        lastModified: new Date(),
      },
      electricCar: {
        value: 535,
        status: "approved",
        lastModified: new Date(),
      },
      airplaneEurope: {
        value: 1500,
        status: "approved",
        lastModified: new Date(),
      },
    },
    Q3: {
      publicTransportMix: {
        value: 3500,
        status: "approved",
        lastModified: new Date(),
      },
      cyclingAndWorking: {
        value: 2500,
        status: "approved",
        lastModified: new Date(),
      },
      passengerCar: {
        value: 1899,
        status: "approved",
        lastModified: new Date(),
      },
      gasolineCar: {
        value: 600,
        status: "approved",
        lastModified: new Date(),
      },
      dieselCar: {
        value: 500,
        status: "approved",
        lastModified: new Date(),
      },
      hybridCar: {
        value: 650,
        status: "approved",
        lastModified: new Date(),
      },
      electricCar: {
        value: 555,
        status: "approved",
        lastModified: new Date(),
      },
      airplaneEurope: {
        value: 1700,
        status: "approved",
        lastModified: new Date(),
      },
    },
    Q4: {
      publicTransportMix: {
        value: 2500,
        status: "approved",
        lastModified: new Date(),
      },
      cyclingAndWorking: {
        value: 1000,
        status: "approved",
        lastModified: new Date(),
      },
      passengerCar: {
        value: 1556,
        status: "approved",
        lastModified: new Date(),
      },
      gasolineCar: {
        value: 670,
        status: "approved",
        lastModified: new Date(),
      },
      dieselCar: {
        value: 515,
        status: "approved",
        lastModified: new Date(),
      },
      hybridCar: {
        value: 789,
        status: "approved",
        lastModified: new Date(),
      },
      electricCar: {
        value: 650,
        status: "approved",
        lastModified: new Date(),
      },
      airplaneEurope: {
        value: 2100,
        status: "approved",
        lastModified: new Date(),
      },
    },
  },
}

export const TRANSPORT_METADATA = {
  publicTransportMix: {
    description: "Public transportation including buses and trains",
    details: "Average occupancy rate: 40%",
    category: "Medium (120g CO₂/km)",
  },
  cyclingAndWorking: {
    description: "Non-motorized transportation",
    details: "Zero direct emissions",
    category: "Low (0g CO₂/km)",
  },
  passengerCar: {
    description: "Standard passenger vehicles",
    details: "Average occupancy: 1.5 persons",
    category: "High (193g CO₂/km)",
  },
  gasolineCar: {
    description: "Gasoline-powered vehicles",
    details: "Standard fuel efficiency",
    category: "High (204g CO₂/km)",
  },
  dieselCar: {
    description: "Diesel-powered vehicles",
    details: "Standard fuel efficiency",
    category: "High (180g CO₂/km)",
  },
  hybridCar: {
    description: "Hybrid electric vehicles",
    details: "Combined power sources",
    category: "Medium (137g CO₂/km)",
  },
  electricCar: {
    description: "Fully electric vehicles",
    details: "Grid electricity powered",
    category: "Low (69g CO₂/km)",
  },
  airplaneEurope: {
    description: "European air travel",
    details: "Short to medium-haul flights",
    category: "Very High (220g CO₂/km)",
  },
};