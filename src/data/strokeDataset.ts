import type { RiskFactors, Recommendations } from '@/types/strokeTypes';

const riskFactors: RiskFactors = {
  age: {
    under35: { weight: 1, risk: 0.01 },
    '35-44': { weight: 2, risk: 0.02 },
    '45-54': { weight: 3, risk: 0.03 },
    '55-64': { weight: 4, risk: 0.05 },
    '65plus': { weight: 5, risk: 0.08 }
  },
  gender: {
    male: { weight: 2, risk: 0.03 },
    female: { weight: 1, risk: 0.02 }
  },
  bmi: {
    underweight: { range: [0, 18.5], weight: 2, risk: 0.02 },
    normal: { range: [18.5, 24.9], weight: 1, risk: 0.01 },
    overweight: { range: [25, 29.9], weight: 3, risk: 0.03 },
    obese: { range: [30, Infinity], weight: 4, risk: 0.05 }
  },
  conditions: {
    hypertension: { weight: 5, risk: 0.10 },
    heartDisease: { weight: 5, risk: 0.10 }
  },
  smoking: {
    neverSmoked: { weight: 1, risk: 0.01 },
    casualSmoker: { weight: 3, risk: 0.04 },
    advancedSmoker: { weight: 4, risk: 0.07 }
  }
};

const recommendations: Recommendations = {
  general: [
    "Schedule regular health check-ups to monitor your risk factors",
    "Maintain a balanced diet rich in fruits, vegetables, and whole grains"
  ],
  byRiskFactor: {
    smoking: {
      casual: [
        "Consider a smoking cessation program to reduce your stroke risk",
        "Set a quit date and gradually reduce smoking frequency"
      ],
      advanced: [
        "Seek professional help for smoking cessation immediately",
        "Join a support group for better chances of quitting successfully"
      ]
    },
    hypertension: [
      "Monitor your blood pressure daily",
      "Follow your prescribed medication regimen strictly",
      "Reduce sodium intake in your diet"
    ],
    heartDisease: [
      "Take your heart medications as prescribed",
      "Monitor your cholesterol levels regularly",
      "Follow a heart-healthy exercise routine"
    ],
    bmi: {
      high: [
        "Consult a nutritionist for a personalized diet plan",
        "Aim for 30 minutes of moderate exercise daily"
      ],
      low: [
        "Increase your caloric intake with nutrient-rich foods",
        "Consider strength training to build muscle mass"
      ]
    },
    age: {
      senior: [
        "Practice balance exercises to prevent falls",
        "Stay mentally active with brain-stimulating activities"
      ]
    }
  },
  byRiskLevel: {
    Low: [
      "Continue your healthy lifestyle habits",
      "Get annual health screenings"
    ],
    Moderate: [
      "Schedule a consultation with your healthcare provider",
      "Consider preventive medications if recommended"
    ],
    High: [
      "Seek immediate medical consultation",
      "Develop an emergency action plan with your doctor"
    ]
  }
};

const strokeData = {
  riskFactors,
  recommendations
};

export default strokeData; 