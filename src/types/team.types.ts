export interface Team {
  id: string;
  name: string;
  shortName: string;
  logo?: string;
  tournamentId: string;
  players: Player[];
}

export interface Player {
  id: string;
  teamId: string;
  name: string;
  role: 'batsman' | 'bowler' | 'all-rounder' | 'wicket-keeper';
  jerseyNumber: number;
}
