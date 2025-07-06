
import { useState, useEffect } from "react";
import { User, Mail, Phone, MapPin, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import type { User as SupabaseUser } from '@supabase/supabase-js';

interface ProfileCompletionProps {
  userType: 'lawyer' | 'client';
}

const ProfileCompletion = ({ userType }: ProfileCompletionProps) => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const [profileData, setProfileData] = useState({
    full_name: "",
    phone: "",
    location: "",
    bio: "",
  });

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      
      if (!user) {
        navigate('/auth');
        return;
      }

      // Pre-populate with existing data
      setProfileData(prev => ({
        ...prev,
        full_name: user.user_metadata?.full_name || '',
      }));
    };

    getUser();
  }, [navigate]);

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!user || !profileData.full_name.trim()) {
      toast({
        title: "Error",
        description: "Please fill in at least your full name",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Create or update profile in database
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          email: user.email,
          full_name: profileData.full_name,
          phone: profileData.phone || null,
          location: profileData.location || null,
          bio: profileData.bio || `${userType === 'lawyer' ? 'Legal professional' : 'Client'} seeking ${userType === 'lawyer' ? 'to provide excellent legal services' : 'legal assistance'}`,
          user_type: userType,
          updated_at: new Date().toISOString(),
        });

      if (error) {
        console.error('Profile save error:', error);
        toast({
          title: "Error",
          description: "Failed to save profile",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Profile completed successfully!",
      });

      // Redirect to dashboard
      navigate('/legal-dashboard');
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const userTypeTitle = userType === 'lawyer' ? 'Lawyer' : 'Client';
  const userTypeDescription = userType === 'lawyer' 
    ? 'Complete your lawyer profile to start connecting with clients' 
    : 'Complete your profile to start finding legal assistance';

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-amber-900/20 to-black p-6 flex items-center justify-center">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-amber-100 mb-4">Complete Your {userTypeTitle} Profile</h1>
          <p className="text-amber-100/80 text-lg">{userTypeDescription}</p>
        </div>

        <Card className="bg-black/60 backdrop-blur-md border-amber-400/30 text-amber-100">
          <CardHeader>
            <CardTitle className="text-amber-200 text-center">Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-amber-200 flex items-center">
                <User className="w-4 h-4 mr-2" />
                Full Name *
              </Label>
              <Input
                id="name"
                value={profileData.full_name}
                onChange={(e) => handleInputChange('full_name', e.target.value)}
                className="bg-white/10 border-amber-400/30 text-amber-100 placeholder:text-amber-100/50"
                placeholder="Enter your full name"
                required
              />
            </div>

            {/* Email (Read-only) */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-amber-200 flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                Email Address
              </Label>
              <Input
                id="email"
                value={user?.email || ''}
                className="bg-white/5 border-amber-400/20 text-amber-100/70"
                readOnly
              />
              <p className="text-amber-100/50 text-xs">Email cannot be changed</p>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-amber-200 flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                Phone Number
              </Label>
              <Input
                id="phone"
                value={profileData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="bg-white/10 border-amber-400/30 text-amber-100 placeholder:text-amber-100/50"
                placeholder="Enter your phone number"
              />
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location" className="text-amber-200 flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                Location
              </Label>
              <Input
                id="location"
                value={profileData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="bg-white/10 border-amber-400/30 text-amber-100 placeholder:text-amber-100/50"
                placeholder="Enter your location (city, state)"
              />
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <Label htmlFor="bio" className="text-amber-200">
                Professional Bio
              </Label>
              <textarea
                id="bio"
                value={profileData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                rows={3}
                className="w-full p-3 bg-white/10 border border-amber-400/30 text-amber-100 placeholder:text-amber-100/50 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                placeholder={`Tell us about yourself as a ${userType}...`}
              />
            </div>

            <Button 
              onClick={handleSave}
              disabled={loading}
              className="w-full bg-amber-600 hover:bg-amber-700 text-black font-semibold text-lg py-3"
            >
              <Save className="w-5 h-5 mr-2" />
              {loading ? "Saving Profile..." : "Complete Profile & Continue"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileCompletion;
