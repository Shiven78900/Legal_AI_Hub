
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import type { User as SupabaseUser } from '@supabase/supabase-js';

const ContractTemplatesPlaceholder = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);

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

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_OUT') {
          navigate('/');
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-amber-900/20 to-black flex items-center justify-center">
        <div className="text-amber-100">Loading...</div>
      </div>
    );
  }

  const contractTypes = [
    "Non-Disclosure Agreement (NDA)",
    "Service Agreement",
    "Employment Contract",
    "Rental Agreement",
    "Partnership Agreement",
    "Purchase Agreement"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-amber-900/20 to-black">
      <Header />
      
      <div className="pt-20 p-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center gap-4 mb-8">
            <Button
              onClick={() => navigate('/legal-dashboard')}
              variant="outline"
              size="sm"
              className="bg-white/10 backdrop-blur-md border-amber-400/30 text-amber-100 hover:bg-amber-500/20"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-4xl font-bold text-amber-100">Contract Templates</h1>
          </div>

          <Card className="bg-black/60 backdrop-blur-md border-amber-400/30 text-amber-100 mb-8">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-6 bg-amber-600/20 rounded-full w-fit">
                <FileText className="h-16 w-16 text-amber-400" />
              </div>
              <CardTitle className="text-3xl text-amber-200">Smart Contract Generation</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-amber-100/80 text-lg mb-6">
                Generate professional legal documents tailored to your specific needs.
              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contractTypes.map((contractType, index) => (
              <Card key={index} className="bg-black/60 backdrop-blur-md border-amber-400/30 text-amber-100 hover:bg-amber-600/10 transition-colors">
                <CardContent className="p-6">
                  <FileText className="h-8 w-8 text-amber-400 mb-4" />
                  <h3 className="text-amber-200 font-semibold mb-2">{contractType}</h3>
                  <p className="text-amber-100/70 text-sm mb-4">
                    Professional template ready for customization
                  </p>
                  <Button 
                    className="w-full bg-amber-600 hover:bg-amber-700 text-black font-semibold"
                    onClick={() => {
                      // Placeholder for contract generation
                    }}
                  >
                    Generate Contract
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-black/60 backdrop-blur-md border-amber-400/30 text-amber-100 mt-8">
            <CardContent className="p-6 text-center">
              <p className="text-amber-100/60 mb-4">
                Contract generation functionality will be available after Supabase integration.
              </p>
              <Button 
                className="bg-amber-600 hover:bg-amber-700 text-black font-semibold"
                onClick={() => navigate('/legal-dashboard')}
              >
                Return to Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContractTemplatesPlaceholder;
