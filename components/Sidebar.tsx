import React from 'react';
import { ViewState } from '../types';
import { Home, Users, FileText, Bell, LogOut, Mountain } from 'lucide-react';

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
          <div className="px-4 py-6 mb-6 flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-pendopo-500 to-pendopo-700 rounded-xl text-white flex items-center justify-center shadow-lg shadow-pendopo-900/50">
              <Mountain size={20} />
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

          {/* Footer */}
          <div className="mt-auto pt-6 border-t border-white/10">
            <button className="flex items-center space-x-3 text-slate-400 hover:text-white hover:bg-white/5 w-full px-4 py-3 rounded-2xl transition-all">
              <LogOut size={20} />
              <span className="font-medium text-sm">Keluar</span>
            </button>
            <div className="mt-6 px-4">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/5">
                <p className="text-xs text-slate-400 text-center leading-relaxed">
                  &copy; 2024 Desa Makmur<br/>
                  <span className="opacity-50">v2.0 Modern UI</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;