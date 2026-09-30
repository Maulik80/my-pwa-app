import { useMemo } from 'react';
import { matches } from '../lib/mockData';

export function useLiveMatch(matchId: string) {
  const match = useMemo(() => matches.find((m) => m.id === matchId), [matchId]);
  const isLive = match?.status === 'live';

  return { match, isLive };
}
