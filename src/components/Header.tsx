import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/App";
import { useEffect } from "react";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success("Signed out successfully");
      navigate("/");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleNavigation = (path: string) => {
    console.log("Navigating to:", path);
    
    // If we're already on the assessment page and trying to go there again,
    // we should reset the form
    if (path === "/assessment" && location.pathname === "/assessment") {
      window.location.href = "/assessment";
      return;
    }

    // If we're on the results page, clear the state before navigating
    if (location.pathname === "/results") {
      window.history.replaceState({}, '', location.pathname);
    }

    // For About page, ensure we're using the correct path
    if (path === "/about") {
      navigate("/about", { replace: true });
      return;
    }

    navigate(path);
  };

  // Log current location
  useEffect(() => {
    console.log("Current location:", location.pathname);
  }, [location]);

  return (
    <header className="py-4 px-6 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <Button 
            variant="ghost" 
            onClick={() => handleNavigation("/")}
            className="text-2xl font-extrabold tracking-tight font-inter hover:no-underline hover:bg-transparent"
          >
            <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              Brain Stroke Prevention
            </span>
          </Button>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Button 
              variant="ghost" 
              onClick={() => handleNavigation("/assessment")}
              className="text-gray-600 hover:text-primary"
            >
              Take Assessment
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => handleNavigation("/about")}
              className="text-gray-600 hover:text-primary"
              data-testid="about-button"
            >
              About
            </Button>
            {user && (
              <>
                <Button 
                  variant="ghost" 
                  onClick={() => handleNavigation("/assessment-history")}
                  className="text-gray-600 hover:text-primary"
                >
                  Assessment History
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={() => handleNavigation("/health-resources")}
                  className="text-gray-600 hover:text-primary"
                >
                  Health Resources
                </Button>
              </>
            )}
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-sm text-gray-600">
                {user.email}
              </span>
              <Button 
                onClick={handleSignOut}
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10"
              >
                Sign Out
              </Button>
            </>
          ) : (
            <Button 
              onClick={() => handleNavigation("/auth")}
              className="bg-primary hover:bg-primary-dark text-white"
            >
              Sign In
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
