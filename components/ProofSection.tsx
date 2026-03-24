import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const wasteData = [
  { month: 'Jan', waste: 120 },
  { month: 'Feb', waste: 100 },
  { month: 'Mar', waste: 80 },
  { month: 'Apr', waste: 60 },
  { month: 'May', waste: 40 },
  { month: 'Jun', waste: 20 },
];

const timeData = [
  { activity: 'Meal Prep', hours: 3.5 },
  { activity: 'Grocery', hours: 2.0 },
  { activity: 'Cooking', hours: 4.0 },
  { activity: 'Cleanup', hours: 1.5 },
];

const macroData = [
  { name: 'Protein', value: 30, color: '#0ea5e9' },
  { name: 'Carbs', value: 40, color: '#f97316' },
  { name: 'Fats', value: 20, color: '#10b981' },
  { name: 'Fiber', value: 10, color: '#8b5cf6' },
];

const ProofSection: React.FC = () => {
  return (
    <section id="proof" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-teal to-brand-primary mb-6">The Data Behind the Magic</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Our AI doesn't just guess. It optimizes for health, time, and sustainability. See the real-world impact of intelligent recipe generation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Chart 1: Food Waste */}
          <div className="bg-white/50 backdrop-blur-lg p-6 rounded-3xl h-80 flex flex-col shadow-xl border border-white/50">
            <h3 className="text-lg font-bold text-slate-800 mb-4 text-center">Household Food Waste (lbs)</h3>
            <div className="flex-grow">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={wasteData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorWaste" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                  />
                  <Area type="monotone" dataKey="waste" stroke="#0ea5e9" strokeWidth={3} fillOpacity={1} fill="url(#colorWaste)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Time Saved */}
          <div className="bg-white/50 backdrop-blur-lg p-6 rounded-3xl h-80 flex flex-col shadow-xl border border-white/50">
            <h3 className="text-lg font-bold text-slate-800 mb-4 text-center">Hours Saved per Week</h3>
            <div className="flex-grow">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={timeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="activity" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <Tooltip 
                    cursor={{ fill: '#f1f5f9' }}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                  />
                  <Bar dataKey="hours" radius={[6, 6, 0, 0]}>
                    {timeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={['#f97316', '#0ea5e9', '#10b981', '#8b5cf6'][index % 4]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 3: Nutritional Balance */}
          <div className="bg-white/50 backdrop-blur-lg p-6 rounded-3xl h-80 flex flex-col shadow-xl border border-white/50">
            <h3 className="text-lg font-bold text-slate-800 mb-4 text-center">Optimal Macro Distribution</h3>
            <div className="flex-grow relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={macroData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {macroData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-2xl font-bold text-slate-800">100%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProofSection;
