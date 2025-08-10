import React from 'react'

const FormTextArea = ({ label, name, value, onChange, error, ...props }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-semibold text-slate-700 mb-2">
      {label}
    </label>
    <textarea
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-3 bg-slate-50 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 resize-none ${
        error ? 'border-red-300' : 'border-slate-200'
      }`}
      {...props}
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

export default FormTextArea;