export interface BatsmanStats {
  id: string;
  name: string;
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
  strikeRate: number;
  isOut: boolean;
  dismissal?: string;
}

export interface BowlerStats {
  id: string;
  name: string;
  overs: number;
  balls: number;
  runs: number;
  wickets: number;
  economy: number;
  maidens: number;
}

export interface PointsTableEntry {
  teamId: string;
  teamName: string;
  teamShortName: string;
  played: number;
  won: number;
  lost: number;
  tied: number;
  noResult: number;
  points: number;
  netRunRate: number;
  runsFor: number;
  oversFor: number;
  runsAgainst: number;
  oversAgainst: number;
}
