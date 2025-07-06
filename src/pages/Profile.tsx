
import { useState, useEffect } from "react";
import { User, Mail, Phone, MapPin, Calendar, Edit, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import Header from "@/components/Header";
import type { User as SupabaseUser } from '@supabase/supabase-js';

interface ProfileData {
  id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  location: string | null;
  bio: string | null;
  user_type: string | null;
  created_at: string;
}

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  const [editData, setEditData] = useState({
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

      // Fetch profile data from database
      const { data: profileData, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        toast({
          title: "Error",
          description: "Failed to load profile data",
          variant: "destructive",
        });
      } else {
        setProfile(profileData);
        setEditData({
          full_name: profileData.full_name || '',
          phone: profileData.phone || '',
          location: profileData.location || '',
          bio: profileData.bio || 'Legal professional specializing in various areas of law.',
        });
      }
      
      setLoading(false);
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
  }, [navigate, toast]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: editData.full_name,
          phone: editData.phone,
          location: editData.location,
          bio: editData.bio,
        })
        .eq('id', user.id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update profile",
          variant: "destructive",
        });
        return;
      }

      // Update local profile state
      if (profile) {
        setProfile({
          ...profile,
          full_name: editData.full_name,
          phone: editData.phone,
          location: editData.location,
          bio: editData.bio,
        });
      }

      setIsEditing(false);
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (profile) {
      setEditData({
        full_name: profile.full_name || '',
        phone: profile.phone || '',
        location: profile.location || '',
        bio: profile.bio || 'Legal professional specializing in various areas of law.',
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-amber-900/20 to-black flex items-center justify-center">
        <div className="text-amber-100">Loading...</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-amber-900/20 to-black flex items-center justify-center">
        <div className="text-amber-100">Profile not found</div>
      </div>
    );
  }

  const userInitials = profile.full_name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';
  const joinDate = new Date(profile.created_at).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long' 
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-amber-900/20 to-black">
      <Header />
      
      <div className="pt-20 p-6">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold text-amber-100">Profile Settings</h1>
            <Button
              onClick={() => navigate('/legal-dashboard')}
              variant="outline"
              className="bg-white/10 backdrop-blur-md border-amber-400/30 text-amber-100 hover:bg-amber-500/20"
            >
              Back to Dashboard
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <Card className="bg-black/60 backdrop-blur-md border-amber-400/30 text-amber-100">
                <CardContent className="p-6 text-center">
                  <Avatar className="w-32 h-32 mx-auto mb-4">
                    <AvatarImage src="" alt="Profile" />
                    <AvatarFallback className="bg-amber-600 text-black text-2xl">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-2xl font-bold text-amber-200 mb-2">{profile.full_name || 'User'}</h2>
                  <p className="text-amber-100/80 mb-4">{profile.bio || 'Legal professional'}</p>
                  <div className="flex items-center justify-center text-amber-100/70 mb-2">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>Joined {joinDate}</span>
                  </div>
                  <div className="inline-block px-3 py-1 bg-amber-600/20 rounded-full text-amber-200 text-sm capitalize">
                    {profile.user_type || 'user'}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Profile Details */}
            <div className="lg:col-span-2">
              <Card className="bg-black/60 backdrop-blur-md border-amber-400/30 text-amber-100">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-amber-200">Personal Information</CardTitle>
                  {!isEditing ? (
                    <Button
                      onClick={handleEdit}
                      variant="outline"
                      size="sm"
                      className="bg-white/10 backdrop-blur-md border-amber-400/30 text-amber-100 hover:bg-amber-500/20"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button
                        onClick={handleSave}
                        size="sm"
                        className="bg-amber-600 hover:bg-amber-700 text-black"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Save
                      </Button>
                      <Button
                        onClick={handleCancel}
                        variant="outline"
                        size="sm"
                        className="bg-white/10 backdrop-blur-md border-amber-400/30 text-amber-100 hover:bg-red-500/20"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  )}
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-amber-200 flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      Full Name
                    </Label>
                    {isEditing ? (
                      <Input
                        id="name"
                        value={editData.full_name}
                        onChange={(e) => handleInputChange('full_name', e.target.value)}
                        className="bg-white/10 border-amber-400/30 text-amber-100 placeholder:text-amber-100/50"
                      />
                    ) : (
                      <p className="text-amber-100 p-2 bg-white/5 rounded border border-amber-400/20">
                        {profile.full_name || 'Not provided'}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-amber-200 flex items-center">
                      <Mail className="w-4 h-4 mr-2" />
                      Email Address
                    </Label>
                    <p className="text-amber-100 p-2 bg-white/5 rounded border border-amber-400/20">
                      {profile.email || 'Not provided'}
                    </p>
                    <p className="text-amber-100/50 text-xs">Email cannot be changed</p>
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-amber-200 flex items-center">
                      <Phone className="w-4 h-4 mr-2" />
                      Phone Number
                    </Label>
                    {isEditing ? (
                      <Input
                        id="phone"
                        value={editData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="bg-white/10 border-amber-400/30 text-amber-100 placeholder:text-amber-100/50"
                        placeholder="Enter your phone number"
                      />
                    ) : (
                      <p className="text-amber-100 p-2 bg-white/5 rounded border border-amber-400/20">
                        {profile.phone || 'Not provided'}
                      </p>
                    )}
                  </div>

                  {/* Location */}
                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-amber-200 flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      Location
                    </Label>
                    {isEditing ? (
                      <Input
                        id="location"
                        value={editData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        className="bg-white/10 border-amber-400/30 text-amber-100 placeholder:text-amber-100/50"
                        placeholder="Enter your location"
                      />
                    ) : (
                      <p className="text-amber-100 p-2 bg-white/5 rounded border border-amber-400/20">
                        {profile.location || 'Not provided'}
                      </p>
                    )}
                  </div>

                  {/* Bio */}
                  <div className="space-y-2">
                    <Label htmlFor="bio" className="text-amber-200">
                      Professional Bio
                    </Label>
                    {isEditing ? (
                      <textarea
                        id="bio"
                        value={editData.bio}
                        onChange={(e) => handleInputChange('bio', e.target.value)}
                        rows={3}
                        className="w-full p-2 bg-white/10 border border-amber-400/30 text-amber-100 placeholder:text-amber-100/50 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                        placeholder="Tell us about yourself"
                      />
                    ) : (
                      <p className="text-amber-100 p-2 bg-white/5 rounded border border-amber-400/20">
                        {profile.bio || 'No bio provided'}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
