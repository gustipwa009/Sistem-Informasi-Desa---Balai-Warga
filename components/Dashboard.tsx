import React, { useEffect, useState } from 'react';
import { Users, UserCheck, Home, ArrowUpRight, Sparkles } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { askVillageAssistant } from '../services/geminiService';

const Dashboard: React.FC = () => {
  const [wiseQuote, setWiseQuote] = useState<string>("Sedang mengambil petuah...");

  useEffect(() => {
    const fetchQuote = async () => {
      const quote = await askVillageAssistant("Berikan satu kalimat pepatah jawa singkat beserta artinya tentang kerukunan atau kepemimpinan untuk ditampilkan di dashboard.");
      setWiseQuote(quote);
    };
    fetchQuote();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const populationData = [
    { name: 'RT 01', count: 120 },
    { name: 'RT 02', count: 98 },
    { name: 'RT 03', count: 145 },
    { name: 'RT 04', count: 110 },
    { name: 'RT 05', count: 85 },
  ];

  const pieData = [
    { name: 'Tetap', value: 400 },
    { name: 'Sementara', value: 158 },
  ];
  
  // Modern Palette
  const CHART_COLORS = ['#c5734e', '#94a3b8']; 

  return (
    <div className="space-y-8 animate-fade-in pb-10">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-pendopo-900 to-pendopo-800 rounded-3xl p-8 shadow-xl text-white">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h2 className="text-4xl font-serif font-bold mb-2">Sugeng Rawuh</h2>
            <p className="text-pendopo-100 text-lg opacity-90">Sistem Informasi Manajemen Desa Modern</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl max-w-lg">
            <div className="flex gap-3">
              <Sparkles className="w-5 h-5 text-pendopo-200 flex-shrink-0 mt-1" />
              <p className="text-sm italic font-light leading-relaxed">
                "{wiseQuote}"
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Warga', value: '558', sub: '+12 baru', icon: <Users />, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Kepala Keluarga', value: '180', sub: 'Terdaftar', icon: <Home />, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Warga Sementara', value: '45', sub: 'Perlu Update', icon: <UserCheck />, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Surat Keluar', value: '28', sub: 'Bulan ini', icon: <ArrowUpRight />, color: 'text-purple-600', bg: 'bg-purple-50' },
        ].map((stat, idx) => (
          <div key={idx} className="glass-panel p-6 rounded-3xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3.5 rounded-2xl ${stat.bg} ${stat.color}`}>
                {stat.icon}
              </div>
              <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${stat.bg} ${stat.color}`}>
                {stat.sub}
              </span>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-slate-800">{stat.value}</h3>
              <p className="text-sm font-medium text-slate-500 mt-1">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-3xl">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-serif font-bold text-xl text-slate-800">Kepadatan Penduduk</h3>
            <select className="text-sm border-none bg-slate-100 rounded-lg px-3 py-1 text-slate-600 focus:ring-0">
              <option>Per RT</option>
              <option>Per RW</option>
            </select>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={populationData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                />
                <Bar dataKey="count" fill="#c5734e" radius={[6, 6, 6, 6]} barSize={50} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Side Chart */}
        <div className="glass-panel p-6 rounded-3xl flex flex-col">
          <h3 className="font-serif font-bold text-xl text-slate-800 mb-2">Status Domisili</h3>
          <p className="text-sm text-slate-500 mb-8">Persentase warga tetap vs sementara</p>
          
          <div className="h-64 w-full flex-1 relative">
             <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                  cornerRadius={6}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                   contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
            {/* Center Text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <span className="block text-3xl font-bold text-slate-800">558</span>
                <span className="text-xs text-slate-500 uppercase tracking-wide">Total</span>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center gap-6 mt-6">
            {pieData.map((entry, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: CHART_COLORS[index] }}></div>
                <div className="flex flex-col">
                  <span className="text-xs text-slate-500 font-medium uppercase">{entry.name}</span>
                  <span className="text-sm font-bold text-slate-700">{entry.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;