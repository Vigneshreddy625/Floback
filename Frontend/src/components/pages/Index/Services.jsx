import { ArrowRight, Sofa, Palette, Calendar } from 'lucide-react';

function Services() {
  return (
    <div className="py-8 md:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl lg:text-6xl font-black text-gray-900 mb-6">
            Our <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience luxury redefined with our comprehensive suite of premium offerings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              icon: Sofa,
              title: "Premium Sofas",
              description: "Handcrafted masterpieces with luxurious fabrics and customizable designs tailored to your home.",
              gradient: "from-sky-500 via-indigo-500 to-purple-500",
              delay: "0s",
            },
            {
              icon: Palette,
              title: "Designer Curtains",
              description: "Bespoke curtains and blinds that match your interiors and enhance the aesthetics of your space.",
              gradient: "from-pink-500 via-rose-400 to-red-500",
              delay: "0.2s",
            },
            {
              icon: Calendar,
              title: "Free Home Demo",
              description: "Exclusive consultation service — experience our products in your home before making a decision.",
              gradient: "from-green-500 via-emerald-400 to-teal-500",
              delay: "0.4s",
            },
          ].map((service, index) => (
            <div
              key={index}
              className="group relative p-8 bg-white rounded-3xl border border-gray-200 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 hover:scale-[1.03] overflow-hidden"
              style={{ animationDelay: service.delay }}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}
              ></div>

              <div
                className={`relative w-20 h-20 bg-gradient-to-r ${service.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl`}
              >
                <service.icon className="w-10 h-10 text-white" />
              </div>

              <h3 className="text-center text-2xl font-bold text-gray-800 mb-4 group-hover:text-yellow-500 transition-colors duration-300">
                {service.title}
              </h3>

              <p className="text-center text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>

              <div className="text-center">
                <button className="inline-flex items-center space-x-2 text-gray-800 font-semibold hover:text-yellow-500 transition-colors duration-300 group/btn">
                  <span>Discover More</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform duration-300" />
                </button>
              </div>

              <div className="absolute top-4 right-4 w-2 h-2 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-500"></div>
              <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-orange-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-700"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Services;
