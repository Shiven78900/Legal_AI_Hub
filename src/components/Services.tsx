
import { Scale, Brain, FileText, Users } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Brain,
      title: "AI Legal Research",
      description: "Advanced AI-powered legal research tools that analyze vast databases of legal precedents, statutes, and case law to provide comprehensive insights."
    },
    {
      icon: FileText,
      title: "Document Analysis",
      description: "Intelligent document review and analysis using machine learning to identify key clauses, risks, and opportunities in legal documents."
    },
    {
      icon: Scale,
      title: "Case Prediction",
      description: "Predictive analytics to assess case outcomes based on historical data, helping lawyers make informed strategic decisions."
    },
    {
      icon: Users,
      title: "Legal Consultation",
      description: "AI-assisted legal consultation platform connecting clients with qualified attorneys and providing preliminary legal guidance."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      {/* Background atmospheric effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-amber-800/30 to-yellow-700/30 rounded-full mix-blend-screen filter blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-amber-700/25 to-yellow-600/25 rounded-full mix-blend-screen filter blur-2xl animate-pulse animation-delay-2000" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold text-amber-100 mb-6">
            Our AI-Powered Legal Services
          </h2>
          <p className="text-xl text-amber-200/80 max-w-3xl mx-auto">
            Revolutionizing the legal industry with cutting-edge artificial intelligence 
            to make legal services more accessible, efficient, and accurate.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm p-8 rounded-xl border border-amber-500/20 shadow-lg hover:shadow-xl hover:shadow-amber-500/10 transform hover:-translate-y-2 transition-all duration-300 animate-scale-in hover:border-amber-400/40"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-amber-600 to-yellow-600 rounded-lg flex items-center justify-center mb-6 mx-auto shadow-lg shadow-amber-500/25">
                <service.icon className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-xl font-semibold text-amber-100 mb-4 text-center">
                {service.title}
              </h3>
              <p className="text-amber-200/70 text-center leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent" />
    </section>
  );
};

export default Services;
