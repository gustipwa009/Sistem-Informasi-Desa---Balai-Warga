import React from 'react';
import { ViewState } from '../types';
import { Home, Users, FileText, Bell, LogOut } from 'lucide-react';

interface SidebarProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
  isOpen: boolean;
  onCloseMobile: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView, isOpen, onCloseMobile }) => {
  const menuItems = [
    { id: ViewState.DASHBOARD, label: 'Beranda', icon: <Home size={20} /> },
    { id: ViewState.CITIZENS, label: 'Data Warga', icon: <Users size={20} /> },
    { id: ViewState.LETTERS, label: 'Layanan Surat', icon: <FileText size={20} /> },
    { id: ViewState.ANNOUNCEMENTS, label: 'Pengumuman', icon: <Bell size={20} /> },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-30 bg-slate-900/60 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`
          fixed inset-y-0 left-0 z-40 w-72 bg-[#1e1b1a] text-slate-300 shadow-2xl transform transition-transform duration-300 ease-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:relative lg:translate-x-0 border-r border-white/5
        `}
      >
        <div className="flex flex-col h-full p-4">
          {/* Logo Area */}
          <div className="px-4 py-6 mb-6 flex items-center space-x-4">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg shadow-pendopo-900/50 overflow-hidden">
               {/* Icon Gambar Balai Desa / Logo */}
              <img 
                src="https://cdn-icons-png.flaticon.com/512/1909/1909693.png" 
                alt="Logo Desa" 
                className="w-8 h-8 object-contain"
              />
            </div>
            <div>
              <h1 className="font-serif font-bold text-xl text-white tracking-wide">Balai Desa</h1>
              <p className="text-xs text-slate-400 font-medium tracking-wider uppercase">Sistem Terpadu</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1">
            {menuItems.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onChangeView(item.id);
                    onCloseMobile();
                  }}
                  className={`
                    w-full flex items-center space-x-3 px-4 py-3.5 rounded-2xl transition-all duration-200 group
                    ${isActive 
                      ? 'bg-pendopo-600 text-white shadow-md shadow-pendopo-900/30 translate-x-1' 
                      : 'hover:bg-white/5 hover:text-white hover:translate-x-1'}
                  `}
                >
                  <span className={`${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white transition-colors'}`}>
                    {item.icon}
                  </span>
                  <span className="font-medium text-sm">{item.label}</span>
                  {isActive && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* User Profile & Footer */}
          <div className="mt-auto pt-4 border-t border-white/10">
            {/* User Profile Card */}
            <div className="flex items-center gap-3 px-4 py-3 mb-4 rounded-2xl bg-white/5 border border-white/5 mx-2">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Pak Carik"
                className="w-10 h-10 rounded-full border-2 border-pendopo-500"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white truncate">Bambang S.</p>
                <p className="text-xs text-slate-400 truncate">Sekretaris Desa</p>
              </div>
            </div>

            <button className="flex items-center space-x-3 text-slate-400 hover:text-red-400 hover:bg-red-500/10 w-full px-4 py-3 rounded-2xl transition-all mb-4 group">
              <LogOut size={20} className="group-hover:text-red-400" />
              <span className="font-medium text-sm">Keluar</span>
            </button>
            
            <div className="px-4 pb-2">
               <p className="text-xs text-slate-600 text-center">
                  &copy; 2024 Desa Makmur v2.1
               </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;