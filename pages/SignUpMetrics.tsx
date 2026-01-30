import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

const SignUpMetrics: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get data from previous step
  const prevData = location.state as { fullName: string; email: string; password: string } | null;

  const [selectedGoal, setSelectedGoal] = useState('lose-weight');
  const [unitWeight, setUnitWeight] = useState<'KG'|'LBS'>('KG');
  const [unitHeight, setUnitHeight] = useState<'CM'|'FT'>('CM');
  const [age, setAge] = useState(24);
  const [weight, setWeight] = useState(72);
  const [height, setHeight] = useState(175);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // If accessed directly without step 1 data, redirect
  if (!prevData) {
    React.useEffect(() => {
      navigate('/signup/1');
    }, [navigate]);
    return null;
  }

  const ensureProfile = async (userId: string) => {
    try {
      // Check if profile exists
      const { data } = await supabase.from('profiles').select('id').eq('id', userId).single();
      
      if (!data) {
        // Insert if missing
        const { error: insertError } = await supabase
          .from('profiles')
          .insert([
            {
              id: userId,
              full_name: prevData.fullName,
              age: age,
              weight: weight,
              height: height,
              goal: selectedGoal,
              unit_weight: unitWeight,
              unit_height: unitHeight,
            }
          ]);
        
        if (insertError) console.error("Error creating profile:", insertError);
      }
    } catch (e) {
      console.error("Profile check failed", e);
    }
  };

  const handleComplete = async () => {
    setLoading(true);
    setError(null);

    try {
      // 1. Try to Sign Up
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: prevData.email,
        password: prevData.password,
      });

      // Handle specific "User already registered" or Rate Limit cases by attempting to Log In instead
      if (authError) {
        // If user exists or rate limit hit, try logging in directly
        // This is common in dev if you click the button multiple times
        if (authError.message.includes("already registered") || authError.status === 429) {
           const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
             email: prevData.email,
             password: prevData.password,
           });

           if (loginError) {
             // If login also fails (e.g. wrong password or unverified email), throw original or login error
             if (loginError.message.includes("Email not confirmed")) {
               throw new Error("Please verify your email or disable 'Confirm Email' in Supabase settings.");
             }
             throw loginError;
           }

           if (loginData.session) {
             await ensureProfile(loginData.user.id);
             navigate('/dashboard');
             return;
           }
        }
        
        throw authError;
      }

      // 2. Success Path
      if (authData.session) {
        // Session active (Email confirmation disabled)
        await ensureProfile(authData.user!.id);
        navigate('/dashboard');
      } else if (authData.user) {
        // User created but no session (Email confirmation required)
        setError("Account created! Please disable 'Confirm Email' in Supabase to login immediately, or check your inbox.");
      }

    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to create account.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background-light min-h-screen flex flex-col items-center">
      <div className="relative flex h-full min-h-screen w-full max-w-md flex-col bg-white overflow-x-hidden shadow-sm">
        {/* TopAppBar */}
        <div className="flex items-center p-4 pb-2 justify-between sticky top-0 z-10 bg-white">
          <button onClick={() => navigate('/signup/1')} className="text-slate-900 flex size-12 shrink-0 items-center cursor-pointer">
            <span className="material-symbols-outlined">arrow_back_ios</span>
          </button>
          <h2 className="text-slate-900 text-lg font-bold leading-tight flex-1 text-center pr-12">Step 2 of 3</h2>
        </div>

        {/* PageIndicators */}
        <div className="flex w-full flex-row items-center justify-center gap-3 py-5">
          <div className="h-2 w-8 rounded-full bg-primary-light/30"></div>
          <div className="h-2 w-12 rounded-full bg-primary-light"></div>
          <div className="h-2 w-8 rounded-full bg-primary-light/30"></div>
        </div>

        {/* Headline */}
        <h2 className="text-slate-900 tracking-tight text-[28px] font-bold leading-tight px-6 text-left pb-2">Tell us about yourself</h2>
        <p className="text-slate-500 text-base font-normal leading-normal pb-6 pt-1 px-6">Your metrics help us personalize your fitness and nutrition plan to reach your goals faster.</p>

        {error && (
          <div className="mx-6 mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Form Fields */}
        <div className="flex flex-col gap-6 px-6">
          {/* Age */}
          <div className="flex flex-col w-full">
            <p className="text-slate-900 text-base font-medium leading-normal pb-2">Age</p>
            <input 
              className="flex w-full rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-primary-light border border-gray-200 bg-white h-14 placeholder:text-gray-400 px-4 text-base" 
              placeholder="Years" 
              type="number" 
              value={age}
              onChange={(e) => setAge(parseInt(e.target.value))}
            />
          </div>

          {/* Weight */}
          <div className="flex flex-col w-full">
            <div className="flex justify-between items-end pb-2">
              <p className="text-slate-900 text-base font-medium leading-normal">Weight</p>
              <div className="flex bg-gray-100 p-1 rounded-lg">
                <button onClick={() => setUnitWeight('KG')} className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${unitWeight === 'KG' ? 'bg-white shadow-sm text-slate-900' : 'text-gray-500'}`}>KG</button>
                <button onClick={() => setUnitWeight('LBS')} className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${unitWeight === 'LBS' ? 'bg-white shadow-sm text-slate-900' : 'text-gray-500'}`}>LBS</button>
              </div>
            </div>
            <input 
              className="flex w-full rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-primary-light border border-gray-200 bg-white h-14 placeholder:text-gray-400 px-4 text-base" 
              placeholder="Enter weight" 
              type="number" 
              value={weight}
              onChange={(e) => setWeight(parseFloat(e.target.value))}
            />
          </div>

          {/* Height */}
          <div className="flex flex-col w-full">
            <div className="flex justify-between items-end pb-2">
              <p className="text-slate-900 text-base font-medium leading-normal">Height</p>
              <div className="flex bg-gray-100 p-1 rounded-lg">
                <button onClick={() => setUnitHeight('CM')} className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${unitHeight === 'CM' ? 'bg-white shadow-sm text-slate-900' : 'text-gray-500'}`}>CM</button>
                <button onClick={() => setUnitHeight('FT')} className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${unitHeight === 'FT' ? 'bg-white shadow-sm text-slate-900' : 'text-gray-500'}`}>FT</button>
              </div>
            </div>
            <input 
              className="flex w-full rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-primary-light border border-gray-200 bg-white h-14 placeholder:text-gray-400 px-4 text-base" 
              placeholder="Enter height" 
              type="number" 
              value={height}
              onChange={(e) => setHeight(parseFloat(e.target.value))}
            />
          </div>

          {/* Goal Selection */}
          <div className="pt-2">
            <p className="text-slate-900 text-base font-medium leading-normal pb-4">What is your main goal?</p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { id: 'lose-weight', label: 'Lose Weight', icon: 'trending_down' },
                { id: 'build-muscle', label: 'Build Muscle', icon: 'fitness_center' },
                { id: 'maintain', label: 'Maintain', icon: 'balance' },
                { id: 'get-fit', label: 'Get Fit', icon: 'bolt' }
              ].map(goal => (
                <div 
                  key={goal.id}
                  onClick={() => setSelectedGoal(goal.id)}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border cursor-pointer transition-all active:scale-95 ${selectedGoal === goal.id ? 'border-2 border-primary-light bg-primary-light/5' : 'border-gray-200 hover:border-primary-light'}`}
                >
                  <span className={`material-symbols-outlined mb-2 text-3xl ${selectedGoal === goal.id ? 'text-primary-light' : 'text-gray-400'}`}>{goal.icon}</span>
                  <span className="text-sm font-semibold text-slate-900 text-center">{goal.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-grow min-h-[40px]"></div>

        {/* Footer */}
        <div className="px-6 pb-10 pt-4 bg-white sticky bottom-0 border-t border-gray-100">
          <button 
            onClick={handleComplete}
            disabled={loading}
            className={`flex w-full h-14 items-center justify-center rounded-xl bg-primary-light text-white font-bold text-lg hover:bg-primary transition-colors shadow-lg shadow-primary-light/20 active:scale-95 ${loading ? 'opacity-70' : ''}`}
          >
            {loading ? <span className="material-symbols-outlined animate-spin">refresh</span> : 'Complete Profile'}
          </button>
          <p className="text-center text-xs text-gray-500 mt-4">You can change these later in settings</p>
        </div>
      </div>
    </div>
  );
};

export default SignUpMetrics;