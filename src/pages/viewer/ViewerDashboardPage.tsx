import { Activity, Trophy, Users, Calendar } from 'lucide-react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import { matches, tournaments, teams } from '../../lib/mockData';
import { formatDate } from '../../lib/utils';

export default function ViewerDashboardPage() {
  const liveMatches = matches.filter((m) => m.status === 'live');
  const upcomingMatches = matches.filter((m) => m.status === 'scheduled').slice(0, 3);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Welcome to SKPT Cricket</p>
      </div>

      {/* Live Matches */}
      {liveMatches.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Activity className="w-5 h-5 text-red-500" />
            Live Now
          </h2>
          <div className="space-y-3">
            {liveMatches.map((match) => (
              <Card key={match.id} hover className="p-4 border-l-4 border-l-red-500">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <Badge variant="live">LIVE</Badge>
                    <p className="font-semibold text-gray-900 mt-1 truncate">
                      {match.team1Name} vs {match.team2Name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">{match.venue}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-lg font-bold text-gray-900">87/2</p>
                    <p className="text-xs text-gray-500">10.3 overs</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Matches */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary-500" />
          Upcoming
        </h2>
        <div className="space-y-3">
          {upcomingMatches.map((match) => (
            <Card key={match.id} hover className="p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-gray-900">
                    {match.team1ShortName} vs {match.team2ShortName}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5 truncate">{match.venue}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-medium text-gray-900">{formatDate(match.matchDate)}</p>
                  <Badge variant="info">Scheduled</Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="p-4 text-center">
          <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center mx-auto mb-2">
            <Trophy className="w-5 h-5 text-primary-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{tournaments.length}</p>
          <p className="text-xs text-gray-500">Tournaments</p>
        </Card>
        <Card className="p-4 text-center">
          <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center mx-auto mb-2">
            <Users className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{teams.length}</p>
          <p className="text-xs text-gray-500">Teams</p>
        </Card>
        <Card className="p-4 text-center">
          <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center mx-auto mb-2">
            <Calendar className="w-5 h-5 text-amber-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{matches.length}</p>
          <p className="text-xs text-gray-500">Matches</p>
        </Card>
      </div>
    </div>
  );
}
