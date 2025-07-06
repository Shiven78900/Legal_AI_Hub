
import { User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Signed out successfully",
      });
      // Navigate to root page which should require sign in again
      navigate('/');
    }
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-amber-400/30">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-amber-100">
          LEGAL AI HUB
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="rounded-full hover:scale-105 transition-transform duration-200 bg-amber-600/20 border-amber-400 text-amber-100 hover:bg-amber-600/30">
              <User className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-black/90 backdrop-blur-md border-amber-400/30">
            <DropdownMenuLabel className="text-amber-200">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-amber-400/20" />
            <DropdownMenuItem 
              className="cursor-pointer hover:bg-amber-600/20 text-amber-100 focus:bg-amber-600/20 focus:text-amber-100"
              onClick={() => handleNavigation('/profile')}
            >
              Profile Settings
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="cursor-pointer hover:bg-amber-600/20 text-amber-100 focus:bg-amber-600/20 focus:text-amber-100"
              onClick={() => handleNavigation('/legal-dashboard')}
            >
              Legal Dashboard
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="cursor-pointer hover:bg-amber-600/20 text-amber-100 focus:bg-amber-600/20 focus:text-amber-100"
              onClick={() => handleNavigation('/ai-assistance')}
            >
              AI Preferences
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-amber-400/20" />
            <DropdownMenuItem 
              className="cursor-pointer hover:bg-red-500/20 text-amber-100 focus:bg-red-500/20 focus:text-amber-100"
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
