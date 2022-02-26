export interface InterfaceFootPrint  {
    categories: {
        consumption: { co2mg: number; percent: number }[];
        energy: { co2mg: number; percent: number }[];
        food: { co2mg: number; percent: number }[];
        public: { co2mg: number; percent: number }[];
        transport: { co2mg: number; percent: number }[];
      }[];
      totalCo2mg: number;
  }