export type MatchStatus = 'scheduled' | 'live' | 'completed' | 'abandoned';

export interface Match {
  id: string;
  tournamentId: string;
  team1Id: string;
  team2Id: string;
  team1Name: string;
  team2Name: string;
  team1ShortName: string;
  team2ShortName: string;
  venue: string;
  matchDate: string;
  status: MatchStatus;
  tossWinner?: string;
  tossDecision?: 'bat' | 'bowl';
  totalOvers: number;
  scorerId?: string;
  scorerName?: string;
  result?: string;
  innings?: Innings[];
}

export interface Innings {
  id: string;
  matchId: string;
  battingTeamId: string;
  bowlingTeamId: string;
  battingTeamName: string;
  bowlingTeamName: string;
  inningsNumber: number;
  totalRuns: number;
  totalWickets: number;
  totalOvers: number;
  totalBalls: number;
  extras: {
    wides: number;
    noBalls: number;
    byes: number;
    legByes: number;
  };
  currentBatsman1?: string;
  currentBatsman2?: string;
  currentBowler?: string;
  isCompleted: boolean;
  balls: Ball[];
}

export interface Ball {
  id: string;
  inningsId: string;
  overNumber: number;
  ballNumber: number;
  batsmanName: string;
  bowlerName: string;
  runs: number;
  isWicket: boolean;
  wicketType?: 'bowled' | 'caught' | 'lbw' | 'run_out' | 'stumped' | 'hit_wicket';
  isWide: boolean;
  isNoBall: boolean;
  isBye: boolean;
  isLegBye: boolean;
}
