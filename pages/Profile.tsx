import React from 'react';
import BottomNav from '../components/BottomNav';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  const userName = profile?.full_name || 'Guest';
  const weight = profile?.weight || '--';
  const unit = profile?.unit_weight || 'kg';

  return (
    <div className="bg-background-light min-h-screen flex justify-center">
      <div className="relative flex h-full min-h-screen w-full flex-col max-w-md bg-white shadow-2xl overflow-hidden pb-20">
        <header className="sticky top-0 z-50 flex items-center bg-white/80 backdrop-blur-md p-4 pb-2 justify-between border-b border-slate-100">
          <button className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-slate-100 transition-colors">
            <span className="material-symbols-outlined text-slate-800 text-[24px]">arrow_back</span>
          </button>
          <h1 className="text-slate-900 text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-10">Profile & Analytics</h1>
          <button onClick={handleSignOut} className="absolute right-4 text-xs font-semibold text-red-500 hover:text-red-600">
            Sign Out
          </button>
        </header>

        <section className="flex flex-col items-center pt-6 pb-2 px-6">
          <div className="relative group cursor-pointer">
            <div className="h-28 w-28 rounded-full border-4 border-white shadow-lg overflow-hidden bg-slate-100">
              <img alt="Profile" className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_6865SEgMErEI6U-DwVb120CCSeKJKSgJDEu0Z0KlOjjseUfFdrDF9RnNAzA4At6OeSWluNiEp1F9yjOZA02J6iqOWfIBOF6Qr6hu4jp0oEDBbjW51t1G3kZE7Iz0DdcaUTqvKo1g2cP5EJyKSgRQoB6uy_8nTeTvYucQNWVHZwZuoWY8syCHVqKga39H1BHDMkBr9DFDL3s9nsVxn2E9LSxosl023vSpoTdxs_ryahlEWrvkmHo76nyyV4wvMXmaDnv8HmQH3Nc" />
            </div>
            <div className="absolute bottom-0 right-0 bg-primary text-white p-1.5 rounded-full border-2 border-white flex items-center justify-center">
              <span className="material-symbols-outlined text-[16px] font-bold">edit</span>
            </div>
          </div>
          <div className="mt-4 text-center">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{userName}</h2>
            <div className="mt-1 flex items-center justify-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary-dark">Intermediate</span>
              <span className="text-slate-400 text-sm font-medium">•</span>
              <span className="text-gray-500 text-sm font-medium">Joined Jan 2023</span>
            </div>
            <p className="mt-2 text-gray-500 text-sm max-w-[200px] mx-auto leading-relaxed">Focusing on {profile?.goal?.replace('-', ' ') || 'fitness'}.</p>
          </div>
        </section>

        <section className="px-4 py-4">
          <div className="grid grid-cols-3 gap-3">
            {[
              { val: weight, unit: unit, label: 'Weight' },
              { val: '15', unit: '%', label: 'Body Fat' },
              { val: '24', unit: '🔥', label: 'Streak' }
            ].map((stat, idx) => (
              <div key={idx} className="flex flex-col gap-1 rounded-2xl bg-white p-3 items-center text-center shadow-sm border border-slate-100">
                <p className={`text-xl font-bold tracking-tight ${stat.unit === '🔥' ? 'text-primary' : 'text-slate-900'}`}>{stat.val}<span className="text-sm font-normal text-slate-400 ml-0.5">{stat.unit}</span></p>
                <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="h-2 bg-slate-50 w-full"></div>

        <section className="pt-6 pb-2 px-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-900 text-lg font-bold tracking-tight">Nutrient Analysis</h3>
            <div className="flex bg-slate-100 rounded-lg p-0.5">
              <button className="px-3 py-1 text-xs font-medium rounded-md bg-white shadow-sm text-slate-900">Week</button>
              <button className="px-3 py-1 text-xs font-medium rounded-md text-gray-500 hover:text-slate-700">Month</button>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <div className="flex justify-between items-end mb-6">
              <div>
                <p className="text-xs text-gray-500 font-medium mb-1">Weekly Average</p>
                <div className="flex items-baseline gap-2">
                  <h4 className="text-2xl font-bold text-slate-900">2,140</h4>
                  <span className="text-xs font-medium text-primary">kcal</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500 font-medium mb-1">Goal Status</p>
                <div className="flex items-center gap-1 justify-end text-primary">
                  <span className="material-symbols-outlined text-[18px]">trending_up</span>
                  <span className="text-xs font-bold">+2.4%</span>
                </div>
              </div>
            </div>

            <div className="flex items-end justify-between h-32 w-full gap-2 mt-4">
              {[65, 45, 85, 60, 75, 50, 70].map((h, i) => (
                <div key={i} className="flex flex-col items-center gap-2 flex-1 group cursor-pointer">
                  <div className="relative w-full rounded-t-sm bg-slate-100 h-full flex items-end overflow-hidden">
                    <div className={`w-full transition-all duration-300 ${i === 2 ? 'bg-primary shadow-[0_0_10px_rgba(19,236,91,0.3)]' : 'bg-primary/30 group-hover:bg-primary/50'}`} style={{height: `${h}%`}}></div>
                  </div>
                  <span className={`text-[10px] font-medium ${i === 2 ? 'text-slate-900 font-bold' : 'text-slate-400'}`}>{['M','T','W','T','F','S','S'][i]}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-3">
              {[
                { l: 'Protein', v: 80, txt: '145g / 180g', c: 'bg-slate-800' },
                { l: 'Carbs', v: 84, txt: '210g / 250g', c: 'bg-primary' },
                { l: 'Fats', v: 85, txt: '55g / 65g', c: 'bg-primary/40' }
              ].map((m, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="font-medium text-slate-700">{m.l}</span>
                    <span className="text-gray-500">{m.txt}</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${m.c}`} style={{width: `${m.v}%`}}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="pt-4 pb-28 px-4">
          <h3 className="text-slate-900 text-lg font-bold tracking-tight mb-4 pl-1">Health Journey</h3>
          <div className="relative bg-white rounded-2xl p-5 border border-slate-100 shadow-sm overflow-hidden">
            <div className="absolute left-[34px] top-5 bottom-5 w-[2px] bg-slate-100 z-0"></div>
            <div className="relative z-10 flex flex-col gap-6">
              {[
                { title: 'Initial Assessment', date: 'Jan 10', sub: 'Metabolic baseline established.', status: 'done' },
                { title: 'Sugar Detox Challenge', date: 'Feb 15', sub: '2 weeks of zero refined sugar.', status: 'done' },
                { title: 'Consistency Milestone', date: 'Current', sub: 'Hit 30 day streak of logging.', status: 'current' },
                { title: 'Marathon Prep', date: 'Locked', sub: 'Unlocks at Level 5.', status: 'locked' },
              ].map((item, i) => (
                <div key={i} className={`flex gap-4 group ${item.status === 'locked' ? 'opacity-50' : ''}`}>
                  <div className="flex flex-col items-center">
                    <div className={`flex size-8 items-center justify-center rounded-full shadow-md ring-4 ring-white z-10 ${item.status === 'done' ? 'bg-primary text-white' : item.status === 'current' ? 'bg-white border-2 border-primary text-primary' : 'bg-slate-100 text-slate-400'}`}>
                      <span className={`material-symbols-outlined text-[18px] ${item.status === 'done' ? 'font-bold' : item.status === 'current' ? 'animate-pulse' : ''}`}>{item.status === 'done' ? 'check' : item.status === 'current' ? 'directions_run' : 'lock'}</span>
                    </div>
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="flex justify-between items-start">
                      <h4 className="text-sm font-semibold text-slate-900">{item.title}</h4>
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${item.status === 'current' ? 'text-primary bg-primary/10 font-bold' : 'text-slate-400 bg-slate-100'}`}>{item.date}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <BottomNav />
      </div>
    </div>
  );
};

export default Profile;