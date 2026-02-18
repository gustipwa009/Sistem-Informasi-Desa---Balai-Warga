import { GoogleGenAI } from "@google/genai";

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateLetterDraft = async (
  type: string,
  name: string,
  nik: string,
  purpose: string
): Promise<string> => {
  try {
    const prompt = `
      Bertindaklah sebagai sekretaris desa (Carik) profesional di Jawa.
      Buatkan draft surat resmi desa yang rapi dan sopan dalam Bahasa Indonesia.
      
      Detail Surat:
      - Jenis Surat: ${type}
      - Nama Warga: ${name}
      - NIK: ${nik}
      - Keperluan: ${purpose}
      - Tanggal: ${new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
      
      Struktur surat harus mencakup:
      1. KOP SURAT (Placeholder: PEMERINTAH DESA [NAMA DESA])
      2. Nomor Surat (Placeholder)
      3. Salam Pembuka (Dengan hormat)
      4. Isi surat yang menyatakan bahwa orang tersebut benar-benar warga desa dan keperluannya.
      5. Penutup
      6. Tempat dan Tanggal
      7. Tanda tangan Kepala Desa (Placeholder)

      Gunakan nada yang formal namun mengayomi.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "Gagal membuat draft surat.";
  } catch (error) {
    console.error("Error generating letter:", error);
    return "Terjadi kesalahan saat menghubungi layanan AI. Silakan coba lagi.";
  }
};

export const askVillageAssistant = async (query: string): Promise<string> => {
  try {
    const prompt = `
      Kamu adalah "Pak Carik", asisten virtual untuk sistem informasi desa.
      Karaktermu: Bijaksana, sopan, menjunjung tinggi adat Jawa, dan sangat paham administrasi desa.
      Gunakan Bahasa Indonesia yang baik, boleh diselingi sedikit istilah Bahasa Jawa halus (Krama Inggil) untuk sapaan agar terasa akrab.
      
      Pertanyaan user: "${query}"
      
      Jawablah dengan ringkas dan membantu.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "Maaf, saya tidak dapat memproses pertanyaan tersebut.";
  } catch (error) {
    console.error("Error AI assistant:", error);
    return "Maaf, Pak Carik sedang istirahat (Error koneksi).";
  }
};