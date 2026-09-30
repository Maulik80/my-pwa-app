export const APP_NAME = 'SKPT Cricket';
export const APP_VERSION = '1.0.0';

export const DEMO_CREDENTIALS = {
  superAdmin: {
    email: 'admin@skpt.com',
    password: 'admin123',
    name: 'Super Admin',
    role: 'super_admin' as const,
  },
  admin: {
    email: 'scorer@skpt.com',
    password: 'scorer123',
    name: 'Match Admin',
    role: 'admin' as const,
  },
};

export const MATCH_STATUS_LABELS = {
  scheduled: 'Scheduled',
  live: 'Live',
  completed: 'Completed',
  abandoned: 'Abandoned',
} as const;

export const TOURNAMENT_STATUS_LABELS = {
  upcoming: 'Upcoming',
  ongoing: 'Ongoing',
  completed: 'Completed',
} as const;

export const PLAYER_ROLES = {
  batsman: 'Batsman',
  bowler: 'Bowler',
  'all-rounder': 'All-Rounder',
  'wicket-keeper': 'Wicket-Keeper',
} as const;

export const WICKET_TYPES = {
  bowled: 'Bowled',
  caught: 'Caught',
  lbw: 'LBW',
  run_out: 'Run Out',
  stumped: 'Stumped',
  hit_wicket: 'Hit Wicket',
} as const;
