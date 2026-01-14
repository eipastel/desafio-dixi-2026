
import React from 'react';

interface ButtonProps {
  variant?: 'filled' | 'outlined';
  size?: 'sm' | 'md';
  children: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'filled', 
  size = 'md', 
  children, 
  icon, 
  disabled = false,
  className = '',
  onClick
}) => {
  const baseStyles = "inline-flex items-center justify-center gap-2 rounded-md font-bold transition-all active:scale-[0.98]";
  
  const variants = {
    filled: "bg-dixi-base text-white hover:bg-dixi-hover disabled:bg-dixi-disabled",
    outlined: "bg-transparent border-2 border-dixi-base text-dixi-base hover:bg-dixi-light disabled:border-dixi-disabled disabled:text-dixi-disabled"
  };

  const sizes = {
    sm: "px-4 py-2 text-[12px]",
    md: "px-6 py-3 text-btn-text"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {icon && <span className="w-5 h-5 flex items-center justify-center">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
