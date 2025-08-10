import { MessageCircle, Phone } from 'lucide-react';
import React from 'react'

const ContactCard = () => {
  const openWhatsApp = () => {
    const message = encodeURIComponent("Hello! I'd like to book a demo for home interior design.");
    window.open(`https://wa.me/917382178982?text=${message}`, '_blank');
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-slate-200/50 shadow-xl">
      <h3 className="text-2xl font-bold text-slate-800 mb-6">Need Immediate Help?</h3>
      <div className="space-y-4">
        <button
          onClick={openWhatsApp}
          className="w-full flex items-center justify-center gap-3 py-4 px-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
        >
          <MessageCircle className="w-5 h-5" />
          <span>WhatsApp: +91 73821 78982</span>
        </button>
        <button
          onClick={() => window.open('tel:+917382178982')}
          className="w-full flex items-center justify-center gap-3 py-4 px-6 bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 rounded-2xl font-semibold border-2 border-slate-300 hover:border-indigo-400 hover:shadow-lg transition-all duration-300"
        >
          <Phone className="w-5 h-5" />
          <span>Call: +91 73821 78982</span>
        </button>
      </div>
      <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200">
        <p className="text-sm text-amber-800 text-center">
          <strong>Available:</strong> Mon-Sat, 9:00 AM - 7:00 PM
        </p>
      </div>
    </div>
  );
};

export default ContactCard