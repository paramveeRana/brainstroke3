import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { Brain, Heart, Activity, AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/App";
import { toast } from "sonner";

type HealthData = {
  age: number;
  gender: string;
  height: number;
  weight: number;
  hypertension: boolean;
  heart_disease: boolean;
  smoking_status: string;
};

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [riskScore, setRiskScore] = useState(0);
  const [riskLevel, setRiskLevel] = useState<"Low" | "Moderate" | "High">("Low");
  const [isLoading, setIsLoading] = useState(true);
  const healthData: HealthData = location.state?.healthData;

  useEffect(() => {
    if (!healthData) {
      navigate("/assessment", { replace: true });
      return;
    }

    const calculateAndStoreResults = async () => {
      try {
        setIsLoading(true);
        // Calculate BMI
        const bmi = healthData.weight / Math.pow(healthData.height / 100, 2);
        
        // Calculate base risk score (0-100)
        let score = 0;
        
        // Age factor (higher risk with age)
        score += Math.min(healthData.age / 1.5, 30);
        
        // BMI factor
        if (bmi > 30) score += 15;
        else if (bmi > 25) score += 10;
        
        // Medical conditions
        if (healthData.hypertension) score += 20;
        if (healthData.heart_disease) score += 20;
        
        // Smoking status
        if (healthData.smoking_status === "Advanced Smoker") score += 15;
        else if (healthData.smoking_status === "Casual Smoker") score += 10;
        
        // Gender factor (slightly higher risk for males)
        if (healthData.gender === "Male") score += 5;
        
        // Normalize score to 0-100
        score = Math.min(Math.max(score, 0), 100);
        
        const finalScore = Math.round(score);
        const riskLevel = score < 33 ? "Low" : score < 66 ? "Moderate" : "High";
        
        setRiskScore(finalScore);
        setRiskLevel(riskLevel);

        // Store results in Supabase
        if (user?.id) {
          const { error } = await supabase
            .from('risk_assessments')
            .insert({
              user_id: user.id,
              risk_score: finalScore,
              risk_level: riskLevel,
              bmi: parseFloat(bmi.toFixed(1)),
              recommendations: getRecommendations(),
              health_record_data: {
                age: healthData.age,
                gender: healthData.gender,
                height: healthData.height,
                weight: healthData.weight,
                hypertension: healthData.hypertension,
                heart_disease: healthData.heart_disease,
                smoking_status: healthData.smoking_status
              }
            });

          if (error) {
            console.error("Error storing risk assessment:", error);
            toast.error("Failed to save your assessment results");
          } else {
            // Replace the current URL state to prevent getting stuck
            window.history.replaceState({}, '', '/results');
          }
        }
      } catch (error: any) {
        console.error("Error storing risk assessment:", error);
        toast.error("Failed to save your assessment results");
      } finally {
        setIsLoading(false);
      }
    };

    calculateAndStoreResults();
  }, [healthData, navigate, user]);

  const getRecommendations = () => {
    const recommendations = [];
    
    if (healthData.smoking_status !== "Never Smoked") {
      recommendations.push("Consider smoking cessation programs and support");
    }
    
    if (healthData.hypertension) {
      recommendations.push("Regular blood pressure monitoring and medication adherence");
    }
    
    if (healthData.heart_disease) {
      recommendations.push("Follow your cardiac care plan and maintain regular check-ups");
    }
    
    const bmi = healthData.weight / Math.pow(healthData.height / 100, 2);
    if (bmi > 25) {
      recommendations.push("Work on weight management through diet and exercise");
    }
    
    recommendations.push("Regular exercise (at least 150 minutes per week)");
    recommendations.push("Maintain a balanced, heart-healthy diet");
    
    return recommendations;
  };

  if (!healthData || isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto py-8 px-4">
          <div className="flex justify-center items-center min-h-[60vh]">
            <p className="text-lg text-muted-foreground">Loading assessment results...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">Your Stroke Risk Assessment</h1>
            <p className="text-muted-foreground">
              Based on your health data, we've analyzed your risk factors and generated personalized recommendations.
            </p>
          </div>

          {/* Risk Score Card */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="flex flex-col items-center">
              <div 
                className={`text-5xl font-bold mb-4 ${
                  riskLevel === "Low" 
                    ? "text-green-500" 
                    : riskLevel === "Moderate" 
                    ? "text-yellow-500" 
                    : "text-red-500"
                }`}
              >
                {riskScore}%
              </div>
              <div className="text-xl font-semibold mb-2">
                {riskLevel} Risk Level
              </div>
              <p className="text-muted-foreground text-center max-w-md">
                This score is based on your provided health information and known risk factors for stroke.
              </p>
            </div>
          </div>

          {/* Risk Factors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-lg shadow p-6">
              <Heart className="w-8 h-8 text-red-500 mb-4" />
              <h3 className="font-semibold mb-2">Cardiovascular Health</h3>
              <p className="text-sm text-muted-foreground">
                {healthData.heart_disease ? "Heart disease present" : "No heart disease"} •{" "}
                {healthData.hypertension ? "Hypertension present" : "No hypertension"}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <Activity className="w-8 h-8 text-blue-500 mb-4" />
              <h3 className="font-semibold mb-2">Lifestyle Factors</h3>
              <p className="text-sm text-muted-foreground">
                BMI: {(healthData.weight / Math.pow(healthData.height / 100, 2)).toFixed(1)} •{" "}
                Smoking: {healthData.smoking_status}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <Brain className="w-8 h-8 text-purple-500 mb-4" />
              <h3 className="font-semibold mb-2">Demographics</h3>
              <p className="text-sm text-muted-foreground">
                Age: {healthData.age} • Gender: {healthData.gender}
              </p>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold">Recommendations</h2>
            </div>
            <ul className="space-y-4">
              {getRecommendations().map((recommendation, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                  <p className="text-muted-foreground">{recommendation}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 text-center space-y-4">
            <Button 
              onClick={() => navigate("/assessment")} 
              variant="outline"
              className="mx-2"
            >
              Return to Assessment
            </Button>
            <Button 
              onClick={() => navigate("/")} 
              variant="outline"
              className="mx-2"
            >
              Go to Home
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Results; 