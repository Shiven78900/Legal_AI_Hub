
import { Scale, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import type { User as SupabaseUser } from '@supabase/supabase-js';

const UserTypeSelection = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
      
      if (!user) {
        navigate('/auth');
      }
    };

    getUser();
  }, [navigate]);

  const handleUserTypeSelection = async (userType: 'lawyer' | 'client') => {
    if (!user) return;

    try {
      // Update the user's metadata
      const { error: authError } = await supabase.auth.updateUser({
        data: {
          user_type: userType,
        }
      });

      if (authError) {
        toast({
          title: "Error",
          description: "Failed to update user type",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: `Profile updated as ${userType}`,
      });

      // Navigate to appropriate profile page for completing details
      if (userType === 'lawyer') {
        navigate('/profile/lawyer');
      } else {
        navigate('/profile/client');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-amber-900/20 to-black flex items-center justify-center">
        <div className="text-amber-100">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-amber-900/20 to-black p-6 flex items-center justify-center">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-amber-100 mb-4">Choose Your Profile Type</h1>
          <p className="text-amber-100/80 text-lg">Select the option that best describes you</p>
        </div>

        {/* Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Lawyer Profile */}
          <Card 
            className="bg-black/60 backdrop-blur-md border-amber-400/30 text-amber-100 hover:scale-105 transition-transform duration-300 cursor-pointer"
            onClick={() => handleUserTypeSelection('lawyer')}
          >
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-6 bg-amber-600/20 rounded-full w-fit">
                <Scale className="h-16 w-16 text-amber-400" />
              </div>
              <CardTitle className="text-3xl text-amber-200">I'm a Lawyer</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-amber-100/80 mb-6 text-lg">
                I provide legal services and want to manage my practice, connect with clients, and access professional tools.
              </p>
              <Button 
                className="bg-amber-600 hover:bg-amber-700 text-black w-full text-lg py-3"
                onClick={(e) => {
                  e.stopPropagation();
                  handleUserTypeSelection('lawyer');
                }}
              >
                Create Lawyer Profile
              </Button>
            </CardContent>
          </Card>

          {/* Client Profile */}
          <Card 
            className="bg-black/60 backdrop-blur-md border-amber-400/30 text-amber-100 hover:scale-105 transition-transform duration-300 cursor-pointer"
            onClick={() => handleUserTypeSelection('client')}
          >
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-6 bg-amber-600/20 rounded-full w-fit">
                <User className="h-16 w-16 text-amber-400" />
              </div>
              <CardTitle className="text-3xl text-amber-200">I Need Legal Help</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-amber-100/80 mb-6 text-lg">
                I'm seeking legal assistance, advice, or representation for personal or business matters.
              </p>
              <Button 
                className="bg-amber-600 hover:bg-amber-700 text-black w-full text-lg py-3"
                onClick={(e) => {
                  e.stopPropagation();
                  handleUserTypeSelection('client');
                }}
              >
                Create Client Profile
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Back Button */}
        <div className="text-center mt-8">
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            className="bg-white/10 backdrop-blur-md border-amber-400/30 text-amber-100 hover:bg-amber-500/20"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserTypeSelection;
