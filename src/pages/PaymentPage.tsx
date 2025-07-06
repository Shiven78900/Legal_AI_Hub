
import { useState } from "react";
import { ArrowLeft, CreditCard, Smartphone, Wallet, Shield, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const PaymentPage = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("upi");
  const [selectedUPIApp, setSelectedUPIApp] = useState("gpay");
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  // Get lawyer info passed from marketplace
  const lawyerInfo = location.state?.lawyer || {
    name: "Selected Lawyer",
    specialty: "Legal Consultation",
    hourlyRate: "₹200"
  };

  const paymentMethods = [
    {
      id: "upi",
      name: "UPI Payment",
      icon: <Smartphone className="h-5 w-5" />,
      options: [
        { id: "gpay", name: "Google Pay", logo: "🟢" },
        { id: "phonepe", name: "PhonePe", logo: "🟣" },
        { id: "paytm", name: "Paytm", logo: "🔵" },
        { id: "bhim", name: "BHIM UPI", logo: "🟠" }
      ],
      recommended: true
    },
    {
      id: "card",
      name: "Credit/Debit Card",
      icon: <CreditCard className="h-5 w-5" />,
      options: [
        { id: "visa", name: "Visa", logo: "💳" },
        { id: "mastercard", name: "Mastercard", logo: "💳" },
        { id: "rupay", name: "RuPay", logo: "💳" },
        { id: "amex", name: "American Express", logo: "💳" }
      ]
    },
    {
      id: "wallet",
      name: "Digital Wallet",
      icon: <Wallet className="h-5 w-5" />,
      options: [
        { id: "paytm_wallet", name: "Paytm Wallet", logo: "🔵" },
        { id: "mobikwik", name: "Mobikwik", logo: "🔴" },
        { id: "freecharge", name: "Freecharge", logo: "🟡" },
        { id: "amazon_pay", name: "Amazon Pay", logo: "🟠" }
      ]
    }
  ];

  const handlePayment = async () => {
    setIsProcessing(true);
    
    try {
      // Simulate payment processing based on selected method
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Show success message
      toast({
        title: "Payment Successful!",
        description: `Your consultation with ${lawyerInfo.name} has been booked successfully.`,
      });
      
      // Navigate to success page or chat interface
      navigate('/legal-dashboard', { 
        state: { 
          lawyer: lawyerInfo,
          paymentStatus: 'completed',
          message: 'Consultation booked successfully!'
        } 
      });
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const selectedMethod = paymentMethods.find(method => method.id === selectedPaymentMethod);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-amber-900/20 to-black p-6">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            size="icon"
            className="bg-amber-600/20 border-amber-400 text-amber-100 hover:bg-amber-600/30"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-amber-100">Secure Payment</h1>
            <p className="text-amber-100/70">Complete your payment to start consultation</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Methods */}
          <div className="lg:col-span-2">
            <Card className="bg-black/60 backdrop-blur-md border-amber-400/30 text-amber-100">
              <CardHeader>
                <CardTitle className="text-amber-200 flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Choose Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod}>
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="space-y-3">
                      <div className="flex items-center space-x-2 p-3 border border-amber-400/20 rounded-lg hover:bg-amber-500/10">
                        <RadioGroupItem value={method.id} id={method.id} />
                        <Label htmlFor={method.id} className="flex items-center gap-3 cursor-pointer flex-1">
                          {method.icon}
                          <span className="font-medium">{method.name}</span>
                          {method.recommended && (
                            <Badge className="bg-green-600 text-white text-xs">Recommended</Badge>
                          )}
                        </Label>
                      </div>
                      
                      {selectedPaymentMethod === method.id && (
                        <div className="ml-6 pl-4 border-l-2 border-amber-400/30">
                          {method.id === "upi" ? (
                            <div className="space-y-2">
                              <p className="text-amber-200 text-sm mb-3">Select your preferred UPI app:</p>
                              <RadioGroup value={selectedUPIApp} onValueChange={setSelectedUPIApp}>
                                {method.options.map((option) => (
                                  <div key={option.id} className="flex items-center space-x-2">
                                    <RadioGroupItem value={option.id} id={`upi-${option.id}`} />
                                    <Label htmlFor={`upi-${option.id}`} className="flex items-center gap-2 cursor-pointer">
                                      <span className="text-lg">{option.logo}</span>
                                      <span className="text-amber-100">{option.name}</span>
                                    </Label>
                                  </div>
                                ))}
                              </RadioGroup>
                            </div>
                          ) : (
                            <div className="flex flex-wrap gap-2">
                              {method.options.map((option) => (
                                <Badge key={option.id} variant="outline" className="border-amber-400/30 text-amber-300">
                                  <span className="mr-1">{option.logo}</span>
                                  {option.name}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </RadioGroup>

                <div className="mt-6 p-4 bg-amber-600/10 border border-amber-400/30 rounded-lg">
                  <div className="flex items-center gap-2 text-amber-200 mb-2">
                    <Shield className="h-4 w-4" />
                    <span className="font-medium">Secure Payment</span>
                  </div>
                  <p className="text-amber-100/70 text-sm">
                    Your payment information is encrypted and secure. We use industry-standard security measures to protect your data.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="bg-black/60 backdrop-blur-md border-amber-400/30 text-amber-100">
              <CardHeader>
                <CardTitle className="text-amber-200">Consultation Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-semibold text-amber-200">{lawyerInfo.name}</h3>
                  <p className="text-amber-100/70 text-sm">{lawyerInfo.specialty}</p>
                </div>

                <div className="border-t border-amber-400/20 pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-amber-100/80">Consultation Fee</span>
                    <span className="font-semibold">₹150</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-amber-100/80">Platform Fee</span>
                    <span className="font-semibold">₹25</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-amber-100/80">GST (18%)</span>
                    <span className="font-semibold">₹31.50</span>
                  </div>
                  <div className="border-t border-amber-400/20 pt-2 mt-2">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-amber-200">Total Amount</span>
                      <span className="font-bold text-xl text-amber-200">₹206.50</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-sm text-amber-100/70">
                  <p>• 30-minute consultation session</p>
                  <p>• Chat and voice call support</p>
                  <p>• Follow-up questions included</p>
                  <p>• Session recording available</p>
                </div>

                {selectedPaymentMethod === "upi" && (
                  <div className="bg-green-600/10 border border-green-400/30 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-green-400 mb-1">
                      <CheckCircle className="h-4 w-4" />
                      <span className="font-medium text-sm">UPI Payment Selected</span>
                    </div>
                    <p className="text-green-300/80 text-xs">
                      You'll be redirected to {selectedMethod?.options.find(opt => opt.id === selectedUPIApp)?.name} to complete the payment
                    </p>
                  </div>
                )}

                <Button 
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-black font-semibold py-3"
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black"></div>
                      Processing Payment...
                    </div>
                  ) : (
                    `Pay ₹206.50 via ${selectedPaymentMethod === "upi" ? "UPI" : selectedMethod?.name}`
                  )}
                </Button>

                <p className="text-xs text-amber-100/60 text-center">
                  By proceeding, you agree to our Terms of Service and Privacy Policy
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
