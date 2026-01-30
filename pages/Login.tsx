import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      if (data.session) {
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light text-slate-900">
      {/* Hero Section */}
      <div className="relative h-[40vh] w-full shrink-0">
        <div 
          className="absolute inset-0 bg-center bg-no-repeat bg-cover" 
          style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBr4bHnvG6Z4x3DB95SwtyI1ANcCGqurRh2Jygb3f9ywNXLnfNf_OWijEJb4f1Gwk7OMZo2jbLjXSr7a24A0N51SjeVRc0eZyVlRCxWVtN5r8-oFPlvyeVYunSe5mkWpLUE4TvwU783W-Ie-tHZRPwRyPUJQ95eJf8iyDrEB_LzRPXegbaqnxeEgu26GyZhhTDXWWl7tyYN8L9VcAfXXol1XHXF1i6wykd_QPXkOxgpkdGvvahkgmQBt3GOp3fYfFEDQrnt9VXFF7c")' }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background-light via-transparent to-transparent"></div>
        {/* Branding */}
        <div className="absolute bottom-6 left-6">
          <div className="flex items-center gap-2">
            <div className="bg-primary-light p-2 rounded-lg shadow-lg shadow-primary-light/20">
              <span className="material-symbols-outlined text-white">fitness_center</span>
            </div>
            <span className="text-2xl font-bold text-slate-900">FitFlow</span>
          </div>
        </div>
      </div>

      {/* Login Form */}
      <div className="flex-1 px-6 pt-2 pb-10">
        <div className="mb-2">
          <h1 className="text-slate-900 tracking-tight text-[32px] font-bold leading-tight pb-1 pt-4">Welcome Back</h1>
          <p className="text-slate-500 text-sm">Sign in to continue your fitness journey</p>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="mt-6 space-y-4">
          <div className="flex flex-col">
            <label className="flex flex-col w-full">
              <span className="text-slate-900 text-sm font-semibold leading-normal pb-2">Email Address</span>
              <input 
                className="flex w-full rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-light/50 border border-gray-200 bg-white h-14 placeholder:text-gray-400 px-4 text-base" 
                placeholder="name@example.com" 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>

          <div className="flex flex-col">
            <label className="flex flex-col w-full">
              <span className="text-slate-900 text-sm font-semibold leading-normal pb-2">Password</span>
              <div className="flex w-full items-stretch rounded-lg relative">
                <input 
                  className="flex w-full rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-light/50 border border-gray-200 bg-white h-14 placeholder:text-gray-400 px-4 text-base" 
                  placeholder="Enter your password" 
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-0 bottom-0 px-4 flex items-center justify-center"
                >
                  <span className="material-symbols-outlined text-gray-400 cursor-pointer">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </label>
          </div>

          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-2">
              <input 
                id="remember" 
                type="checkbox"
                className="h-5 w-5 rounded border-gray-300 text-primary-light focus:ring-primary-light cursor-pointer"
              />
              <label className="text-slate-900 text-sm font-medium cursor-pointer" htmlFor="remember">Remember me</label>
            </div>
            <button className="text-primary-light text-sm font-semibold hover:underline">
              Forgot Password?
            </button>
          </div>

          <div className="pt-2">
            <button 
              onClick={handleLogin}
              disabled={loading}
              className={`flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-4 bg-primary-light text-slate-900 text-base font-bold leading-normal transition-all active:scale-95 shadow-lg shadow-primary-light/20 hover:bg-primary ${loading ? 'opacity-70' : ''}`}
            >
              {loading ? <span className="material-symbols-outlined animate-spin">refresh</span> : <span className="truncate text-white">Login</span>}
            </button>
          </div>

          <div className="flex items-center gap-4 py-4">
            <div className="h-px flex-1 bg-gray-200"></div>
            <span className="text-gray-400 text-xs font-medium uppercase tracking-wider">or continue with</span>
            <div className="h-px flex-1 bg-gray-200"></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 h-12 bg-white hover:bg-gray-50 transition-colors">
              <img alt="Google" className="w-5 h-5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCR7ZR1kgLfH3q65wszxG2Dy3tTw2t23jmT8XVd42gtCiV3WmdABpjAwrY4kFFWiaVynoJ6bMRNdIoteMlnbufmmjQb-2YUxnzZlOc5vQBpbI7AnzBw_Xda8UI_zEi9cuNeJI4JoGHItOIa6Qh962a9Nga5rXYj60FZ6vZqnZUMxY0yRaLhDNbziYhUkMHaMKq2LpbEWnES1fruvE24SkMz2jOlZoqS5KVZPAoinaaZH4WyeHIKteo4uv28AzLOFw3FVR_G-hoxnyU" />
              <span className="text-sm font-medium text-slate-700">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 h-12 bg-white hover:bg-gray-50 transition-colors">
              <span className="material-symbols-outlined text-black" style={{ fontSize: '20px' }}>laptop_mac</span>
              <span className="text-sm font-medium text-slate-700">Apple</span>
            </button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-slate-500 text-sm">
            Don't have an account? 
            <button onClick={() => navigate('/signup/1')} className="text-primary-light font-bold hover:underline ml-1">Sign Up</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;