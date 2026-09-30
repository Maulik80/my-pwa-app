export type TournamentFormat = 'T20' | 'T10' | 'ODI' | 'Test';
export type TournamentStatus = 'upcoming' | 'ongoing' | 'completed';

export interface Tournament {
  id: string;
  name: string;
  format: TournamentFormat;
  startDate: string;
  endDate: string;
  status: TournamentStatus;
  logo?: string;
  description?: string;
  totalTeams: number;
  totalMatches: number;
}
