import React, { useState } from 'react';
import { ViewState } from './types';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import CitizenList from './components/CitizenList';
import LetterGenerator from './components/LetterGenerator';
import AssistantChat from './components/AssistantChat';
import { Menu, Bell } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.DASHBOARD);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (currentView) {
      case ViewState.DASHBOARD:
        return <Dashboard />;
      case ViewState.CITIZENS:
        return <CitizenList />;
      case ViewState.LETTERS:
        return <LetterGenerator />;
      case ViewState.ANNOUNCEMENTS:
        return (
          <div className="flex flex-col items-center justify-center h-96 text-gray-400 glass-panel rounded-3xl">
            <div className="bg-pendopo-50 p-6 rounded-full mb-4">
              <Bell size={48} className="text-pendopo-400" />
            </div>
            <h2 className="text-xl font-serif font-bold text-gray-700">Belum ada pengumuman</h2>
            <p className="text-gray-500">Fitur ini akan segera tersedia untuk warga.</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="relative flex h-screen bg-slate-50 font-sans text-slate-800 overflow-hidden selection:bg-pendopo-200 selection:text-pendopo-900">
      
      {/* Modern Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-pendopo-200/40 rounded-full blur-[100px] opacity-60"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-sawah-200/40 rounded-full blur-[100px] opacity-60"></div>
      </div>

      {/* Sidebar Navigation */}
      <Sidebar 
        currentView={currentView} 
        onChangeView={setCurrentView}
        isOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Mobile Header */}
        <header className="lg:hidden bg-white/80 backdrop-blur-md border-b border-slate-200 p-4 flex items-center justify-between shadow-sm z-20 sticky top-0">
          <button 
            onClick={() => setIsMobileSidebarOpen(true)}
            className="text-slate-600 hover:bg-slate-100 p-2 rounded-xl transition-colors"
          >
            <Menu size={24} />
          </button>
          <span className="font-serif font-bold text-slate-800 text-lg">Balai Desa</span>
          <div className="w-8"></div> {/* Spacer */}
        </header>

        {/* Content Scrollable Area */}
        <main className="flex-1 overflow-y-auto scroll-smooth">
          <div className="p-4 md:p-8 max-w-7xl mx-auto">
             {renderContent()}
          </div>
        </main>
      </div>

      {/* Floating Assistant */}
      <AssistantChat />
    </div>
  );
};

export default App;