import strokeData from '@/data/strokeDataset';
import type { HealthData } from '@/types/strokeTypes';

const { riskFactors: RISK_FACTORS, recommendations: RECOMMENDATIONS } = strokeData;

export const calculateStrokeRisk = (healthData: HealthData) => {
  // Calculate BMI
  const bmi = healthData.weight / Math.pow(healthData.height / 100, 2);
  
  // Initialize risk calculation
  let totalRisk = 0;
  const activeRiskFactors: string[] = [];
  
  // Age factor
  if (healthData.age >= 65) {
    totalRisk += RISK_FACTORS.age['65plus'].risk;
    activeRiskFactors.push('age');
  } else if (healthData.age >= 55) {
    totalRisk += RISK_FACTORS.age['55-64'].risk;
    activeRiskFactors.push('age');
  } else if (healthData.age >= 45) {
    totalRisk += RISK_FACTORS.age['45-54'].risk;
  } else if (healthData.age >= 35) {
    totalRisk += RISK_FACTORS.age['35-44'].risk;
  } else {
    totalRisk += RISK_FACTORS.age.under35.risk;
  }
  
  // Gender factor
  if (healthData.gender.toLowerCase() === 'male') {
    totalRisk += RISK_FACTORS.gender.male.risk;
  } else {
    totalRisk += RISK_FACTORS.gender.female.risk;
  }
  
  // BMI factor
  if (bmi >= 30) {
    totalRisk += RISK_FACTORS.bmi.obese.risk;
    activeRiskFactors.push('bmi');
  } else if (bmi >= 25) {
    totalRisk += RISK_FACTORS.bmi.overweight.risk;
    activeRiskFactors.push('bmi');
  } else if (bmi < 18.5) {
    totalRisk += RISK_FACTORS.bmi.underweight.risk;
    activeRiskFactors.push('bmi');
  } else {
    totalRisk += RISK_FACTORS.bmi.normal.risk;
  }
  
  // Medical conditions
  if (healthData.hypertension) {
    totalRisk += RISK_FACTORS.conditions.hypertension.risk;
    activeRiskFactors.push('hypertension');
  }
  if (healthData.heart_disease) {
    totalRisk += RISK_FACTORS.conditions.heartDisease.risk;
    activeRiskFactors.push('heartDisease');
  }
  
  // Smoking status
  switch (healthData.smoking_status) {
    case "Advanced Smoker":
      totalRisk += RISK_FACTORS.smoking.advancedSmoker.risk;
      activeRiskFactors.push('smoking');
      break;
    case "Casual Smoker":
      totalRisk += RISK_FACTORS.smoking.casualSmoker.risk;
      activeRiskFactors.push('smoking');
      break;
    case "Never Smoked":
      totalRisk += RISK_FACTORS.smoking.neverSmoked.risk;
      break;
  }
  
  // Convert total risk to percentage (max risk is around 0.40 based on dataset)
  let riskPercentage = Math.min((totalRisk / 0.40) * 100, 100);
  
  // Determine risk level
  let riskLevel: "Low" | "Moderate" | "High";
  if (riskPercentage < 25) {
    riskLevel = "Low";
  } else if (riskPercentage < 50) {
    riskLevel = "Moderate";
  } else {
    riskLevel = "High";
  }

  // Start with general recommendations (max 2)
  const recommendations: string[] = [...RECOMMENDATIONS.general];

  // Add risk-level specific recommendations (max 2)
  recommendations.push(...RECOMMENDATIONS.byRiskLevel[riskLevel]);

  // Add most critical factor-specific recommendations (max 3)
  const criticalFactors = activeRiskFactors.sort((a, b) => {
    const getWeight = (factor: string) => {
      if (factor === 'heartDisease' || factor === 'hypertension') return 3;
      if (factor === 'smoking') return 2;
      return 1;
    };
    return getWeight(b) - getWeight(a);
  }).slice(0, 3);

  for (const factor of criticalFactors) {
    if (factor === 'smoking') {
      const smokingRecs = healthData.smoking_status === "Advanced Smoker" 
        ? RECOMMENDATIONS.byRiskFactor.smoking.advanced
        : RECOMMENDATIONS.byRiskFactor.smoking.casual;
      recommendations.push(smokingRecs[0]); // Only add the most important recommendation
    } else if (factor === 'hypertension') {
      recommendations.push(RECOMMENDATIONS.byRiskFactor.hypertension[0]);
    } else if (factor === 'heartDisease') {
      recommendations.push(RECOMMENDATIONS.byRiskFactor.heartDisease[0]);
    } else if (factor === 'bmi') {
      if (bmi >= 25) {
        recommendations.push(RECOMMENDATIONS.byRiskFactor.bmi.high[0]);
      } else if (bmi < 18.5) {
        recommendations.push(RECOMMENDATIONS.byRiskFactor.bmi.low[0]);
      }
    } else if (factor === 'age' && healthData.age >= 55) {
      recommendations.push(RECOMMENDATIONS.byRiskFactor.age.senior[0]);
    }
  }

  // Limit to maximum 7 unique recommendations
  const uniqueRecommendations = [...new Set(recommendations)].slice(0, 7);

  return {
    riskScore: Math.round(riskPercentage),
    riskLevel,
    bmi: parseFloat(bmi.toFixed(1)),
    recommendations: uniqueRecommendations
  };
}; 