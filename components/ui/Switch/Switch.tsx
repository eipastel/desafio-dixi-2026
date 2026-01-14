
import React from 'react';

interface SwitchProps {
  label?: string;
  checked?: boolean;
  onChange?: () => void;
}

const Switch: React.FC<SwitchProps> = ({ label, checked = false, onChange }) => {
  return (
    <label className="inline-flex items-center cursor-pointer group">
      <div className="relative">
        <input type="checkbox" className="sr-only" checked={checked} onChange={onChange} />
        <div className={`block w-12 h-6 rounded-full transition-colors ${checked ? 'bg-dixi-base' : 'bg-dixi-disabled'}`}></div>
        <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${checked ? 'translate-x-6' : ''}`}></div>
      </div>
      {label && <span className="ml-3 text-field-text text-dixi-body group-hover:text-dixi-highlight transition-colors">{label}</span>}
    </label>
  );
};

export default Switch;
