import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/App";
import { toast } from "sonner";
import Header from "@/components/Header";
import { useNavigate } from "react-router-dom";
import { Heart, User2, Ruler, Scale, Activity, Cigarette, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Layout from "@/components/Layout";

const formSchema = z.object({
  age: z.number().min(0).max(150),
  gender: z.enum(["Male", "Female", "Other"]),
  height: z.number().min(0).max(300),
  weight: z.number().min(0).max(500),
  hypertension: z.enum(["Yes", "No"]),
  heart_disease: z.enum(["Yes", "No"]),
  smoking_status: z.enum(["Never Smoked", "Casual Smoker", "Advanced Smoker"]),
});

type HealthFormValues = z.infer<typeof formSchema>;

const Assessment: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(0);

  const form = useForm<HealthFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: undefined,
      gender: "Male",
      height: undefined,
      weight: undefined,
      hypertension: "No",
      heart_disease: "No",
      smoking_status: "Never Smoked",
    },
  });

  const handleNumberInput = (e: React.ChangeEvent<HTMLInputElement>, onChange: (value: number) => void) => {
    let value = e.target.value;
    
    if (value.length > 1 && value.startsWith('0')) {
      value = value.replace(/^0+/, '');
    }
    
    if (value === '') {
      onChange(undefined as any);
    } else {
      const num = parseInt(value, 10);
      if (!isNaN(num) && num >= 0) {
        onChange(num);
      }
    }
  };

  const onSubmit = async (data: HealthFormValues) => {
    if (!user?.id) {
      toast.error("User not authenticated");
      return;
    }

    try {
      console.log('Assessment - Current user:', {
        id: user.id,
        email: user.email,
        metadata: user.user_metadata
      });

      // First verify the profile exists
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      console.log('Assessment - Profile check:', {
        exists: !!profile,
        error: profileError?.message,
        profile: profile
      });

      if (profileError || !profile) {
        console.error('Profile verification failed:', profileError);
        // Try to create profile if it doesn't exist
        const { data: newProfile, error: createError } = await supabase
          .from('profiles')
          .insert({
            id: user.id,
            email: user.email,
            username: user.email?.split('@')[0] || 'user',
            full_name: user.user_metadata?.full_name || user.email?.split('@')[0],
            updated_at: new Date().toISOString()
          })
          .select()
          .single();

        console.log('Assessment - Profile creation attempt:', {
          success: !!newProfile,
          error: createError?.message,
          profile: newProfile
        });

        if (createError) {
          throw new Error('Could not create user profile');
        }
      }

      const healthRecord = {
        user_id: user.id,
        age: data.age,
        gender: data.gender,
        height: data.height,
        weight: data.weight,
        hypertension: data.hypertension === "Yes",
        heart_disease: data.heart_disease === "Yes",
        smoking_status: data.smoking_status
      };

      console.log('Assessment - Submitting health record:', healthRecord);

      const { data: savedRecord, error: healthRecordError } = await supabase
        .from('health_records')
        .insert(healthRecord)
        .select()
        .single();

      if (healthRecordError) {
        console.error('Health record insertion error:', healthRecordError);
        throw healthRecordError;
      }

      console.log('Assessment - Health record saved:', savedRecord);

      navigate("/results", { 
        state: { 
          healthData: {
            age: data.age,
            gender: data.gender,
            height: data.height,
            weight: data.weight,
            hypertension: data.hypertension === "Yes",
            heart_disease: data.heart_disease === "Yes",
            smoking_status: data.smoking_status
          }
        }
      });
    } catch (error: any) {
      console.error("Assessment submission error:", error);
      toast.error(error.message || "Failed to submit assessment");
    }
  };

  const sections = [
    {
      title: "Personal Information",
      description: "Basic details about yourself",
      icon: User2,
      fields: ["age", "gender"]
    },
    {
      title: "Physical Measurements",
      description: "Your height and weight measurements",
      icon: Ruler,
      fields: ["height", "weight"]
    },
    {
      title: "Medical History",
      description: "Information about your health conditions",
      icon: Heart,
      fields: ["hypertension", "heart_disease"]
    },
    {
      title: "Lifestyle",
      description: "Your smoking habits",
      icon: Cigarette,
      fields: ["smoking_status"]
    }
  ];

  const currentSectionFields = sections[currentSection].fields;
  const isLastSection = currentSection === sections.length - 1;

  const handleNext = () => {
    const fieldsToCheck = currentSectionFields as Array<keyof HealthFormValues>;
    const hasErrors = fieldsToCheck.some(field => form.formState.errors[field]);
    const hasEmptyFields = fieldsToCheck.some(field => {
      const value = form.getValues(field);
      if (typeof value === 'number') {
        return value === 0;
      }
      return !value;
    });

    if (!hasErrors && !hasEmptyFields) {
      if (isLastSection) {
        form.handleSubmit(onSubmit)();
      } else {
        setCurrentSection(prev => prev + 1);
      }
    } else {
      toast.error("Please fill in all fields correctly before proceeding");
    }
  };

  const handleBack = () => {
    setCurrentSection(prev => Math.max(0, prev - 1));
  };

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              Stroke Risk Assessment
            </h1>
            <p className="text-muted-foreground">
              Complete this assessment to understand your stroke risk factors and get personalized recommendations.
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex justify-between items-center">
              {sections.map((section, index) => (
                <div key={index} className="flex-1 relative">
                  <div className="flex flex-col items-center">
                    <div 
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center mb-2",
                        index <= currentSection ? "bg-primary text-white" : "bg-gray-200 text-gray-500"
                      )}
                    >
                      {React.createElement(section.icon, {
                        className: "w-5 h-5"
                      })}
                    </div>
                    <span className={cn(
                      "text-sm hidden md:block",
                      index <= currentSection ? "text-primary font-medium" : "text-gray-500"
                    )}>
                      {section.title}
                    </span>
                  </div>
                  {index < sections.length - 1 && (
                    <div 
                      className={cn(
                        "absolute top-5 left-1/2 w-full h-0.5",
                        index < currentSection ? "bg-primary" : "bg-gray-200"
                      )}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="backdrop-blur-sm bg-white/80 rounded-2xl shadow-xl border border-white/20 p-6 md:p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                {React.createElement(sections[currentSection].icon, {
                  className: "w-6 h-6 text-primary"
                })}
                {sections[currentSection].title}
              </h2>
              <p className="text-muted-foreground mt-1">
                {sections[currentSection].description}
              </p>
            </div>

            <Form {...form}>
              <form className="space-y-6">
                {currentSection === 0 && (
                  <>
                    <FormField
                      control={form.control}
                      name="age"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Age</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Enter your age"
                              onChange={(e) => handleNumberInput(e, field.onChange)}
                              value={field.value || ''}
                              className="bg-white placeholder:text-gray-400"
                              onFocus={(e) => {
                                if (e.target.value === '0') {
                                  e.target.value = '';
                                  field.onChange(undefined as any);
                                }
                              }}
                            />
                          </FormControl>
                          <FormDescription>
                            Your age is an important factor in assessing stroke risk
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Gender</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="w-full bg-white border-gray-200">
                                <SelectValue placeholder="Select your gender" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-white shadow-lg border-gray-200">
                              <SelectItem value="Male" className="hover:bg-gray-50">Male</SelectItem>
                              <SelectItem value="Female" className="hover:bg-gray-50">Female</SelectItem>
                              <SelectItem value="Other" className="hover:bg-gray-50">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Different genders may have different risk factors
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

                {currentSection === 1 && (
                  <>
                    <FormField
                      control={form.control}
                      name="height"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Height (cm)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Enter your height"
                              onChange={(e) => handleNumberInput(e, field.onChange)}
                              value={field.value || ''}
                              className="bg-white placeholder:text-gray-400"
                              onFocus={(e) => {
                                if (e.target.value === '0') {
                                  e.target.value = '';
                                  field.onChange(undefined as any);
                                }
                              }}
                            />
                          </FormControl>
                          <FormDescription>
                            Your height helps us calculate your BMI
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="weight"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Weight (kg)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Enter your weight"
                              onChange={(e) => handleNumberInput(e, field.onChange)}
                              value={field.value || ''}
                              className="bg-white placeholder:text-gray-400"
                              onFocus={(e) => {
                                if (e.target.value === '0') {
                                  e.target.value = '';
                                  field.onChange(undefined as any);
                                }
                              }}
                            />
                          </FormControl>
                          <FormDescription>
                            Your weight helps us calculate your BMI
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

                {currentSection === 2 && (
                  <>
                    <FormField
                      control={form.control}
                      name="hypertension"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Do you have hypertension?</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="w-full bg-white border-gray-200">
                                <SelectValue placeholder="Select yes or no" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-white shadow-lg border-gray-200">
                              <SelectItem value="Yes" className="hover:bg-gray-50">Yes</SelectItem>
                              <SelectItem value="No" className="hover:bg-gray-50">No</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            High blood pressure is a significant risk factor for stroke
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="heart_disease"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Do you have any heart disease?</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="w-full bg-white border-gray-200">
                                <SelectValue placeholder="Select yes or no" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-white shadow-lg border-gray-200">
                              <SelectItem value="Yes" className="hover:bg-gray-50">Yes</SelectItem>
                              <SelectItem value="No" className="hover:bg-gray-50">No</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Heart conditions can increase your stroke risk
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

                {currentSection === 3 && (
                  <FormField
                    control={form.control}
                    name="smoking_status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Smoking Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="w-full bg-white border-gray-200">
                              <SelectValue placeholder="Select your smoking status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-white shadow-lg border-gray-200">
                            <SelectItem value="Never Smoked" className="hover:bg-gray-50">Never Smoked</SelectItem>
                            <SelectItem value="Casual Smoker" className="hover:bg-gray-50">Casual Smoker</SelectItem>
                            <SelectItem value="Advanced Smoker" className="hover:bg-gray-50">Advanced Smoker</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Smoking significantly increases your risk of stroke
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <div className="flex justify-between pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleBack}
                    disabled={currentSection === 0}
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="bg-primary hover:bg-primary-dark text-white"
                  >
                    {isLastSection ? (
                      "Submit Assessment"
                    ) : (
                      <>
                        Next
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Assessment;
