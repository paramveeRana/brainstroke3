import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        console.log('Auth Callback - URL:', window.location.href);
        console.log('Auth Callback - Search params:', window.location.search);
        console.log('Auth Callback - Hash:', window.location.hash);
        
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const queryParams = new URLSearchParams(window.location.search);
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');
        const code = queryParams.get('code');

        console.log('Auth Callback - Parsed params:', {
          accessToken: accessToken ? 'present' : 'missing',
          refreshToken: refreshToken ? 'present' : 'missing',
          code: code ? 'present' : 'missing'
        });

        if (!code && !accessToken) {
          console.error("No auth code or tokens found in URL");
          navigate('/auth');
          return;
        }

        let session;

        if (code) {
          console.log("Got auth code, exchanging...");
          const { data, error } = await supabase.auth.exchangeCodeForSession(code);
          console.log('Code exchange result:', { 
            success: !!data?.session,
            error: error?.message
          });
          if (error) throw error;
          session = data.session;
        } else if (accessToken) {
          console.log("Got access token, setting session...");
          const { data, error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken || '',
          });
          console.log('Session set result:', {
            success: !!data?.session,
            error: error?.message
          });
          if (error) throw error;
          session = data.session;
        }

        if (!session?.user) {
          throw new Error("No user in session after authentication");
        }

        console.log('Session established successfully');

        // Check if profile exists
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select()
          .eq('id', session.user.id)
          .single();

        console.log('Profile check:', {
          exists: !!profile,
          error: profileError?.message
        });

        if (profileError && profileError.code !== 'PGRST116') {
          throw profileError;
        }

        // Create profile if it doesn't exist
        if (!profile) {
          console.log('Creating new profile...');
          const { error: insertError } = await supabase
            .from('profiles')
            .insert([{
              id: session.user.id,
              username: session.user.email?.split('@')[0],
              email: session.user.email,
              full_name: session.user.user_metadata?.full_name
            }]);

          if (insertError) throw insertError;
          console.log('Profile created successfully');
        }

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
