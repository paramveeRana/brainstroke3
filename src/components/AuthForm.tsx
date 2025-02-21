import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { SocialAuthButton } from "@/components/ui/social-auth-button";
import { Separator } from "@/components/ui/separator";

export function AuthForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSocialLogin = async (provider: 'google' | 'facebook') => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'select_account',
          },
          skipBrowserRedirect: false,
        },
      });

      if (error) {
        console.error("OAuth error:", error);
        throw error;
      }
    } catch (error: any) {
      console.error("Social login error:", error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isSignUp) {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              username,
            },
          },
        });

        if (signUpError) throw signUpError;

        const { error: profileError } = await supabase
          .from('profiles')
          .insert([{ id: (await supabase.auth.getUser()).data.user?.id, username }]);

        if (profileError) throw profileError;

        toast.success("Account created successfully! Please sign in.");
        setIsSignUp(false);
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
        
        toast.success("Successfully signed in!");
        navigate("/");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent animate-fade-in">
          {isSignUp ? "Create an account" : "Welcome back"}
        </h1>
        <p className="text-sm text-muted-foreground animate-fade-up" style={{ animationDelay: "0.1s" }}>
          {isSignUp
            ? "Enter your details to create your account"
            : "Enter your credentials to sign in"}
        </p>
      </div>

      <div className="grid gap-4 animate-fade-up" style={{ animationDelay: "0.2s" }}>
        <SocialAuthButton
          icon={
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
          }
          provider="Google"
          onClick={() => handleSocialLogin('google')}
          disabled={isLoading}
          className="transition-all duration-300 hover:scale-[1.02] hover:shadow-md"
        />

        <SocialAuthButton
          icon={
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path
                d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                fill="#1877F2"
              />
            </svg>
          }
          provider="Facebook"
          onClick={() => handleSocialLogin('facebook')}
          disabled={isLoading}
          className="transition-all duration-300 hover:scale-[1.02] hover:shadow-md"
        />
      </div>

      <div className="relative animate-fade-up" style={{ animationDelay: "0.3s" }}>
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-4 animate-fade-up" style={{ animationDelay: "0.4s" }}>
        {isSignUp && (
          <div className="grid gap-2">
            <Label htmlFor="username" className="text-sm font-medium">Username</Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
              className="transition-all duration-300 hover:border-primary focus:border-primary"
            />
          </div>
        )}
        <div className="grid gap-2">
          <Label htmlFor="email" className="text-sm font-medium">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            className="transition-all duration-300 hover:border-primary focus:border-primary"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password" className="text-sm font-medium">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            className="transition-all duration-300 hover:border-primary focus:border-primary"
          />
        </div>
        <Button 
          type="submit" 
          disabled={isLoading}
          className="bg-primary hover:bg-primary-dark text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-md"
        >
          {isLoading ? "Loading..." : isSignUp ? "Create account" : "Sign in"}
        </Button>
      </form>

      <Button
        variant="link"
        className="px-0 font-normal text-primary hover:text-primary-dark transition-colors animate-fade-up"
        onClick={() => setIsSignUp(!isSignUp)}
        disabled={isLoading}
        style={{ animationDelay: "0.5s" }}
      >
        {isSignUp ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
      </Button>
    </div>
  );
}
