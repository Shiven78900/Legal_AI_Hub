import { useState, useEffect } from "react";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check if user is logged in (simulated - replace with actual auth logic)
  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    setIsAuthenticated(authStatus === 'true');
  }, []);

  const handleLogin = () => {
    // Simulate login (replace with actual auth logic)
    localStorage.setItem('isAuthenticated', 'true');
    setIsAuthenticated(true);
    setShowLoginDialog(false);
    navigate('/legal-dashboard');
  };

  const handleProfileClick = () => {
    navigate('/user-type-selection');
  };

  const handleLegalDashboard = () => {
    if (isAuthenticated) {
      navigate('/legal-dashboard');
    } else {
      setShowLoginDialog(true);
    }
  };

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/legal-dashboard');
    } else {
      setShowLoginDialog(true);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
  };

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-amber-900/20 to-black">
        {/* Floating Profile Icon */}
        <div className="fixed top-6 right-6 z-50">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full hover:scale-105 transition-all duration-300 bg-white/10 backdrop-blur-md border-amber-400/30 text-amber-100 hover:bg-amber-500/20 hover:text-amber-50 shadow-lg hover:shadow-xl hover:shadow-amber-500/25"
              >
                <User className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-black/90 backdrop-blur-md border border-amber-400/30 shadow-lg text-amber-100">
              <DropdownMenuLabel className="text-amber-200">My Account</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-amber-400/20" />
              {isAuthenticated ? (
                <>
                  <DropdownMenuItem 
                    className="cursor-pointer hover:bg-amber-500/20 text-amber-100 hover:text-amber-50"
                    onClick={handleProfileClick}
                  >
                    Profile Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="cursor-pointer hover:bg-amber-500/20 text-amber-100 hover:text-amber-50"
                    onClick={handleLegalDashboard}
                  >
                    Legal Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer hover:bg-amber-500/20 text-amber-100 hover:text-amber-50">
                    AI Preferences
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-amber-400/20" />
                  <DropdownMenuItem 
                    className="cursor-pointer hover:bg-amber-500/20 text-amber-100 hover:text-amber-50"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem 
                  className="cursor-pointer hover:bg-amber-500/20 text-amber-100 hover:text-amber-50"
                  onClick={() => setShowLoginDialog(true)}
                >
                  Sign In
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Animated background elements with sophisticated black and gold tones */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-amber-600/40 to-yellow-500/40 rounded-full mix-blend-screen filter blur-3xl animate-pulse" />
          <div className="absolute top-40 right-20 w-80 h-80 bg-gradient-to-r from-amber-700/30 to-yellow-600/30 rounded-full mix-blend-screen filter blur-2xl animate-pulse animation-delay-2000" />
          <div className="absolute bottom-32 left-1/3 w-72 h-72 bg-gradient-to-r from-yellow-700/25 to-amber-500/25 rounded-full mix-blend-screen filter blur-xl animate-pulse animation-delay-4000" />
          <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-r from-amber-800/20 to-yellow-800/20 rounded-full mix-blend-screen filter blur-2xl animate-pulse animation-delay-1000" />
        </div>

        {/* Additional atmospheric gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />

        <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Quote and title */}
          <div 
            className="space-y-8 text-white animate-fade-in"
            style={{
              transform: `translateY(${scrollY * 0.1}px)`,
              transition: 'transform 0.1s ease-out'
            }}
          >
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent animate-pulse">
                  LEGAL AI
                </span>
                <br />
                <span className="text-amber-100">HUB</span>
              </h1>
              
              <blockquote className="text-xl lg:text-2xl italic text-amber-100/90 border-l-4 border-amber-500 pl-6 leading-relaxed">
                "Justice is the constant and perpetual will to give each man his due. 
                Now, with the power of AI, we make justice more accessible, 
                efficient, and equitable for all."
              </blockquote>
              
              <div className="text-lg text-amber-200/80 font-semibold">
                — Empowering Legal Excellence Through Innovation
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleGetStarted}
                className="px-8 py-4 bg-gradient-to-r from-amber-600 to-yellow-600 text-black font-semibold rounded-lg hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-amber-500/25"
              >
                Let's Get Started
              </button>
              <button className="px-8 py-4 border-2 border-amber-400 text-amber-100 font-semibold rounded-lg hover:bg-amber-500/20 hover:text-amber-50 transform transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>

          {/* Right side - Lady Justice Image */}
          <div 
            className="relative flex justify-center items-center animate-scale-in"
            style={{
              transform: `translateY(${scrollY * -0.05}px) scale(${1 + scrollY * 0.0001})`,
              transition: 'transform 0.1s ease-out'
            }}
          >
            <div className="relative">
              {/* Enhanced glowing effect with sophisticated gold tones */}
              <div className="absolute inset-0 bg-gradient-to-r from-black via-amber-600/40 to-amber-400/40 rounded-full blur-3xl opacity-50 animate-pulse scale-110" />
              <div className="absolute inset-0 bg-gradient-to-r from-amber-900/30 via-amber-500/30 to-yellow-500/30 rounded-full blur-2xl opacity-30 animate-pulse scale-125" />
              
              {/* Main image */}
              <img
                src="/lovable-uploads/4014cb48-080a-4348-b3e0-565c4e25d03e.png"
                alt="Lady Justice - Symbol of Legal Excellence"
                className="relative z-10 max-w-full h-auto max-h-[600px] object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500 filter brightness-110 contrast-110"
              />
              
              {/* Enhanced floating particles with elegant gold tones */}
              <div className="absolute top-10 left-10 w-2 h-2 bg-amber-400 rounded-full animate-pulse opacity-70" />
              <div className="absolute top-32 right-16 w-1 h-1 bg-yellow-300 rounded-full animate-pulse opacity-60 animation-delay-1000" />
              <div className="absolute bottom-20 left-20 w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse opacity-80 animation-delay-2000" />
              <div className="absolute top-20 right-10 w-1 h-1 bg-amber-300 rounded-full animate-pulse opacity-50 animation-delay-4000" />
              <div className="absolute bottom-32 right-24 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse opacity-70 animation-delay-3000" />
            </div>
          </div>
        </div>

        {/* Scroll indicator with elegant gold accent */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-amber-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-amber-400 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Login Dialog */}
      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent className="bg-black/90 backdrop-blur-md border border-amber-400/30 text-amber-100">
          <DialogHeader>
            <DialogTitle className="text-amber-200">Sign In Required</DialogTitle>
            <DialogDescription className="text-amber-100/80">
              Please sign in to access the Legal Dashboard and other features.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 mt-6">
            <Button 
              onClick={handleLogin}
              className="bg-amber-600 hover:bg-amber-700 text-black"
            >
              Sign In
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setShowLoginDialog(false)}
              className="border-amber-400/30 text-amber-100 hover:bg-amber-500/20"
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Hero;
