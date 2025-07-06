
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, MessageCircle, FileText, Users, User, Settings, Calendar, BarChart, HelpCircle } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import type { User as SupabaseUser } from '@supabase/supabase-js';

const LegalDashboard = () => {
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
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  const quickActions = [
    {
      title: "Quick Question",
      description: "Get instant legal advice from our AI assistant",
      icon: MessageCircle,
      color: "bg-blue-600",
      path: "/ai-assistance"
    },
    {
      title: "Contract Templates",
      description: "Generate professional legal documents easily",
      icon: FileText,
      color: "bg-green-600",
      path: "/contract-templates"
    },
    {
      title: "Find a Lawyer",
      description: "Connect with verified lawyers in your area",
      icon: Users,
      color: "bg-purple-600",
      path: "/lawyer-marketplace"
    },
    {
      title: "Update Profile",
      description: "Manage your profile information and settings",
      icon: User,
      color: "bg-amber-600",
      path: "/profile"
    }
  ];

  const recentActivity = [
    {
      id: 1,
      title: "Contract Generated",
      description: "Successfully generated a new NDA contract",
      date: "2 hours ago"
    },
    {
      id: 2,
      title: "Consultation Booked",
      description: "Booked a consultation with Sarah Johnson for tomorrow",
      date: "5 hours ago"
    },
    {
      id: 3,
      title: "Payment Received",
      description: "Received payment of $200 for legal consultation",
      date: "1 day ago"
    },
    {
      id: 4,
      title: "Document Uploaded",
      description: "Uploaded new documents for case #12345",
      date: "2 days ago"
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-amber-900/20 to-black flex items-center justify-center">
        <div className="text-amber-100">Loading...</div>
      </div>
    );
  }

  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';
  const userInitials = userName.split(' ').map((n: string) => n[0]).join('').toUpperCase();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-amber-900/20 to-black">
      <Header />
      
      <div className="pt-20 p-6">
        {/* Header */}
        <header className="container mx-auto max-w-7xl mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-amber-100">Legal Dashboard</h1>
              <p className="text-amber-100/80 mt-2">Welcome back, {userName}</p>
            </div>
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src="" alt={userName} />
                <AvatarFallback className="bg-amber-600 text-black">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
              <Button 
                variant="outline" 
                className="bg-amber-600/20 border-amber-400 text-amber-100 hover:bg-amber-600/30"
                onClick={() => navigate('/profile')}
              >
                Settings
                <Settings className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </header>

        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Quick Actions */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-black/60 backdrop-blur-md border-amber-400/30 text-amber-100">
                <CardHeader>
                  <CardTitle className="text-amber-200 flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {quickActions.map((action) => (
                      <Card key={action.title} className="bg-amber-600/10 border-amber-400/20 hover:bg-amber-600/20 transition-colors cursor-pointer">
                        <CardContent className="p-4" onClick={() => navigate(action.path)}>
                          <div className="flex items-center gap-3 mb-2">
                            <div className={`p-2 rounded-lg ${action.color}`}>
                              <action.icon className="h-4 w-4 text-white" />
                            </div>
                            <h3 className="font-semibold text-amber-200">{action.title}</h3>
                          </div>
                          <p className="text-amber-100/70 text-sm">{action.description}</p>
                          <Button 
                            className="w-full mt-3 bg-amber-600 hover:bg-amber-700 text-black font-semibold"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(action.path);
                            }}
                          >
                            {action.title === "Quick Question" ? "Ask Now" : 
                             action.title === "Preview Features" ? "Preview Now" : "Get Started"}
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="bg-black/60 backdrop-blur-md border-amber-400/30 text-amber-100">
                <CardHeader>
                  <CardTitle className="text-amber-200 flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px] w-full rounded-md">
                    <div className="space-y-4">
                      {recentActivity.map((activity) => (
                        <div key={activity.id} className="border-b border-amber-400/20 pb-4 last:border-none">
                          <h4 className="text-amber-200 font-medium">{activity.title}</h4>
                          <p className="text-amber-100/70 text-sm">{activity.description}</p>
                          <p className="text-amber-100/50 text-xs">{activity.date}</p>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div>
              <Card className="bg-black/60 backdrop-blur-md border-amber-400/30 text-amber-100">
                <CardHeader>
                  <CardTitle className="text-amber-200 flex items-center gap-2">
                    <BarChart className="h-5 w-5" />
                    Dashboard Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-amber-100/80">Consultations</span>
                    <span className="font-semibold text-amber-200">24</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-amber-100/80">Contracts Generated</span>
                    <span className="font-semibold text-amber-200">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-amber-100/80">Total Payments</span>
                    <span className="font-semibold text-amber-200">₹4,800</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-8 bg-black/60 backdrop-blur-md border-amber-400/30 text-amber-100">
                <CardHeader>
                  <CardTitle className="text-amber-200 flex items-center gap-2">
                    <HelpCircle className="h-5 w-5" />
                    Support
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-amber-100/70 text-sm">
                    Need assistance? Contact our support team for help.
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full bg-amber-600/20 border-amber-400 text-amber-100 hover:bg-amber-600/30"
                  >
                    Contact Support
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalDashboard;
