import { ArrowRight, Calendar, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

function IndexContact() {
  const navigate = useNavigate();
  return (
    <div className="relative py-16 sm:py-20 md:py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full filter blur-3xl animate-pulse"></div>
      </div>

      <div className="relative max-w-3xl sm:max-w-4xl md:max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6 sm:mb-8 text-black leading-snug sm:leading-tight">
          Ready to Transform{" "}
          <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent">
            Your Dreams?
          </span>
        </h2>

        <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 sm:mb-12 leading-relaxed max-w-2xl mx-auto">
          Join thousands of satisfied customers who've transformed their homes
          with our premium collections and exceptional service.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
          <button
            className="group relative px-6 py-4 sm:px-10 sm:py-6 text-sm sm:text-base bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-black rounded-2xl overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-2xl shadow-yellow-500/25 hover:shadow-yellow-500/50"
            onClick={() => navigate("/book-demo")}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            <span className="relative flex items-center justify-center space-x-2 sm:space-x-3">
              <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />
              <span>Book Free Consultation</span>
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 sm:group-hover:translate-x-2 transition-transform duration-300" />
            </span>
          </button>

          <button className="group px-6 py-4 sm:px-10 sm:py-6 text-sm sm:text-base bg-gradient-to-r from-green-500 to-green-600 text-white font-black rounded-2xl transform hover:scale-105 transition-all duration-300 shadow-2xl shadow-green-500/25 hover:shadow-green-500/50">
            <span className="flex items-center justify-center space-x-2 sm:space-x-3">
              <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
              <span>WhatsApp Us</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default IndexContact;
