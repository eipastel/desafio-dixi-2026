
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  footer?: React.ReactNode;
  maxWidth?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, title, children, onClose, footer, maxWidth = 'max-w-md' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative bg-white rounded-[20px] shadow-2xl w-full ${maxWidth} overflow-hidden transform transition-all`}>
        <div className="px-8 py-5 flex justify-between items-center">
          <h3 className="text-[22px] font-bold text-dixi-base">{title}</h3>
          <button onClick={onClose} className="text-dixi-base hover:opacity-70 transition-opacity">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="9" y1="9" x2="15" y2="15"></line>
                <line x1="15" y1="9" x2="9" y2="15"></line>
            </svg>
          </button>
        </div>
        <div className="px-8 pb-8">
          {children}
        </div>
        {footer && (
          <div className="px-8 py-6 bg-white flex flex-col sm:flex-row gap-4">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
