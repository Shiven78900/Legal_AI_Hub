
import { useState, useEffect } from "react";
import { Bot, Send, User, Paperclip, Download, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: number;
  sender: 'user' | 'ai';
  content: string;
  timestamp: string;
}

const AIAssistance = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "ai",
      content: "Hello! I'm your AI Legal Assistant. I can help you with legal questions, document analysis, contract review, and general legal guidance. How can I assist you today?",
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/auth');
        return;
      }
      setUser(user);
    };
    getUser();
  }, [navigate]);

  const handleSendMessage = async () => {
    if (!message.trim() || !user) return;

    const userMessage: Message = {
      id: messages.length + 1,
      sender: "user",
      content: message,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Store user message in Supabase
      await supabase.from('ai_messages').insert({
        user_id: user.id,
        message: message
      });

      // TODO: Call AI model here - this is where you'll integrate your AI model
      // For now, we'll simulate an AI response
      const aiResponse = await simulateAIResponse(message);
      
      const aiMessage: Message = {
        id: messages.length + 2,
        sender: "ai",
        content: aiResponse,
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, aiMessage]);

      // Update the database with AI response
      await supabase.from('ai_messages')
        .update({ response: aiResponse })
        .eq('user_id', user.id)
        .eq('message', message);

    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
      setMessage("");
    }
  };

  // Temporary AI simulation - replace this with your actual AI model integration
  const simulateAIResponse = async (userMessage: string): Promise<string> => {
    // This is where you'll call your AI model
    // The model file should be placed in: src/lib/ai/model.ts
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate processing time
    
    const responses = [
      "Based on your legal question, I recommend reviewing the relevant statutes and case law. Would you like me to provide more specific guidance?",
      "This appears to be a contract-related query. Let me analyze the key legal principles that apply to your situation.",
      "For employment law matters like this, there are several important considerations. Let me break them down for you.",
      "Your question touches on constitutional law. Here's what you should know about your rights in this situation."
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const quickQuestions = [
    "Help me review a contract",
    "What are my tenant rights?",
    "How to file a small claims case?",
    "Employment law basics",
    "Creating a will",
    "Business formation advice"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-amber-900/20 to-black p-6">
      <div className="container mx-auto max-w-6xl h-[calc(100vh-3rem)]">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-600/20 rounded-lg">
              <Bot className="h-6 w-6 text-amber-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-amber-100">AI Legal Assistant</h1>
              <p className="text-amber-100/70">Get instant legal guidance powered by AI</p>
            </div>
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

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100%-8rem)]">
          {/* Sidebar with Quick Actions */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="bg-black/60 backdrop-blur-md border-amber-400/30 text-amber-100">
              <CardHeader>
                <CardTitle className="text-amber-200 text-lg">Quick Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {quickQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full text-left justify-start text-sm bg-amber-600/20 border-amber-400/50 text-amber-100 hover:bg-amber-600/40 hover:text-amber-50 p-3 h-auto whitespace-normal leading-relaxed"
                    onClick={() => setMessage(question)}
                  >
                    {question}
                  </Button>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-black/60 backdrop-blur-md border-amber-400/30 text-amber-100">
              <CardHeader>
                <CardTitle className="text-amber-200 text-lg">AI Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Paperclip className="h-4 w-4 text-amber-400" />
                  <span>Document Analysis</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Download className="h-4 w-4 text-amber-400" />
                  <span>Legal Templates</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Bot className="h-4 w-4 text-amber-400" />
                  <span>24/7 Legal Guidance</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Chat Area */}
          <div className="lg:col-span-3">
            <Card className="bg-black/60 backdrop-blur-md border-amber-400/30 text-amber-100 h-full flex flex-col">
              {/* Chat Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {msg.sender === 'ai' && (
                        <div className="w-8 h-8 bg-amber-600/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <Bot className="h-4 w-4 text-amber-400" />
                        </div>
                      )}
                      
                      <div className={`max-w-[70%] ${msg.sender === 'user' ? 'order-first' : ''}`}>
                        <div
                          className={`p-3 rounded-lg ${
                            msg.sender === 'user'
                              ? 'bg-amber-600 text-black ml-auto'
                              : 'bg-black/40 border border-amber-400/20'
                          }`}
                        >
                          <p className="text-sm">{msg.content}</p>
                        </div>
                        <p className="text-xs text-amber-100/50 mt-1 px-1">
                          {msg.timestamp}
                        </p>
                      </div>

                      {msg.sender === 'user' && (
                        <div className="w-8 h-8 bg-amber-600/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="h-4 w-4 text-amber-400" />
                        </div>
                      )}
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex gap-3 justify-start">
                      <div className="w-8 h-8 bg-amber-600/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="h-4 w-4 text-amber-400 animate-pulse" />
                      </div>
                      <div className="bg-black/40 border border-amber-400/20 p-3 rounded-lg">
                        <p className="text-sm text-amber-100/70">AI is thinking...</p>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Message Input */}
              <div className="p-4 border-t border-amber-400/20">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-amber-400 text-amber-100 hover:bg-amber-600/20"
                  >
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ask me anything about legal matters..."
                    className="flex-1 bg-black/40 border-amber-400/30 text-amber-100 placeholder:text-amber-100/50"
                    onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
                    disabled={isLoading}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={isLoading || !message.trim()}
                    className="bg-amber-600 hover:bg-amber-700 text-black"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-amber-100/50 mt-2">
                  AI responses are for informational purposes only and do not constitute legal advice.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistance;
