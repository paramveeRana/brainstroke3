import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get the auth code from the URL
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');
        
        if (!code) {
          console.error("No auth code found in URL");
          navigate('/auth');
          return;
        }

        console.log("Got auth code, exchanging...");

        // Exchange the code
        const { data: { session }, error } = await supabase.auth.exchangeCodeForSession(code);

        if (error) {
          console.error("Session exchange error:", error);
          throw error;
        }

        if (!session?.user) {
          console.error("No user in session after exchange");
          throw new Error("Authentication failed");
        }

        console.log("Got session, checking profile...");

        // Check if profile exists
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select()
          .eq('id', session.user.id)
          .single();

        if (profileError && profileError.code !== 'PGRST116') {
          console.error("Profile fetch error:", profileError);
          throw profileError;
        }

        // Create profile if it doesn't exist
        if (!profile) {
          console.log("Creating new profile...");
          const { error: insertError } = await supabase
            .from('profiles')
            .insert([
              {
                id: session.user.id,
                username: session.user.email?.split('@')[0],
                email: session.user.email
              }
            ]);

          if (insertError) {
            console.error("Profile creation error:", insertError);
            throw insertError;
          }
        }

        console.log("Auth success, redirecting to landing page...");
        toast.success("Successfully signed in!");
        navigate('/');
      } catch (error: any) {
        console.error("Auth callback error:", error);
        toast.error(error.message || "Authentication failed");
        navigate('/auth');
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Signing you in...</h2>
        <p className="text-gray-600">Please wait while we complete the process.</p>
      </div>
    </div>
  );
}
