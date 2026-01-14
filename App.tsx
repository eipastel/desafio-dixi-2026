
import React from 'react';
import BaterPontoPage from './pages/BaterPonto/BaterPontoPage';

const App: React.FC = () => {
  return (
    <div className="h-screen flex bg-dixi-bg2 overflow-hidden">
      {/* Sidebar - Matching screenshot exactly */}
      <aside className="w-[100px] bg-dixi-base flex flex-col items-center shrink-0 border-r border-white/10">
        
        {/* Logo Section */}
        <div className="py-8 px-4 w-full flex justify-center">
            {/* Mock 'X' Logo based on image */}
            <svg viewBox="0 0 100 100" className="w-12 h-12 text-white fill-current">
                <path d="M20 10 L45 50 L20 90 H35 L52 62 L70 90 H85 L60 50 L85 10 H70 L52 38 L35 10 Z" />
            </svg>
        </div>

        <div className="w-full border-t border-white/40"></div>
        
        <nav className="flex flex-col w-full items-center">
            {/* Bater Ponto Item */}
            <button className="flex flex-col items-center gap-2 text-white w-full py-6 transition-colors bg-white/10">
                <div className="relative">
                    {/* Bater Ponto Icon (Clock inside a card/device) */}
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17,4H16V2H8V4H7A2,2,0,0,0,5,6V20a2,2,0,0,0,2,2H17a2,2,0,0,0,2,-2V6A2,2,0,0,0,17,4ZM12,19a5,5,0,1,1,5,-5A5,5,0,0,1,12,19ZM13,10H11v5h4V13H13Z" />
                    </svg>
                </div>
                <span className="text-[11px] font-bold text-center px-1 leading-tight">Bater Ponto</span>
            </button>

            <div className="w-full border-t border-white/40"></div>

            {/* Histórico Item */}
            <button className="flex flex-col items-center gap-2 text-white w-full py-6 opacity-90 hover:opacity-100 hover:bg-white/5 transition-all">
                <div>
                    {/* Histórico Icon (Document with lines) */}
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M14,2H6A2,2,0,0,0,4,4V20a2,2,0,0,0,2,2H18a2,2,0,0,0,2,-2V8ZM13,9V3.5L18.5,9ZM16,18H8V16h8Zm0,-4H8V12h8Z" />
                    </svg>
                </div>
                <span className="text-[11px] font-bold text-center px-1 leading-tight">Histórico de Ponto</span>
            </button>

            <div className="w-full border-t border-white/40"></div>
        </nav>
      </aside>

      {/* Main Content Area - Centered and non-scrolling */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 lg:p-10">
        <BaterPontoPage />
      </main>
    </div>
  );
};

export default App;
