import { Activity } from 'lucide-react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import EmptyState from '../../components/ui/EmptyState';
import { matches } from '../../lib/mockData';

export default function LiveMatchesPage() {
  const liveMatches = matches.filter((m) => m.status === 'live');

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Live Matches</h1>
        <p className="text-sm text-gray-500 mt-1">Real-time score updates</p>
      </div>

      {liveMatches.length === 0 ? (
        <EmptyState
          icon={Activity}
          title="No live matches"
          description="There are no matches being played right now"
        />
      ) : (
        <div className="space-y-3">
          {liveMatches.map((match) => (
            <Card key={match.id} hover className="p-4 border-l-4 border-l-red-500">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="live">LIVE</Badge>
                <span className="text-xs text-gray-500">{match.venue}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-gray-900 truncate">
                    {match.team1Name} vs {match.team2Name}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">{match.totalOvers} Overs</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-2xl font-bold text-gray-900">87/2</p>
                  <p className="text-xs text-gray-500">10.3 overs • CRR: 8.32</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
