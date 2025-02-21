import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { Brain, Heart, Activity, AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/App";
import { toast } from "sonner";
import { calculateStrokeRisk } from "@/utils/analysis/strokeRiskAnalysis";

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
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [bmi, setBmi] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const healthData: HealthData = location.state?.healthData;

  useEffect(() => {
    if (!healthData) {
      navigate("/assessment", { replace: true });
      return;
    }

    const analyzeAndStoreResults = async () => {
      try {
        setIsLoading(true);
        
        // Calculate risk using the dataset
        const analysisResult = calculateStrokeRisk(healthData);
        
        setRiskScore(analysisResult.riskScore);
        setRiskLevel(analysisResult.riskLevel);
        setBmi(analysisResult.bmi);
        setRecommendations(analysisResult.recommendations);

        // Store results in Supabase
        if (user?.id) {
          console.log('Storing health record and risk assessment...');

          // First store the health record
          const { data: healthRecord, error: healthRecordError } = await supabase
            .from('health_records')
            .insert({
              user_id: user.id,
              age: healthData.age,
              gender: healthData.gender,
              height: healthData.height,
              weight: healthData.weight,
              hypertension: healthData.hypertension,
              heart_disease: healthData.heart_disease,
              smoking_status: healthData.smoking_status
            })
            .select()
            .single();

          if (healthRecordError) {
            console.error('Error storing health record:', healthRecordError);
            throw healthRecordError;
          }

          console.log('Health record stored:', healthRecord);

          // Then store the risk assessment
          const { error: riskAssessmentError } = await supabase
            .from('risk_assessments')
            .insert({
              user_id: user.id,
              health_record_id: healthRecord.id,
              risk_score: analysisResult.riskScore,
              risk_level: analysisResult.riskLevel,
              bmi: analysisResult.bmi,
              recommendations: analysisResult.recommendations
            });

          if (riskAssessmentError) {
            console.error('Error storing risk assessment:', riskAssessmentError);
            throw riskAssessmentError;
          }

          console.log('Risk assessment stored successfully');
          
          // Replace the current URL state to prevent getting stuck
          window.history.replaceState({}, '', '/results');
        }
      } catch (error: any) {
        console.error("Error analyzing risk assessment:", error);
        toast.error("Failed to save your assessment results");
      } finally {
        setIsLoading(false);
      }
    };

    analyzeAndStoreResults();
  }, [healthData, navigate, user]);

  if (!healthData || isLoading) {
    return (
      <Layout>
        <div className="container mx-auto py-8 px-4">
          <div className="flex justify-center items-center min-h-[60vh]">
            <p className="text-lg text-muted-foreground">Loading assessment results...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">Your Stroke Risk Assessment</h1>
            <p className="text-muted-foreground">
              Based on your health data and our comprehensive dataset analysis, we've evaluated your risk factors and generated personalized recommendations.
            </p>
          </div>

          {/* Risk Score Card */}
          <div className="backdrop-blur-sm bg-white/80 rounded-2xl shadow-xl border border-white/20 p-8 mb-8 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
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
                This score is calculated using real healthcare data and advanced analysis of multiple risk factors.
              </p>
            </div>
          </div>

          {/* Risk Factors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <div className="backdrop-blur-sm bg-white/80 rounded-2xl shadow-xl border border-white/20 p-6 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
              <Heart className="w-8 h-8 text-red-500 mb-4" />
              <h3 className="font-semibold mb-2">Cardiovascular Health</h3>
              <p className="text-sm text-muted-foreground">
                {healthData.heart_disease ? "Heart disease present" : "No heart disease"} •{" "}
                {healthData.hypertension ? "Hypertension present" : "No hypertension"}
              </p>
            </div>
            <div className="backdrop-blur-sm bg-white/80 rounded-2xl shadow-xl border border-white/20 p-6 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
              <Activity className="w-8 h-8 text-blue-500 mb-4" />
              <h3 className="font-semibold mb-2">Lifestyle Factors</h3>
              <p className="text-sm text-muted-foreground">
                BMI: {bmi.toFixed(1)} •{" "}
                Smoking: {healthData.smoking_status}
              </p>
            </div>
            <div className="backdrop-blur-sm bg-white/80 rounded-2xl shadow-xl border border-white/20 p-6 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
              <Brain className="w-8 h-8 text-purple-500 mb-4" />
              <h3 className="font-semibold mb-2">Demographics</h3>
              <p className="text-sm text-muted-foreground">
                Age: {healthData.age} • Gender: {healthData.gender}
              </p>
            </div>
          </div>

          {/* Recommendations */}
          <div className="backdrop-blur-sm bg-white/80 rounded-2xl shadow-xl border border-white/20 p-8 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold">Recommendations</h2>
            </div>
            <ul className="space-y-4">
              {recommendations.map((recommendation, index) => (
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
      </div>
    </Layout>
  );
};

export default Results; 