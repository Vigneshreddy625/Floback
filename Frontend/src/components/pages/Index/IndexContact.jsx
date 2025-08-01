import { ArrowRight, Calendar, MessageCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function IndexContact() {
  const navigate = useNavigate();
  return (
    <div className="relative py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full filter blur-3xl animate-pulse"></div>
        </div>

        <div className="relative max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-5xl lg:text-6xl font-black mb-8 text-black leading-tight">
            Ready to Transform{" "}
            <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent">
              Your Dreams?
            </span>
          </h2>
          <p className="text-xl lg:text-2xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
            Join thousands of satisfied customers who've transformed their homes with our premium collections and exceptional service.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="group relative px-10 py-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-black rounded-2xl overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-2xl shadow-yellow-500/25 hover:shadow-yellow-500/50" onClick={() => navigate("/book-demo")}>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              <span className="relative flex items-center justify-center space-x-3">
                <Calendar className="w-6 h-6" />
                <span>Book Free Consultation</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
            </button>
            
            <button className="group px-10 py-6 bg-gradient-to-r from-green-500 to-green-600 text-white font-black rounded-2xl transform hover:scale-105 transition-all duration-300 shadow-2xl shadow-green-500/25 hover:shadow-green-500/50">
              <span className="flex items-center justify-center space-x-3">
                <MessageCircle className="w-6 h-6" />
                <span>WhatsApp Us</span>
              </span>
            </button>
          </div>
        </div>
      </div>
  )
}

export default IndexContact