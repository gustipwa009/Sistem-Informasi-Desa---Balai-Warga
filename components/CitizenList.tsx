import React, { useState } from 'react';
import { Citizen } from '../types';
import { Search, Filter, Plus, MoreHorizontal } from 'lucide-react';

const MOCK_CITIZENS: Citizen[] = [
  { id: '1', nik: '3302150101850001', name: 'Budi Santoso', gender: 'Laki-laki', rt: '01', rw: '01', status: 'Tetap', job: 'Petani' },
  { id: '2', nik: '3302150505900002', name: 'Siti Aminah', gender: 'Perempuan', rt: '01', rw: '01', status: 'Tetap', job: 'Guru' },
  { id: '3', nik: '3302151212950003', name: 'Joko Widodo', gender: 'Laki-laki', rt: '02', rw: '01', status: 'Kontrak', job: 'Wiraswasta' },
  { id: '4', nik: '3302152002880004', name: 'Rina Wati', gender: 'Perempuan', rt: '02', rw: '01', status: 'Sementara', job: 'Mahasiswa' },
  { id: '5', nik: '3302151010800005', name: 'Slamet Rahardjo', gender: 'Laki-laki', rt: '03', rw: '02', status: 'Tetap', job: 'PNS' },
  { id: '6', nik: '3302151506920006', name: 'Dewi Sartika', gender: 'Perempuan', rt: '03', rw: '02', status: 'Tetap', job: 'Ibu Rumah Tangga' },
];

const CitizenList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRt, setFilterRt] = useState('All');

  const filteredCitizens = MOCK_CITIZENS.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.nik.includes(searchTerm);
    const matchesRt = filterRt === 'All' || c.rt === filterRt;
    return matchesSearch && matchesRt;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header & Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-2">
        <div>
          <h2 className="text-3xl font-serif font-bold text-slate-800">Data Warga</h2>
          <p className="text-slate-500 mt-1">Kelola database kependudukan desa terpadu.</p>
        </div>
        <button className="bg-pendopo-600 hover:bg-pendopo-700 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-lg shadow-pendopo-600/30 transition-all hover:translate-y-[-1px]">
          <Plus size={18} />
          <span className="font-medium">Tambah Warga</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="glass-panel p-2 rounded-2xl flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text"
            placeholder="Cari nama atau NIK..."
            className="w-full pl-11 pr-4 py-3 bg-white/50 border-none rounded-xl focus:ring-2 focus:ring-pendopo-200 focus:bg-white transition-all text-slate-700 placeholder-slate-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative min-w-[150px]">
          <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
          <select 
            className="w-full pl-11 pr-8 py-3 bg-white/50 border-none rounded-xl focus:ring-2 focus:ring-pendopo-200 focus:bg-white appearance-none text-slate-700 cursor-pointer"
            value={filterRt}
            onChange={(e) => setFilterRt(e.target.value)}
          >
            <option value="All">Semua RT</option>
            <option value="01">RT 01</option>
            <option value="02">RT 02</option>
            <option value="03">RT 03</option>
          </select>
        </div>
      </div>

      {/* Modern Table */}
      <div className="glass-panel rounded-3xl overflow-hidden border border-slate-200/60 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-100">
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Nama Lengkap</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">NIK</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">L/P</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Domisili</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Pekerjaan</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCitizens.length > 0 ? (
                filteredCitizens.map((citizen) => (
                  <tr key={citizen.id} className="hover:bg-blue-50/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-800">{citizen.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-mono text-sm text-slate-500 bg-slate-100 px-2 py-1 rounded-md w-fit">{citizen.nik}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{citizen.gender === 'Laki-laki' ? 'L' : 'P'}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      <span className="inline-flex items-center gap-1">
                        RT {citizen.rt} <span className="text-slate-300">•</span> RW {citizen.rw}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 text-xs font-bold rounded-full border 
                        ${citizen.status === 'Tetap' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                          citizen.status === 'Kontrak' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-slate-50 text-slate-600 border-slate-100'}`}>
                        {citizen.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{citizen.job}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-slate-400 hover:text-pendopo-600 hover:bg-pendopo-50 p-2 rounded-lg transition-colors">
                        <MoreHorizontal size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center text-slate-400">
                      <Search size={32} className="mb-2 opacity-50" />
                      <p>Tidak ditemukan data warga yang sesuai.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CitizenList;