import { Trophy, Users, Calendar, Activity } from 'lucide-react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import { tournaments, teams, matches } from '../../lib/mockData';
import { formatDate } from '../../lib/utils';

const stats = [
  { label: 'Tournaments', value: tournaments.length, icon: Trophy, color: 'from-blue-500 to-blue-600' },
  { label: 'Teams', value: teams.length, icon: Users, color: 'from-green-500 to-green-600' },
  { label: 'Matches', value: matches.length, icon: Calendar, color: 'from-amber-500 to-amber-600' },
  { label: 'Live Now', value: matches.filter((m) => m.status === 'live').length, icon: Activity, color: 'from-red-500 to-red-600' },
];

export default function DashboardPage() {
  const liveMatches = matches.filter((m) => m.status === 'live');
  const upcomingMatches = matches.filter((m) => m.status === 'scheduled').slice(0, 3);
  const recentMatches = matches.filter((m) => m.status === 'completed').slice(0, 3);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Welcome back, Super Admin</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-sm`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Live Matches */}
      {liveMatches.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Live Matches</h2>
          <div className="space-y-3">
            {liveMatches.map((match) => (
              <Card key={match.id} hover className="p-4 border-l-4 border-l-red-500">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="live">LIVE</Badge>
                      <span className="text-xs text-gray-500 truncate">{match.venue}</span>
                    </div>
                    <p className="font-semibold text-gray-900 truncate">
                      {match.team1Name} vs {match.team2Name}
                    </p>
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-sm font-bold text-gray-900">{match.team1ShortName} 87/2</p>
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
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Upcoming Matches</h2>
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

      {/* Recent Results */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Recent Results</h2>
        <div className="space-y-3">
          {recentMatches.map((match) => (
            <Card key={match.id} hover className="p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-gray-900">
                    {match.team1ShortName} vs {match.team2ShortName}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5 truncate">{match.result}</p>
                </div>
                <Badge variant="success" className="shrink-0">Completed</Badge>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
