export interface Citizen {
  id: string;
  nik: string;
  name: string;
  gender: 'Laki-laki' | 'Perempuan';
  rt: string;
  rw: string;
  status: 'Tetap' | 'Kontrak' | 'Sementara';
  job: string;
}

export interface LetterRequest {
  type: string;
  citizenName: string;
  citizenNik: string;
  purpose: string;
  generatedContent?: string;
}

export enum ViewState {
  DASHBOARD = 'DASHBOARD',
  CITIZENS = 'CITIZENS',
  LETTERS = 'LETTERS',
  ANNOUNCEMENTS = 'ANNOUNCEMENTS',
}

export interface VillageStats {
  totalCitizens: number;
  totalKK: number;
  maleCount: number;
  femaleCount: number;
}
