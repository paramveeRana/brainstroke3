import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/App";
import { Brain, Calendar, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Database } from "@/integrations/supabase/types";

type Assessment = Database['public']['Tables']['risk_assessments']['Row'];

const AssessmentHistory = () => {
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('risk_assessments')
          .select()
          .eq('user_id', user?.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setAssessments(data || []);
      } catch (error: any) {
        console.error('Error fetching assessments:', error);
        toast.error('Failed to load assessment history');
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchAssessments();
    }
  }, [user]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getRiskLevelColor = (riskLevel: string) => {
    switch (riskLevel.toLowerCase()) {
      case 'low':
        return 'text-green-500';
      case 'moderate':
        return 'text-yellow-500';
      case 'high':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto py-8 px-4">
          <div className="flex justify-center items-center min-h-[60vh]">
            <p className="text-lg text-muted-foreground">Loading assessment history...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              Assessment History
            </h1>
            <Button 
              onClick={() => navigate('/assessment')}
              className="bg-primary hover:bg-primary-dark text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Take New Assessment
            </Button>
          </div>

          {assessments.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <Brain className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">No Assessments Yet</h2>
              <p className="text-muted-foreground mb-6">
                Take your first stroke risk assessment to start tracking your health journey.
              </p>
              <Button 
                onClick={() => navigate('/assessment')}
                className="bg-primary hover:bg-primary-dark text-white"
              >
                Start Assessment
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {assessments.map((assessment) => (
                <div key={assessment.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      <span className="text-sm text-muted-foreground">
                        {formatDate(assessment.created_at)}
                      </span>
                    </div>
                    <div className={`text-lg font-semibold ${getRiskLevelColor(assessment.risk_level)}`}>
                      {assessment.risk_score}% - {assessment.risk_level} Risk
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-2">Health Metrics</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>Age: {assessment.health_record_data.age}</li>
                        <li>Gender: {assessment.health_record_data.gender}</li>
                        <li>BMI: {assessment.bmi.toFixed(1)}</li>
                        <li>
                          Medical Conditions: {' '}
                          {[
                            assessment.health_record_data.hypertension && 'Hypertension',
                            assessment.health_record_data.heart_disease && 'Heart Disease'
                          ].filter(Boolean).join(', ') || 'None'}
                        </li>
                        <li>Smoking Status: {assessment.health_record_data.smoking_status}</li>
                      </ul>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="w-4 h-4 text-primary" />
                        <h3 className="font-semibold">Key Recommendations</h3>
                      </div>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        {assessment.recommendations.slice(0, 3).map((rec, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <Button
                      variant="outline"
                      onClick={() => navigate('/results', { 
                        state: { 
                          healthData: assessment.health_record_data,
                          fromHistory: true 
                        }
                      })}
                      className="text-primary hover:bg-primary/10"
                    >
                      View Full Report
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AssessmentHistory;
