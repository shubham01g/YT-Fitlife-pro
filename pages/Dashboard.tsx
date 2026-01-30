import React from 'react';
import BottomNav from '../components/BottomNav';
import { BarChart, Bar, ResponsiveContainer, Cell, XAxis } from 'recharts';
import { useAuth } from '../contexts/AuthContext';

const data = [
  { day: 'Sept 1', weight: 76.0, active: false },
  { day: '', weight: 75.8, active: false },
  { day: '', weight: 75.5, active: false },
  { day: '', weight: 75.2, active: false },
  { day: '', weight: 75.0, active: false },
  { day: 'Sept 15', weight: 74.9, active: false },
  { day: '', weight: 74.8, active: false },
  { day: '', weight: 74.7, active: false },
  { day: '', weight: 74.6, active: false },
  { day: 'Today', weight: 74.5, active: true },
];

const Dashboard: React.FC = () => {
  const { profile } = useAuth();
  
  // Use profile data or fallback
  const userName = profile?.full_name || 'User';

  return (
    <div className="bg-background-light min-h-screen flex justify-center">
      <div className="relative flex h-full min-h-screen w-full flex-col max-w-md bg-white shadow-2xl overflow-hidden pb-20">
        
        {/* Header */}
        <header className="flex items-center justify-between px-6 pt-8 pb-4 bg-white sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div 
                className="bg-center bg-no-repeat bg-cover rounded-full size-10 border-2 border-primary/20"
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB-9aWJuR41EEuUmJNbMZL0wi-RNP5TJdBcHQ2g4WhT3QLByKo8ldeeDvO2W1vBfc96sRz7HW-5KpT9buClH-VnMFHkCe37gvxXpf0bGyn2iqlN8Z0sowvg7xIdP1lC8HxGivvRTLtAMRZO77uR4FdGm8kpczouEiGCk-tKrkm_BLGhfhn0oCqdDIxMfa7UyfNNr8n7GxDXrMPBGCIiGVAB8zT8wlzXxxjLpf9a4lWLv1ko63BezkTJfhQORVo0X6EVSBiilJ2tYw4")' }}
              ></div>
              <div className="absolute bottom-0 right-0 size-3 bg-primary rounded-full border-2 border-white"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 font-medium">Good Morning,</span>
              <h2 className="text-slate-900 text-lg font-bold leading-tight">{userName}</h2>
            </div>
          </div>
          <button className="relative flex items-center justify-center size-10 rounded-full bg-gray-50 text-slate-900 hover:bg-gray-100 transition-colors">
            <span className="material-symbols-outlined text-[24px]">notifications</span>
            <span className="absolute top-2 right-2.5 size-2 bg-red-500 rounded-full border border-white"></span>
          </button>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto no-scrollbar px-6 pb-24">
          
          {/* Calorie Circle */}
          <section className="mt-4 mb-8 flex flex-col items-center justify-center">
            <div className="relative size-64 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="#e5e7eb" strokeWidth="6" />
                <circle cx="50" cy="50" r="42" fill="none" stroke="#13ec5b" strokeWidth="6" strokeDasharray="264" strokeDashoffset="79" strokeLinecap="round" className="drop-shadow-[0_0_10px_rgba(19,236,91,0.5)]" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-gray-400 text-sm font-medium mb-1">Calories Remaining</span>
                <h1 className="text-4xl font-bold text-slate-900 tracking-tight">750</h1>
                <span className="text-xs text-gray-400 mt-1 font-medium">Goal: 2,200 kcal</span>
                <button className="mt-4 flex items-center gap-1 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary-dark rounded-full text-sm font-semibold transition-colors active:scale-95">
                  <span className="material-symbols-outlined text-[18px]">add</span>
                  Add Meal
                </button>
              </div>
            </div>
          </section>

          {/* Macros */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-900">Macronutrients</h3>
              <button className="text-xs font-semibold text-primary-dark hover:underline">View Details</button>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-gray-50 p-4 rounded-xl shadow-sm border border-transparent">
                <div className="flex justify-between items-end mb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-blue-100 rounded-lg text-blue-600">
                      <span className="material-symbols-outlined text-[20px]">egg_alt</span>
                    </div>
                    <span className="font-semibold text-slate-900">Protein</span>
                  </div>
                  <span className="text-xs font-medium text-gray-500">120g / 180g</span>
                </div>
                <div className="relative h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div className="absolute top-0 left-0 h-full bg-blue-500 rounded-full" style={{ width: '66%' }}></div>
                </div>
                <div className="mt-2 flex justify-between text-xs text-gray-400">
                  <span>66%</span>
                  <span>60g left</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <div className="p-1.5 bg-orange-100 rounded-lg text-orange-600">
                        <span className="material-symbols-outlined text-[20px]">bakery_dining</span>
                      </div>
                      <span className="text-xs font-bold text-slate-900">Carbs</span>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-gray-500">200/250g</span>
                      </div>
                      <div className="relative h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div className="absolute top-0 left-0 h-full bg-orange-500 rounded-full" style={{ width: '80%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <div className="p-1.5 bg-yellow-100 rounded-lg text-yellow-600">
                        <span className="material-symbols-outlined text-[20px]">water_drop</span>
                      </div>
                      <span className="text-xs font-bold text-slate-900">Fats</span>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-gray-500">45/70g</span>
                      </div>
                      <div className="relative h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div className="absolute top-0 left-0 h-full bg-yellow-500 rounded-full" style={{ width: '64%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Weight Trend */}
          <section className="mb-8">
            <h3 className="text-lg font-bold text-slate-900 mb-4 px-1">Weight Trend <span className="text-sm font-normal text-gray-500 ml-1">(30 Days)</span></h3>
            <div className="bg-gray-50 p-5 rounded-2xl shadow-sm">
              <div className="flex items-end gap-2 mb-6">
                <h4 className="text-3xl font-bold text-slate-900">
                  {profile?.weight || 74.5} <span className="text-sm text-gray-500 font-medium">{profile?.unit_weight || 'kg'}</span>
                </h4>
                <span className="mb-1.5 px-2 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded-full flex items-center">
                  <span className="material-symbols-outlined text-[14px] mr-0.5">trending_down</span>
                  1.2%
                </span>
              </div>
              
              {/* Chart */}
              <div className="h-32 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data} barCategoryGap={2}>
                    <XAxis 
                      dataKey="day" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{fontSize: 10, fill: '#9ca3af'}} 
                      interval={0}
                    />
                    <Bar dataKey="weight" radius={[2, 2, 0, 0]}>
                      {data.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.active ? '#13ec5b' : '#13ec5b40'} 
                          className={entry.active ? 'drop-shadow-lg' : ''}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>
        </main>

        <button className="absolute bottom-24 right-6 size-14 bg-primary hover:bg-primary-dark rounded-full shadow-lg shadow-primary/40 flex items-center justify-center text-white z-20 transition-transform active:scale-95">
          <span className="material-symbols-outlined text-[32px]">add</span>
        </button>

        <BottomNav />
      </div>
    </div>
  );
};

export default Dashboard;