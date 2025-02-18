export type RiskFactors = {
  age: {
    under35: { weight: number; risk: number };
    '35-44': { weight: number; risk: number };
    '45-54': { weight: number; risk: number };
    '55-64': { weight: number; risk: number };
    '65plus': { weight: number; risk: number };
  };
  gender: {
    male: { weight: number; risk: number };
    female: { weight: number; risk: number };
  };
  bmi: {
    underweight: { range: [number, number]; weight: number; risk: number };
    normal: { range: [number, number]; weight: number; risk: number };
    overweight: { range: [number, number]; weight: number; risk: number };
    obese: { range: [number, number]; weight: number; risk: number };
  };
  conditions: {
    hypertension: { weight: number; risk: number };
    heartDisease: { weight: number; risk: number };
  };
  smoking: {
    neverSmoked: { weight: number; risk: number };
    casualSmoker: { weight: number; risk: number };
    advancedSmoker: { weight: number; risk: number };
  };
};

export type Recommendations = {
  general: string[];
  byRiskFactor: {
    smoking: {
      casual: string[];
      advanced: string[];
    };
    hypertension: string[];
    heartDisease: string[];
    bmi: {
      high: string[];
      low: string[];
    };
    age: {
      senior: string[];
    };
  };
  byRiskLevel: {
    Low: string[];
    Moderate: string[];
    High: string[];
  };
};

export type HealthData = {
  age: number;
  gender: string;
  height: number;
  weight: number;
  hypertension: boolean;
  heart_disease: boolean;
  smoking_status: string;
}; 