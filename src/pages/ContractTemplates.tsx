import { useState } from "react";
import { FileText, Download, Eye, Star, ArrowLeft, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const ContractTemplates = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const templates = [
    {
      id: 1,
      name: "Employment Contract",
      category: "Employment",
      description: "Comprehensive employment agreement template with standard terms and conditions.",
      rating: 4.8,
      downloads: 1250,
      premium: false,
      demoContent: `EMPLOYMENT AGREEMENT

This Employment Agreement is entered into between [Company Name] and [Employee Name].

1. POSITION AND DUTIES
Employee will serve as [Job Title] and will perform duties including:
- [Duty 1]
- [Duty 2]
- [Duty 3]

2. COMPENSATION
Base salary: ₹[Amount] per annum
Benefits: Health insurance, PF, gratuity

3. WORKING HOURS
Standard working hours: 9 AM to 6 PM, Monday to Friday

4. TERMINATION
Either party may terminate with 30 days written notice.

[Additional clauses continue...]`
    },
    {
      id: 2,
      name: "Non-Disclosure Agreement (NDA)",
      category: "Confidentiality",
      description: "Standard NDA template for protecting confidential information in business relationships.",
      rating: 4.9,
      downloads: 2100,
      premium: false,
      demoContent: `NON-DISCLOSURE AGREEMENT

This Agreement is between [Disclosing Party] and [Receiving Party].

1. CONFIDENTIAL INFORMATION
Confidential Information includes all technical data, trade secrets, know-how, research, product plans, products, services, customers, customer lists, markets, software, developments, inventions, processes, formulas, technology, designs, drawings, engineering, hardware configuration information, marketing, finances or other business information.

2. OBLIGATIONS
The Receiving Party agrees to:
- Hold all Confidential Information in strict confidence
- Not disclose any Confidential Information to third parties
- Use Confidential Information solely for evaluation purposes

3. TERM
This Agreement shall remain in effect for a period of [X] years.

[Additional clauses continue...]`
    },
    {
      id: 3,
      name: "Service Agreement",
      category: "Business",
      description: "Professional services agreement template for contractors and service providers.",
      rating: 4.7,
      downloads: 890,
      premium: false,
      demoContent: `SERVICE AGREEMENT

This Service Agreement is between [Service Provider] and [Client].

1. SERVICES
The Service Provider agrees to provide the following services:
- [Service 1]
- [Service 2]
- [Service 3]

2. PAYMENT TERMS
Total fee: ₹[Amount]
Payment schedule: [Monthly/Milestone-based]
Payment method: Bank transfer/Cheque

3. TIMELINE
Project start date: [Date]
Expected completion: [Date]

4. INTELLECTUAL PROPERTY
All work products shall belong to the Client upon full payment.

[Additional clauses continue...]`
    },
    {
      id: 4,
      name: "Lease Agreement",
      category: "Real Estate",
      description: "Residential and commercial lease agreement templates with customizable terms.",
      rating: 4.6,
      downloads: 1560,
      premium: true,
      demoContent: `LEASE AGREEMENT

This Lease Agreement is between [Landlord] and [Tenant].

1. PROPERTY
Address: [Property Address]
Type: [Residential/Commercial]
Area: [Square feet/meters]

2. LEASE TERM
Start Date: [Date]
End Date: [Date]
Monthly Rent: ₹[Amount]

3. SECURITY DEPOSIT
Amount: ₹[Amount] (equivalent to [X] months rent)

4. UTILITIES
Tenant responsible for: Electricity, Water, Internet
Landlord responsible for: Maintenance, Property Tax

5. RESTRICTIONS
- No pets allowed
- No subletting without written consent
- No smoking inside premises

[Additional clauses continue...]`
    },
    {
      id: 5,
      name: "Partnership Agreement",
      category: "Business",
      description: "Business partnership agreement template with profit sharing and responsibility clauses.",
      rating: 4.8,
      downloads: 670,
      premium: true,
      demoContent: `PARTNERSHIP AGREEMENT

This Partnership Agreement is between [Partner 1] and [Partner 2].

1. BUSINESS PURPOSE
The partners agree to carry on business as [Business Type] under the name [Business Name].

2. CAPITAL CONTRIBUTION
Partner 1: ₹[Amount] ([Percentage]%)
Partner 2: ₹[Amount] ([Percentage]%)

3. PROFIT AND LOSS SHARING
Profits and losses shall be shared equally between partners.

4. MANAGEMENT
Both partners shall have equal management rights and responsibilities.

5. DECISION MAKING
Major decisions require unanimous consent of all partners.

[Additional clauses continue...]`
    },
    {
      id: 6,
      name: "Purchase Agreement",
      category: "Sales",
      description: "Standard purchase agreement for goods and services with warranty provisions.",
      rating: 4.5,
      downloads: 1200,
      premium: false,
      demoContent: `PURCHASE AGREEMENT

This Agreement is between [Buyer] and [Seller].

1. GOODS/SERVICES
Description: [Detailed description]
Quantity: [Number]
Unit Price: ₹[Amount]
Total Amount: ₹[Total]

2. DELIVERY
Delivery Date: [Date]
Delivery Location: [Address]
Shipping Terms: [FOB/CIF/etc.]

3. PAYMENT TERMS
Payment Method: [Cash/Cheque/Bank Transfer]
Payment Due: [Net 30/Upon delivery/etc.]

4. WARRANTY
Seller warrants goods are free from defects for [X] months.

[Additional clauses continue...]`
    },
    {
      id: 7,
      name: "Freelance Contract",
      category: "Employment",
      description: "Independent contractor agreement template with project scope and payment terms.",
      rating: 4.7,
      downloads: 950,
      premium: false,
      demoContent: `FREELANCE CONTRACT

This Contract is between [Client] and [Freelancer].

1. PROJECT SCOPE
The Freelancer agrees to provide:
- [Deliverable 1]
- [Deliverable 2]
- [Deliverable 3]

2. TIMELINE
Project Start: [Date]
Milestones: [List key dates]
Final Delivery: [Date]

3. COMPENSATION
Total Fee: ₹[Amount]
Payment Schedule:
- [%]% upon signing
- [%]% at milestone
- [%]% upon completion

4. INTELLECTUAL PROPERTY
Work product belongs to Client upon full payment.

[Additional clauses continue...]`
    },
    {
      id: 8,
      name: "Software License Agreement",
      category: "Technology",
      description: "Software licensing agreement template with usage rights and restrictions.",
      rating: 4.9,
      downloads: 780,
      premium: true,
      demoContent: `SOFTWARE LICENSE AGREEMENT

This Agreement is between [Licensor] and [Licensee].

1. GRANT OF LICENSE
Licensor grants Licensee a non-exclusive, non-transferable license to use [Software Name].

2. PERMITTED USES
- Install on [X] computers
- Use for internal business purposes
- Make backup copies

3. RESTRICTIONS
- No reverse engineering
- No redistribution
- No modification of source code

4. SUPPORT AND MAINTENANCE
Licensor will provide support for [X] years including:
- Bug fixes
- Minor updates
- Technical support

[Additional clauses continue...]`
    }
  ];

  const categories = ["All", "Employment", "Business", "Real Estate", "Technology", "Sales", "Confidentiality"];

  const filteredTemplates = templates.filter(template => {
    return selectedCategory === "All" || template.category === selectedCategory;
  });

  const handleGenerateTemplate = () => {
    toast({
      title: "Template Generation",
      description: "AI-powered template generation will be available soon! This feature will create customized contracts based on your specific needs.",
    });
  };

  const handleDownloadTemplate = (template: any) => {
    // Create a blob with the template content
    const blob = new Blob([template.demoContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = `${template.name.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    
    toast({
      title: "Download Started",
      description: `${template.name} has been downloaded successfully!`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-amber-900/20 to-black p-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-amber-100">Contract Templates</h1>
            <p className="text-amber-100/80 mt-2">Choose from our extensive library of legal contract templates</p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={handleGenerateTemplate}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Wand2 className="h-4 w-4 mr-2" />
              AI Generate Template
            </Button>
            <Button
              onClick={() => navigate('/legal-dashboard')}
              variant="outline"
              className="bg-amber-600/20 border-amber-400 text-amber-100 hover:bg-amber-600/30"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={category === selectedCategory ? "default" : "outline"}
              className={category === selectedCategory 
                ? "bg-amber-600 hover:bg-amber-700 text-black" 
                : "bg-amber-600/20 border-amber-400 text-amber-100 hover:bg-amber-600/30"
              }
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="bg-black/60 backdrop-blur-md border-amber-400/30 text-amber-100 hover:scale-105 transition-all duration-300 group">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-amber-400" />
                    {template.premium && (
                      <Badge className="bg-amber-600 text-black text-xs">Premium</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-xs text-amber-100/80">{template.rating}</span>
                  </div>
                </div>
                <CardTitle className="text-lg text-amber-200 group-hover:text-amber-100 transition-colors">
                  {template.name}
                </CardTitle>
                <Badge variant="outline" className="w-fit border-amber-400/30 text-amber-300 text-xs">
                  {template.category}
                </Badge>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-amber-100/70 text-sm mb-4 line-clamp-3">
                  {template.description}
                </p>
                
                <div className="flex items-center justify-between text-xs text-amber-100/60 mb-4">
                  <span>{template.downloads} downloads</span>
                </div>

                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="flex-1 border-amber-400 text-amber-100 hover:bg-amber-600/20"
                        onClick={() => setSelectedTemplate(template)}
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        Preview
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-black/90 backdrop-blur-md border-amber-400/30 text-amber-100 max-w-4xl max-h-[80vh]">
                      <DialogHeader>
                        <DialogTitle className="text-amber-200">{template.name} - Preview</DialogTitle>
                      </DialogHeader>
                      <ScrollArea className="h-96 w-full rounded-md border border-amber-400/30 p-4">
                        <pre className="text-sm text-amber-100/90 whitespace-pre-wrap font-mono">
                          {template.demoContent}
                        </pre>
                      </ScrollArea>
                    </DialogContent>
                  </Dialog>
                  <Button 
                    size="sm"
                    className="flex-1 bg-amber-600 hover:bg-amber-700 text-black"
                    onClick={() => handleDownloadTemplate(template)}
                  >
                    <Download className="h-3 w-3 mr-1" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured Templates */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-amber-100 mb-6">Most Popular Templates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-black/60 backdrop-blur-md border-amber-400/30 text-amber-100">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-amber-600/20 rounded-lg">
                    <Wand2 className="h-8 w-8 text-amber-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-amber-200 mb-2">AI Contract Generator</h3>
                    <p className="text-amber-100/70 text-sm mb-4">
                      Create personalized contracts using our AI-powered contract builder with guided questions.
                    </p>
                    <Button 
                      className="bg-amber-600 hover:bg-amber-700 text-black"
                      onClick={handleGenerateTemplate}
                    >
                      Start Building
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/60 backdrop-blur-md border-amber-400/30 text-amber-100">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-amber-600/20 rounded-lg">
                    <Star className="h-8 w-8 text-amber-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-amber-200 mb-2">Premium Collection</h3>
                    <p className="text-amber-100/70 text-sm mb-4">
                      Access our premium collection of attorney-reviewed templates with advanced clauses.
                    </p>
                    <Button className="bg-amber-600 hover:bg-amber-700 text-black">
                      Upgrade Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractTemplates;
