
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import LegalDashboard from "./pages/LegalDashboard";
import UserTypeSelection from "./pages/UserTypeSelection";
import LawyerProfile from "./pages/LawyerProfile";
import ClientProfile from "./pages/ClientProfile";
import ContractTemplates from "./pages/ContractTemplates";
import AIAssistance from "./pages/AIAssistance";
import LawyerMarketplace from "./pages/LawyerMarketplace";
import PaymentPage from "./pages/PaymentPage";
import Auth from "./pages/Auth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/legal-dashboard" element={<LegalDashboard />} />
          <Route path="/user-type-selection" element={<UserTypeSelection />} />
          <Route path="/profile/lawyer" element={<LawyerProfile />} />
          <Route path="/profile/client" element={<ClientProfile />} />
          <Route path="/contract-templates" element={<ContractTemplates />} />
          <Route path="/ai-assistance" element={<AIAssistance />} />
          <Route path="/lawyer-marketplace" element={<LawyerMarketplace />} />
          <Route path="/payment" element={<PaymentPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
