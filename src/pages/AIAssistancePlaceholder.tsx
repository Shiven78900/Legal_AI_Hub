
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, ArrowLeft, Brain } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import type { User as SupabaseUser } from '@supabase/supabase-js';

const AIAssistancePlaceholder = () => {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-amber-900/20 to-black">
      <Header />
      
      <div className="pt-20 p-6">
        <div className="container mx-auto max-w-4xl">
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
            <h1 className="text-4xl font-bold text-amber-100">AI Legal Assistant</h1>
          </div>

          <Card className="bg-black/60 backdrop-blur-md border-amber-400/30 text-amber-100">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-6 bg-amber-600/20 rounded-full w-fit">
                <Brain className="h-16 w-16 text-amber-400" />
              </div>
              <CardTitle className="text-3xl text-amber-200">AI Assistant Coming Soon</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <p className="text-amber-100/80 text-lg">
                Our AI-powered legal assistant will help you with:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div className="bg-amber-600/10 p-4 rounded-lg border border-amber-400/20">
                  <MessageCircle className="h-6 w-6 text-amber-400 mb-2" />
                  <h3 className="text-amber-200 font-semibold mb-2">Quick Legal Questions</h3>
                  <p className="text-amber-100/70 text-sm">Get instant answers to common legal queries</p>
                </div>
                
                <div className="bg-amber-600/10 p-4 rounded-lg border border-amber-400/20">
                  <Brain className="h-6 w-6 text-amber-400 mb-2" />
                  <h3 className="text-amber-200 font-semibold mb-2">Legal Research</h3>
                  <p className="text-amber-100/70 text-sm">AI-powered research and case analysis</p>
                </div>
              </div>

              <div className="pt-6">
                <p className="text-amber-100/60 mb-4">
                  This feature will be available after Supabase integration is complete.
                </p>
                <Button 
                  className="bg-amber-600 hover:bg-amber-700 text-black font-semibold"
                  onClick={() => navigate('/legal-dashboard')}
                >
                  Return to Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AIAssistancePlaceholder;
