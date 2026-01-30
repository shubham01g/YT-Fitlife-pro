import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getIconClass = (path: string) => {
    return location.pathname === path 
      ? "material-symbols-outlined text-[24px] filled text-primary-dark" 
      : "material-symbols-outlined text-[24px] text-gray-400";
  };

  const getTextClass = (path: string) => {
    return location.pathname === path 
      ? "text-[10px] font-medium text-primary-dark" 
      : "text-[10px] font-medium text-gray-400";
  };

  return (
    <nav className="bg-white border-t border-gray-100 pb-safe pt-2 px-6 shadow-[0_-5px_20px_rgba(0,0,0,0.03)] z-30 fixed bottom-0 w-full max-w-md left-1/2 -translate-x-1/2">
      <div className="flex justify-between items-center h-16 pb-2">
        <button 
          onClick={() => navigate('/dashboard')}
          className="flex flex-col items-center gap-1 w-16"
        >
          <span className={getIconClass('/dashboard')}>grid_view</span>
          <span className={getTextClass('/dashboard')}>Home</span>
        </button>
        
        <button 
          onClick={() => navigate('/planner')}
          className="flex flex-col items-center gap-1 w-16"
        >
          <span className={getIconClass('/planner')}>calendar_today</span>
          <span className={getTextClass('/planner')}>Planner</span>
        </button>
        
        <button 
          onClick={() => navigate('/log')}
          className="flex flex-col items-center gap-1 w-16"
        >
          <span className={getIconClass('/log')}>book</span>
          <span className={getTextClass('/log')}>Log</span>
        </button>
        
        <button 
          onClick={() => navigate('/profile')}
          className="flex flex-col items-center gap-1 w-16"
        >
          <span className={getIconClass('/profile')}>person</span>
          <span className={getTextClass('/profile')}>Profile</span>
        </button>
      </div>
    </nav>
  );
};

export default BottomNav;