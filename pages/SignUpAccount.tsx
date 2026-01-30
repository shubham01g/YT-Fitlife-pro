import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUpAccount: React.FC = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleNext = () => {
    if (!fullName || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    
    // Pass data to next step
    navigate('/signup/2', { 
      state: { 
        fullName, 
        email, 
        password 
      } 
    });
  };

  return (
    <div className="bg-background-light min-h-screen flex flex-col items-center">
      <div className="w-full max-w-md min-h-screen flex flex-col bg-white shadow-sm">
        {/* TopAppBar */}
        <div className="flex items-center p-4 pb-2 justify-between">
          <button onClick={() => navigate('/login')} className="text-slate-900 flex size-12 shrink-0 items-center justify-start cursor-pointer">
            <span className="material-symbols-outlined">arrow_back_ios</span>
          </button>
          <h2 className="text-slate-900 text-lg font-bold leading-tight flex-1 text-center pr-12">Create Account</h2>
        </div>

        {/* ProgressBar */}
        <div className="flex flex-col gap-3 p-4">
          <div className="flex gap-6 justify-between">
            <p className="text-slate-900 text-base font-medium">Account Details</p>
            <p className="text-gray-500 text-sm font-normal">1 of 3</p>
          </div>
          <div className="rounded-full bg-gray-100 h-2 w-full">
            <div className="h-2 rounded-full bg-primary-light" style={{ width: '33.33%' }}></div>
          </div>
        </div>

        {/* Headline */}
        <div className="px-4 pt-4 pb-2">
          <h2 className="text-slate-900 tracking-tight text-[28px] font-bold leading-tight text-center">Your fitness journey starts here</h2>
          <p className="text-gray-500 text-center mt-2 text-base">Enter your basic information to create your secure profile.</p>
        </div>

        {error && (
          <div className="mx-4 mt-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Form Fields */}
        <div className="flex flex-col gap-2 p-4 mt-4">
          <div className="flex flex-col w-full py-2">
            <label className="flex flex-col w-full">
              <span className="text-slate-900 text-sm font-semibold pb-2">Full Name</span>
              <input 
                className="flex w-full rounded-xl text-slate-900 border border-gray-200 bg-white h-14 placeholder:text-gray-400 px-4 text-base focus:ring-2 focus:ring-primary-light/50 focus:border-primary-light outline-none transition-all" 
                placeholder="e.g. Alex Johnson" 
                type="text" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </label>
          </div>
          <div className="flex flex-col w-full py-2">
            <label className="flex flex-col w-full">
              <span className="text-slate-900 text-sm font-semibold pb-2">Email Address</span>
              <input 
                className="flex w-full rounded-xl text-slate-900 border border-gray-200 bg-white h-14 placeholder:text-gray-400 px-4 text-base focus:ring-2 focus:ring-primary-light/50 focus:border-primary-light outline-none transition-all" 
                placeholder="alex@example.com" 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>
          <div className="flex flex-col w-full py-2">
            <label className="flex flex-col w-full">
              <span className="text-slate-900 text-sm font-semibold pb-2">Password</span>
              <div className="relative">
                <input 
                  className="flex w-full rounded-xl text-slate-900 border border-gray-200 bg-white h-14 placeholder:text-gray-400 px-4 text-base focus:ring-2 focus:ring-primary-light/50 focus:border-primary-light outline-none transition-all" 
                  placeholder="••••••••" 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer">visibility</span>
              </div>
              <p className="text-xs text-gray-400 mt-2">Must be at least 6 characters long.</p>
            </label>
          </div>
        </div>

        <div className="flex-grow"></div>

        {/* Footer */}
        <div className="p-4 pb-10 flex flex-col gap-4">
          <button 
            onClick={handleNext}
            className="w-full bg-primary-light hover:bg-primary-dark text-white text-base font-bold h-14 rounded-xl flex items-center justify-center transition-colors shadow-lg shadow-primary-light/20 active:scale-95"
          >
            Next
          </button>
          <p className="text-center text-sm text-gray-500">
            Already have an account? 
            <button onClick={() => navigate('/login')} className="text-primary-light font-bold hover:underline ml-1">Log In</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpAccount;