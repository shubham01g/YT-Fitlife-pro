import React from 'react';
import BottomNav from '../components/BottomNav';

const Log: React.FC = () => {
  return (
    <div className="bg-background-light min-h-screen flex justify-center">
      <div className="relative flex h-full min-h-screen w-full flex-col max-w-md bg-white shadow-2xl overflow-hidden pb-20">
        <header className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm p-4 pb-2">
          <div className="flex items-center justify-between">
            <button className="flex size-10 items-center justify-center rounded-full hover:bg-black/5 active:scale-95 transition-all text-slate-900">
              <span className="material-symbols-outlined" style={{fontSize: '24px'}}>chevron_left</span>
            </button>
            <div className="flex flex-col items-center">
              <h2 className="text-slate-900 text-lg font-bold leading-tight tracking-[-0.015em]">Today</h2>
              <span className="text-xs font-medium text-primary-dark">Wed, 24 Oct</span>
            </div>
            <button className="flex size-10 items-center justify-center rounded-full hover:bg-black/5 active:scale-95 transition-all text-slate-900">
              <span className="material-symbols-outlined" style={{fontSize: '24px'}}>calendar_today</span>
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto pb-24 px-4 no-scrollbar">
          <div className="mt-2 mb-6 rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
            <div className="flex flex-col gap-3 mb-6">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-3xl font-bold text-slate-900 tracking-tight">1,250</p>
                  <p className="text-sm font-medium text-primary-dark">kcal Remaining</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-slate-900">Goal: 2,200</p>
                </div>
              </div>
              <div className="relative h-3 w-full rounded-full bg-gray-100 overflow-hidden">
                <div className="absolute top-0 left-0 h-full rounded-full bg-primary" style={{width: '57%'}}></div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 border-t border-gray-100 pt-4">
              {[
                { label: 'Carbs', val: 120, max: 250, color: 'bg-blue-400' },
                { label: 'Protein', val: 140, max: 180, color: 'bg-red-400' },
                { label: 'Fat', val: 55, max: 70, color: 'bg-yellow-400' }
              ].map((macro) => (
                <div key={macro.label} className="flex flex-col gap-1 items-center text-center">
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary-dark">{macro.label}</p>
                  <p className="text-sm font-bold text-slate-900">{macro.val}g <span className="text-gray-400 font-normal">/ {macro.max}g</span></p>
                  <div className="w-full h-1.5 rounded-full bg-gray-100 mt-1">
                    <div className={`h-full rounded-full ${macro.color}`} style={{width: `${(macro.val/macro.max)*100}%`}}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <section className="mb-4">
            <div className="flex items-center justify-between px-1 mb-2">
              <h3 className="text-lg font-bold text-slate-900">Breakfast</h3>
              <span className="text-sm font-medium text-primary-dark">450 kcal</span>
            </div>
            <div className="flex flex-col gap-3">
              {[
                { name: '2 Large Eggs', p: 12, c: 1, f: 10, cal: 140 },
                { name: 'Oatmeal with Berries', p: 6, c: 54, f: 4, cal: 310 }
              ].map((item, idx) => (
                <div key={idx} className="group relative flex items-center justify-between gap-4 rounded-xl bg-white p-4 shadow-sm border border-transparent hover:border-primary/20 transition-all cursor-pointer">
                  <div className="flex flex-1 flex-col">
                    <p className="text-base font-semibold text-slate-900">{item.name}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      <span className="text-red-500/80 font-medium">P: {item.p}g</span> • 
                      <span className="text-blue-500/80 font-medium ml-1">C: {item.c}g</span> • 
                      <span className="text-yellow-500/80 font-medium ml-1">F: {item.f}g</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="text-sm font-bold text-slate-900">{item.cal}</p>
                    <button className="text-gray-400 hover:text-primary transition-colors">
                      <span className="material-symbols-outlined" style={{fontSize: '20px'}}>edit</span>
                    </button>
                  </div>
                </div>
              ))}
              <button className="flex items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 py-3 text-sm font-medium text-gray-500 hover:bg-white hover:text-primary transition-colors">
                <span className="material-symbols-outlined" style={{fontSize: '18px'}}>add</span>
                Add Food
              </button>
            </div>
          </section>

          <section className="mb-4 pt-2">
            <div className="flex items-center justify-between px-1 mb-2">
              <h3 className="text-lg font-bold text-slate-900">Lunch</h3>
              <span className="text-sm font-medium text-primary-dark">500 kcal</span>
            </div>
            <div className="flex flex-col gap-3">
              {[
                { name: 'Grilled Chicken Salad', p: 45, c: 12, f: 20, cal: 420 },
                { name: 'Green Apple', p: 0, c: 22, f: 0, cal: 80 }
              ].map((item, idx) => (
                <div key={idx} className="group relative flex items-center justify-between gap-4 rounded-xl bg-white p-4 shadow-sm border border-transparent hover:border-primary/20 transition-all cursor-pointer">
                  <div className="flex flex-1 flex-col">
                    <p className="text-base font-semibold text-slate-900">{item.name}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      <span className="text-red-500/80 font-medium">P: {item.p}g</span> • 
                      <span className="text-blue-500/80 font-medium ml-1">C: {item.c}g</span> • 
                      <span className="text-yellow-500/80 font-medium ml-1">F: {item.f}g</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="text-sm font-bold text-slate-900">{item.cal}</p>
                    <button className="text-gray-400 hover:text-primary transition-colors">
                      <span className="material-symbols-outlined" style={{fontSize: '20px'}}>edit</span>
                    </button>
                  </div>
                </div>
              ))}
              <button className="flex items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 py-3 text-sm font-medium text-gray-500 hover:bg-white hover:text-primary transition-colors">
                <span className="material-symbols-outlined" style={{fontSize: '18px'}}>add</span>
                Add Food
              </button>
            </div>
          </section>

          <div className="h-20"></div>
        </main>

        <button className="absolute bottom-24 right-4 z-20 flex size-14 items-center justify-center rounded-full bg-primary shadow-lg shadow-primary/30 transition-transform hover:scale-105 active:scale-95 text-white">
          <span className="material-symbols-outlined" style={{fontSize: '28px'}}>add</span>
        </button>

        <BottomNav />
      </div>
    </div>
  );
};

export default Log;