import { AlertCircle, CheckCircle } from 'lucide-react';
import React from 'react'

const StatusMessage = ({ type, message }) => {
  if (!message) return null;
  const isSuccess = type === 'success';
  const icon = isSuccess ? <CheckCircle className="w-5 h-5 flex-shrink-0" /> : <AlertCircle className="w-5 h-5 flex-shrink-0" />;
  const classes = isSuccess 
    ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' 
    : 'bg-red-50 border border-red-200 text-red-800';

  return (
    <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${classes}`}>
      {icon}
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
};

export default StatusMessage