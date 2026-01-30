import React, { useState } from 'react';
import BottomNav from '../components/BottomNav';
import { Exercise } from '../types';

const exercises: Exercise[] = [
  { id: '1', name: 'Bench Press', type: 'Barbell', category: 'Chest', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAOiXpQMiJ010dKbK4CXzKzAmVYaHJrDv628QhGhiWpPeXPTyO7UXhWnmfqMnOz7I9EFrlzIZmMVn5ce47oybCzxhEUxQMWE4Wzh2e01BLedvFZLPwDfOJqTtH7TVRm2b7itH_X90n8Ziw6iwZ4FVVJmLPlxnmLLNFVH_dDi51311UfU7SL2Ep6FGXVWVYTflFbIphkvHIor3EDgGvh8KmPOSCZPMw-Enu6X1FDLRTKU2xpRRJ7SbFAeln08mRnb1QMTBN5aImu21M' },
  { id: '2', name: 'Incline Press', type: 'Dumbbell', category: 'Chest', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfoumSZQRMOrHfBTFUaof-efsicxR4b5lWaXFGLWPtgwqwgU9QpgKN7it0Qbe40mP4w5mjHx6Lt0Sf_2sa61XdcJy0Ju4cgYmIhtRw-NugaGKQuu9UkCy4haV2NrwzsPcghTxgHs4WdNrgh50cTvWaghEjn2rAcaWbL9gvAAGIaZ3LC3Z3lmZ87E21jdg9PLqN0I98MNyZpOZ6XSo_UDTAgkmxuiBqogU3drhmMqxniE3y5rVhwlNp0yL4MsRVZRFRAUFlMf_-1Kw' },
  { id: '3', name: 'Cable Fly', type: 'Cable', category: 'Chest', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQ71LE-bixYt0mt1WjIQH7dsNSrdyig4PtUxJkYyY43NfbDCeiPCnlte0DLSlRUVf-e8NICxPtvswAviy5Cd_Cv8xJRhoy2OcI1BTCzWurxTzgauPhMYm0Rpt2jGGzuFVyUKKtFCDX73e3xqYvDkoCOHCUnIIb9JWtbpR3XVWRSrWctoQJxQnwd2_ReLDPIYtF998cs5lw_twHuA8cwYMMc12ZZzRErJIt-yf7k7W1cC3VMvtBrGdVdMRpf9gqqY70EDWo6PBSNZg' },
  { id: '4', name: 'Push Ups', type: 'Bodyweight', category: 'Chest', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBAWX1wSJ8kY3XFvVXj_IIKYRvXGPqehl_fQeZTxXsMAvqQAeK7UI8kt0cTNDOpHLcAPW01SRIFSejg9s56X56t5Ml4IyRMBcT4GuzItLyWG-1MEuGAALqclPDkkYtQw70iFhGc64ks4JRS_esvcjjAuITYub5s7SVBs0xLrEhT8FCr0d64b251s3Nz7YcFdF71eZ_qF3FwpeIGQoK1_q2qs2wYOvk7HTBbczNrMmee6kMkD4xbdjnR2dxHQL8GLLyecPd6uxvjSg8' },
  { id: '5', name: 'Chest Dip', type: 'Bodyweight', category: 'Chest', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCaV4W9Jr3LjxvybRmDxdgZMaujqKoJm_F6TLu4qS4zzeAOCFzX2shp5srKMcxSTP_097wruv9C52C0gCnH_vjq5aiZkBbSgM0QdRILWwP-C9R2LrYf2gnFicExhuoJkFeWzfUvR2wQNsKLkOK9Xd-f1aPg2ySKcP0mtRSdH5Xn9eo0iQ9zLgfE_hj3MiczF0q7y4yIZ4gSRqUDpIO3-wRp5r1IRv4aCF9E2D2rwWwtptnOwTFdiu_4HG4SrQfolJzK7T45ZcXBowc' },
  { id: '6', name: 'Pullover', type: 'Dumbbell', category: 'Chest', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrR_QBZyjxEwEi6YckpaQgZcphd0vc7xtmelVtLGd5KOi79DlE_zsFBNHcv1c1OQU5Dt-FNxynItrVLpi0KE-hMOIrW2w3Yr8w3okhZK5ZN_6qf6ehJHbEMcqolfjojHVc9zzvCX8Sd5Pxn9-NqsJS6jY3Zl7HTsx-qdEhLNJsBE6BQb3KOd_i2WPwDRg14webk2InSXSEGPinvZXf829WFuEHtbnq67GwqUQKJGHL4Ey_CkQpDYnh6kyuvQ5oAGj219PXvAFK3WU' },
];

const categories = ['Chest', 'Back', 'Biceps', 'Triceps', 'Legs'];

const Planner: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('Chest');

  return (
    <div className="bg-background-light min-h-screen flex justify-center">
      <div className="relative flex h-full min-h-screen w-full flex-col max-w-md bg-white shadow-2xl overflow-hidden pb-20">
        <header className="shrink-0 flex items-center justify-between px-4 py-3 bg-white z-20">
          <button className="flex items-center justify-center p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors text-slate-800">
            <span className="material-symbols-outlined text-[24px]">arrow_back</span>
          </button>
          <h2 className="text-lg font-bold tracking-tight text-slate-900">Plan Workout</h2>
          <button className="text-sm font-bold text-primary-dark hover:text-primary transition-colors">Reset</button>
        </header>

        <main className="flex-1 overflow-y-auto no-scrollbar pb-36 relative">
          <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm px-4 pt-2 pb-4 w-full border-b border-transparent transition-all">
            <div className="flex gap-3 overflow-x-auto no-scrollbar snap-x">
              {categories.map((cat) => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`snap-start shrink-0 flex items-center gap-2 px-5 py-2 rounded-full transition-transform active:scale-95 ${activeCategory === cat ? 'bg-primary text-slate-900 shadow-sm shadow-primary/20' : 'bg-gray-100 border border-gray-100 text-slate-600 hover:bg-gray-200'}`}
                >
                  <span className={`text-sm ${activeCategory === cat ? 'font-semibold' : 'font-medium'}`}>{cat}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 grid grid-cols-2 gap-4">
            {exercises.map((exercise) => (
              <div key={exercise.id} className="group relative flex flex-col gap-2 p-2 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-gray-100">
                  <div 
                    className="absolute inset-0 bg-center bg-cover transition-transform duration-500 group-hover:scale-105" 
                    style={{ backgroundImage: `url("${exercise.image}")` }}
                  ></div>
                  <button className="absolute bottom-2 right-2 flex items-center justify-center size-8 bg-white/90 rounded-full shadow-lg text-slate-900 hover:bg-primary transition-all">
                    <span className="material-symbols-outlined text-[20px]">add</span>
                  </button>
                </div>
                <div>
                  <h3 className="text-slate-900 text-sm font-bold leading-tight">{exercise.name}</h3>
                  <p className="text-primary-dark text-xs font-medium">{exercise.type}</p>
                </div>
              </div>
            ))}
          </div>
        </main>

        <div className="absolute bottom-20 left-0 w-full px-4 z-30 pointer-events-none">
          <div className="pointer-events-auto flex items-center justify-between gap-4 rounded-xl border border-primary/20 bg-white/95 backdrop-blur-md p-4 shadow-xl shadow-slate-200/50">
            <div className="flex flex-col gap-1">
              <p className="text-slate-900 text-sm font-bold leading-tight">Current Session</p>
              <div className="flex items-center gap-1.5">
                <span className="flex h-2 w-2 rounded-full bg-primary"></span>
                <p className="text-slate-500 text-xs font-medium leading-normal">3 Exercises</p>
              </div>
            </div>
            <button className="flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg h-9 px-4 bg-primary hover:bg-[#0be6d3] transition-colors text-slate-900 text-sm font-bold leading-normal active:scale-95">
              <span>View</span>
              <span className="material-symbols-outlined text-[18px]">expand_less</span>
            </button>
          </div>
        </div>

        <BottomNav />
      </div>
    </div>
  );
};

export default Planner;