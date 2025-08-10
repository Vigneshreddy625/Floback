import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Phone, MessageCircle, CheckCircle, Star, Home, Sparkles, AlertCircle, Loader2 } from 'lucide-react';
import ContactCard from '../BookDemo/ContactCard';
import Header from '../Layout/Header';
import HeroSection from '../BookDemo/HeroSection';
import axios from "axios";
import BookingForm from '../BookDemo/BookingForm';


const ExpectationCard = ({ icon, title, description, gradient }) => (
  <div className={`flex items-start gap-4 p-4 ${gradient} rounded-2xl`}>
    {icon}
    <div>
      <h4 className="font-semibold text-slate-800 mb-1">{title}</h4>
      <p className="text-slate-600 text-sm">{description}</p>
    </div>
  </div>
);

const ExpectationsSection = () => (
  <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-slate-200/50 shadow-xl">
    <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
      <CheckCircle className="w-6 h-6 text-emerald-500 mr-3" />
      What to Expect
    </h3>
    <div className="space-y-4">
      <ExpectationCard
        icon={<Calendar className="w-6 h-6 text-indigo-600 mt-1 flex-shrink-0" />}
        title="Free Consultation"
        description="Complimentary in-home visit at your preferred time"
        gradient="bg-gradient-to-r from-blue-50 to-indigo-50"
      />
      <ExpectationCard
        icon={<MapPin className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />}
        title="Professional Measurement"
        description="Precise space assessment by certified experts"
        gradient="bg-gradient-to-r from-purple-50 to-pink-50"
      />
      <ExpectationCard
        icon={<Clock className="w-6 h-6 text-emerald-600 mt-1 flex-shrink-0" />}
        title="Custom Recommendations"
        description="Personalized design solutions for your lifestyle"
        gradient="bg-gradient-to-r from-emerald-50 to-teal-50"
      />
      <ExpectationCard
        icon={<Star className="w-6 h-6 text-amber-600 mt-1 flex-shrink-0" />}
        title="No Obligation Quote"
        description="Transparent pricing with no hidden costs"
        gradient="bg-gradient-to-r from-orange-50 to-amber-50"
      />
    </div>
  </div>
);

const BookDemo = () => {
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 font-sans">
      <Header />
      <HeroSection />

      <section className="py-8 sm:py-16 px-4" id="booking-form">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <BookingForm
              />
            <div className="space-y-6">
              <ExpectationsSection />
              
              <ContactCard />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookDemo;