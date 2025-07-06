
import { useState } from "react";
import { Search, MapPin, Star, Clock, Filter, ArrowLeft, MessageCircle, Calendar, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";

const LawyerMarketplace = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const navigate = useNavigate();

  const lawyers = [
    {
      id: 1,
      name: "Adv. Priya Sharma",
      specialty: "Corporate Law",
      experience: "12 years",
      rating: 4.9,
      reviews: 156,
      hourlyRate: "₹200",
      location: "Mumbai, Maharashtra",
      languages: ["Hindi", "English", "Marathi"],
      availability: "Available Today",
      avatar: "/api/placeholder/100/100",
      verified: true,
      topRated: true,
      description: "Specializes in corporate compliance, mergers & acquisitions, and commercial contracts."
    },
    {
      id: 2,
      name: "Adv. Rajesh Kumar",
      specialty: "Criminal Law",
      experience: "8 years",
      rating: 4.7,
      reviews: 89,
      hourlyRate: "₹150",
      location: "Delhi, NCR",
      languages: ["Hindi", "English", "Punjabi"],
      availability: "Available Tomorrow",
      avatar: "/api/placeholder/100/100",
      verified: true,
      topRated: false,
      description: "Expert in criminal defense, white-collar crimes, and bail applications."
    },
    {
      id: 3,
      name: "Adv. Meera Patel",
      specialty: "Family Law",
      experience: "15 years",
      rating: 4.8,
      reviews: 203,
      hourlyRate: "₹180",
      location: "Ahmedabad, Gujarat",
      languages: ["Gujarati", "Hindi", "English"],
      availability: "Available Today",
      avatar: "/api/placeholder/100/100",
      verified: true,
      topRated: true,
      description: "Specializes in divorce, child custody, matrimonial disputes, and domestic violence cases."
    },
    {
      id: 4,
      name: "Adv. Amit Singh",
      specialty: "Property Law",
      experience: "10 years",
      rating: 4.6,
      reviews: 124,
      hourlyRate: "₹160",
      location: "Bangalore, Karnataka",
      languages: ["Hindi", "English", "Kannada"],
      availability: "Available Today",
      avatar: "/api/placeholder/100/100",
      verified: true,
      topRated: false,
      description: "Expert in property disputes, real estate transactions, and land acquisition matters."
    },
    {
      id: 5,
      name: "Adv. Kavya Reddy",
      specialty: "Employment Law",
      experience: "6 years",
      rating: 4.5,
      reviews: 67,
      hourlyRate: "₹140",
      location: "Hyderabad, Telangana",
      languages: ["Telugu", "Hindi", "English"],
      availability: "Available Tomorrow",
      avatar: "/api/placeholder/100/100",
      verified: true,
      topRated: false,
      description: "Focuses on employment disputes, labor law compliance, and workplace harassment cases."
    },
    {
      id: 6,
      name: "Adv. Suresh Menon",
      specialty: "Tax Law",
      experience: "20 years",
      rating: 4.9,
      reviews: 312,
      hourlyRate: "₹250",
      location: "Chennai, Tamil Nadu",
      languages: ["Tamil", "English", "Hindi"],
      availability: "Available Today",
      avatar: "/api/placeholder/100/100",
      verified: true,
      topRated: true,
      description: "Senior tax consultant specializing in GST, income tax, and international taxation."
    }
  ];

  const specialties = ["All", "Corporate Law", "Criminal Law", "Family Law", "Property Law", "Employment Law", "Tax Law"];

  const filteredLawyers = lawyers.filter(lawyer => {
    const matchesSearch = lawyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lawyer.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lawyer.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === "All" || lawyer.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  const handleBookConsultation = (lawyer: any) => {
    navigate('/payment', { 
      state: { 
        lawyer: lawyer,
        consultationType: 'legal-consultation'
      } 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-amber-900/20 to-black p-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-amber-100">Find a Lawyer</h1>
            <p className="text-amber-100/80 mt-2">Connect with verified legal professionals in your area</p>
          </div>
          <Button
            onClick={() => navigate('/legal-dashboard')}
            variant="outline"
            className="bg-amber-600/20 border-amber-400 text-amber-100 hover:bg-amber-600/30"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-400 h-4 w-4" />
            <Input
              placeholder="Search by name, specialty, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-black/40 border-amber-400/30 text-amber-100 placeholder:text-amber-100/50"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {specialties.map((specialty) => (
              <Button
                key={specialty}
                variant={specialty === selectedSpecialty ? "default" : "outline"}
                className={specialty === selectedSpecialty 
                  ? "bg-amber-600 hover:bg-amber-700 text-black" 
                  : "bg-amber-600/20 border-amber-400 text-amber-100 hover:bg-amber-600/30"
                }
                onClick={() => setSelectedSpecialty(specialty)}
              >
                {specialty}
              </Button>
            ))}
          </div>
        </div>

        {/* Lawyers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLawyers.map((lawyer) => (
            <Card key={lawyer.id} className="bg-black/60 backdrop-blur-md border-amber-400/30 text-amber-100 hover:scale-105 transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={lawyer.avatar} alt={lawyer.name} />
                      <AvatarFallback className="bg-amber-600 text-black">
                        {lawyer.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-amber-200">{lawyer.name}</h3>
                        {lawyer.verified && <Badge className="bg-green-600 text-white text-xs">Verified</Badge>}
                        {lawyer.topRated && <Badge className="bg-amber-600 text-black text-xs">Top Rated</Badge>}
                      </div>
                      <p className="text-amber-300 text-sm">{lawyer.specialty}</p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-amber-100/70 text-sm">{lawyer.description}</p>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Award className="h-4 w-4 text-amber-400" />
                    <span>{lawyer.experience} experience</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-amber-400" />
                    <span>{lawyer.location}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span>{lawyer.rating} ({lawyer.reviews} reviews)</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-amber-400" />
                    <span className="text-green-400">{lawyer.availability}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mt-2">
                    {lawyer.languages.map((lang) => (
                      <Badge key={lang} variant="outline" className="border-amber-400/30 text-amber-300 text-xs">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="border-t border-amber-400/20 pt-3 mt-3">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-amber-200 font-semibold text-lg">{lawyer.hourlyRate}/consultation</span>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        variant="outline"
                        size="sm"
                        className="flex-1 border-amber-400 text-amber-100 hover:bg-amber-600/20"
                      >
                        <MessageCircle className="h-3 w-3 mr-1" />
                        Message
                      </Button>
                      <Button 
                        size="sm"
                        className="flex-1 bg-amber-600 hover:bg-amber-700 text-black"
                        onClick={() => handleBookConsultation(lawyer)}
                      >
                        <Calendar className="h-3 w-3 mr-1" />
                        Book Now
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredLawyers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-amber-100/70 text-lg">No lawyers found matching your criteria.</p>
            <p className="text-amber-100/50 text-sm mt-2">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LawyerMarketplace;
