import React, { useState } from 'react';
import { generateLetterDraft } from '../services/geminiService';
import { Loader2, Send, Download, RefreshCw, FileText, ChevronRight } from 'lucide-react';

const LetterGenerator: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    nik: '',
    type: 'Surat Pengantar',
    purpose: '',
  });
  const [generatedLetter, setGeneratedLetter] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const result = await generateLetterDraft(
      formData.type,
      formData.name,
      formData.nik,
      formData.purpose
    );
    setGeneratedLetter(result);
    setIsLoading(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[calc(100vh-8rem)]">
      {/* Form Section - Takes up 5 columns */}
      <div className="lg:col-span-5 flex flex-col h-full space-y-6">
        <div>
          <h2 className="text-3xl font-serif font-bold text-slate-800">Layanan Surat</h2>
          <p className="text-slate-500 mt-1">Asisten AI untuk pembuatan dokumen administratif.</p>
        </div>

        <div className="glass-panel p-6 rounded-3xl flex-1 overflow-y-auto">
          <form onSubmit={handleGenerate} className="space-y-5">
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">Jenis Layanan</label>
              <div className="relative">
                <select
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-pendopo-400 focus:outline-none focus:bg-white transition-colors appearance-none text-slate-700 font-medium"
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                >
                  <option value="Surat Pengantar">Surat Pengantar</option>
                  <option value="Surat Keterangan Domisili">Surat Keterangan Domisili</option>
                  <option value="Surat Keterangan Tidak Mampu (SKTM)">Surat Keterangan Tidak Mampu (SKTM)</option>
                  <option value="Surat Keterangan Usaha">Surat Keterangan Usaha</option>
                  <option value="Surat Kematian">Surat Kematian</option>
                </select>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-slate-400">
                  <ChevronRight size={16} className="rotate-90" />
                </div>
              </div>
            </div>

            <div className="space-y-1">
               <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">Identitas Pemohon</label>
               <input
                type="text"
                required
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-pendopo-400 focus:outline-none focus:bg-white transition-colors placeholder-slate-400"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Nama Lengkap"
              />
            </div>

            <div className="space-y-1">
              <input
                type="number"
                required
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-pendopo-400 focus:outline-none focus:bg-white transition-colors placeholder-slate-400"
                value={formData.nik}
                onChange={(e) => setFormData({...formData, nik: e.target.value})}
                placeholder="Nomor Induk Kependudukan (NIK)"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">Detail Keperluan</label>
              <textarea
                required
                rows={4}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-pendopo-400 focus:outline-none focus:bg-white transition-colors placeholder-slate-400 resize-none"
                value={formData.purpose}
                onChange={(e) => setFormData({...formData, purpose: e.target.value})}
                placeholder="Jelaskan keperluan surat ini secara spesifik..."
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-pendopo-600 hover:bg-pendopo-700 text-white font-bold py-4 rounded-xl flex justify-center items-center gap-3 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-pendopo-600/20 hover:shadow-xl hover:-translate-y-0.5 mt-4"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : <Send size={20} />}
              {isLoading ? 'Sedang Memproses...' : 'Generate Surat'}
            </button>
          </form>
        </div>
      </div>

      {/* Preview Section - Takes up 7 columns */}
      <div className="lg:col-span-7 flex flex-col h-full">
        <div className="flex justify-between items-center mb-6 pl-2">
          <h3 className="font-serif font-bold text-xl text-slate-800">Preview Dokumen</h3>
          {generatedLetter && (
            <div className="flex gap-2 bg-white p-1 rounded-xl border border-slate-200">
               <button 
                onClick={() => setGeneratedLetter('')}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                title="Reset"
              >
                <RefreshCw size={20} />
              </button>
              <div className="w-px bg-slate-200 my-1"></div>
              <button 
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                onClick={() => alert("Fitur cetak PDF akan segera hadir!")}
              >
                <Download size={16} />
                Unduh PDF
              </button>
            </div>
          )}
        </div>
        
        <div className="flex-1 bg-white p-8 md:p-12 rounded-3xl shadow-lg border border-slate-200/60 overflow-hidden relative">
           {/* Paper texture/look */}
           <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-b from-black/5 to-transparent"></div>
           
          {generatedLetter ? (
             <textarea 
                className="w-full h-full resize-none outline-none text-slate-800 font-serif leading-relaxed text-lg bg-transparent border-none focus:ring-0 p-0"
                value={generatedLetter}
                onChange={(e) => setGeneratedLetter(e.target.value)}
                spellCheck={false}
             />
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-300 space-y-6 border-2 border-dashed border-slate-100 rounded-2xl bg-slate-50/50">
              <div className="p-6 bg-white rounded-full shadow-sm">
                <FileText className="w-12 h-12 text-slate-200" />
              </div>
              <div className="text-center max-w-sm px-6">
                <h4 className="font-bold text-slate-500 mb-2">Belum ada dokumen</h4>
                <p className="text-sm">
                  Isi formulir di sebelah kiri untuk menghasilkan draft surat otomatis dengan bantuan AI.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LetterGenerator;