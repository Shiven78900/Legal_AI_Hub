
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Scale, Shield, Users, Brain, MessageCircle, FileText, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-amber-900/20 to-black">
      {/* Header */}
      <header className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scale className="h-8 w-8 text-amber-400" />
            <h1 className="text-2xl font-bold text-amber-100">LegalAI</h1>
          </div>
          <div className="flex gap-4">
            <Button 
              onClick={() => navigate('/auth')}
              variant="outline" 
              className="bg-amber-600/20 border-amber-400 text-amber-100 hover:bg-amber-600/30"
            >
              Sign In
            </Button>
            <Button 
              onClick={() => navigate('/auth')}
              className="bg-amber-600 hover:bg-amber-700 text-black font-semibold"
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-6 bg-amber-600/20 text-amber-200 border-amber-400/30">
            AI-Powered Legal Solutions
          </Badge>
          <h2 className="text-5xl md:text-6xl font-bold text-amber-100 mb-6 leading-tight">
            Your Legal Assistant,
            <span className="text-amber-400"> Powered by AI</span>
          </h2>
          <p className="text-xl text-amber-100/80 mb-8 max-w-2xl mx-auto">
            Get instant legal advice, generate contracts, and connect with verified lawyers. 
            Making legal services accessible, affordable, and efficient.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => navigate('/auth')}
              className="bg-amber-600 hover:bg-amber-700 text-black font-semibold text-lg px-8 py-3"
            >
              Try Quick Question
              <MessageCircle className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => navigate('/auth')}
              className="bg-black/40 border-amber-400 text-amber-100 hover:bg-amber-600/20 text-lg px-8 py-3"
            >
              Preview Features
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-amber-100 mb-4">
            Everything You Need for Legal Support
          </h3>
          <p className="text-amber-100/70 text-lg max-w-2xl mx-auto">
            From quick legal questions to complex contract generation, we've got you covered
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* AI Legal Assistant */}
          <Card className="bg-black/60 backdrop-blur-md border-amber-400/30 hover:scale-105 transition-transform duration-300">
            <CardHeader>
              <Brain className="h-12 w-12 text-amber-400 mb-4" />
              <CardTitle className="text-amber-200">AI Legal Assistant</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-amber-100/70 mb-4">
                Get instant answers to your legal questions with our advanced AI assistant trained on legal knowledge.
              </p>
              <Button 
                className="w-full bg-amber-600/20 hover:bg-amber-600/30 text-amber-100 border border-amber-400/30"
                onClick={() => navigate('/auth')}
              >
                Ask a Question
              </Button>
            </CardContent>
          </Card>

          {/* Contract Templates */}
          <Card className="bg-black/60 backdrop-blur-md border-amber-400/30 hover:scale-105 transition-transform duration-300">
            <CardHeader>
              <FileText className="h-12 w-12 text-amber-400 mb-4" />
              <CardTitle className="text-amber-200">Smart Contracts</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-amber-100/70 mb-4">
                Generate professional legal documents and contracts tailored to your specific needs.
              </p>
              <Button 
                className="w-full bg-amber-600/20 hover:bg-amber-600/30 text-amber-100 border border-amber-400/30"
                onClick={() => navigate('/auth')}
              >
                Create Contract
              </Button>
            </CardContent>
          </Card>

          {/* Lawyer Marketplace */}
          <Card className="bg-black/60 backdrop-blur-md border-amber-400/30 hover:scale-105 transition-transform duration-300">
            <CardHeader>
              <Users className="h-12 w-12 text-amber-400 mb-4" />
              <CardTitle className="text-amber-200">Find Lawyers</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-amber-100/70 mb-4">
                Connect with verified lawyers in your area for personalized legal consultation and representation.
              </p>
              <Button 
                className="w-full bg-amber-600/20 hover:bg-amber-600/30 text-amber-100 border border-amber-400/30"
                onClick={() => navigate('/auth')}
              >
                Find Lawyer
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Trust Section */}
      <section className="container mx-auto px-6 py-16">
        <Card className="bg-black/40 backdrop-blur-md border-amber-400/30">
          <CardContent className="p-12 text-center">
            <Shield className="h-16 w-16 text-amber-400 mx-auto mb-6" />
            <h3 className="text-3xl font-bold text-amber-100 mb-4">
              Trusted & Secure
            </h3>
            <p className="text-amber-100/70 text-lg max-w-2xl mx-auto mb-8">
              Your privacy and data security are our top priorities. All communications are encrypted, 
              and we follow strict confidentiality protocols.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge className="bg-amber-600/20 text-amber-200 border-amber-400/30">
                End-to-End Encrypted
              </Badge>
              <Badge className="bg-amber-600/20 text-amber-200 border-amber-400/30">
                GDPR Compliant
              </Badge>
              <Badge className="bg-amber-600/20 text-amber-200 border-amber-400/30">
                Attorney-Client Privilege
              </Badge>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-4xl font-bold text-amber-100 mb-6">
            Ready to Get Started?
          </h3>
          <p className="text-amber-100/70 text-lg mb-8">
            Join thousands of users who trust LegalAI for their legal needs
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate('/auth')}
            className="bg-amber-600 hover:bg-amber-700 text-black font-semibold text-lg px-12 py-4"
          >
            Start Your Legal Journey
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8 border-t border-amber-400/20">
        <div className="text-center text-amber-100/60">
          <p>&copy; 2024 LegalAI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
