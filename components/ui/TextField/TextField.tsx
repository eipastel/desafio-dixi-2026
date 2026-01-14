
import React from 'react';

interface TextFieldProps {
  label?: string;
  placeholder?: string;
  value?: string;
  error?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  state?: 'default' | 'hover' | 'filled' | 'error' | 'disabled';
}

const TextField: React.FC<TextFieldProps> = ({
  label,
  placeholder,
  value,
  error,
  disabled,
  icon,
}) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && <label className="text-field-label text-dixi-fieldTitle uppercase tracking-wider">{label}</label>}
      <div className="relative">
        <input
          type="text"
          defaultValue={value}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            w-full border rounded-md px-4 py-3 text-field-text outline-none transition-colors
            ${error ? 'border-red-500' : 'border-dixi-outline'}
            ${disabled ? 'bg-gray-50 text-dixi-disabled cursor-not-allowed' : 'bg-white text-dixi-highlight'}
            focus:border-dixi-base hover:border-dixi-hover
            placeholder:text-dixi-placeholder
          `}
        />
        {icon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-dixi-placeholder">
            {icon}
          </div>
        )}
      </div>
      {error && <span className="text-[11px] text-red-500 italic mt-0.5">{error}</span>}
    </div>
  );
};

export default TextField;
