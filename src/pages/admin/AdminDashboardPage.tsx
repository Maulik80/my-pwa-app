import { Calendar, Activity, Clock } from 'lucide-react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import { matches } from '../../lib/mockData';
import { formatDate } from '../../lib/utils';

export default function AdminDashboardPage() {
  const assignedMatches = matches.filter((m) => m.scorerId === 'a1');
  const liveMatches = assignedMatches.filter((m) => m.status === 'live');
  const upcomingMatches = assignedMatches.filter((m) => m.status === 'scheduled');

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Welcome back, Match Admin</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="p-4 text-center">
          <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center mx-auto mb-2">
            <Activity className="w-5 h-5 text-red-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{liveMatches.length}</p>
          <p className="text-xs text-gray-500">Live</p>
        </Card>
        <Card className="p-4 text-center">
          <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center mx-auto mb-2">
            <Clock className="w-5 h-5 text-amber-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{upcomingMatches.length}</p>
          <p className="text-xs text-gray-500">Upcoming</p>
        </Card>
        <Card className="p-4 text-center">
          <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center mx-auto mb-2">
            <Calendar className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{assignedMatches.length}</p>
          <p className="text-xs text-gray-500">Total</p>
        </Card>
      </div>

      {/* Assigned Matches */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Assigned Matches</h2>
        <div className="space-y-3">
          {assignedMatches.map((match) => (
            <Card key={match.id} hover className="p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge
                      variant={
                        match.status === 'live'
                          ? 'live'
                          : match.status === 'completed'
                          ? 'success'
                          : 'info'
                      }
                    >
                      {match.status === 'live' ? 'LIVE' : match.status.charAt(0).toUpperCase() + match.status.slice(1)}
                    </Badge>
                  </div>
                  <p className="font-semibold text-gray-900 truncate">
                    {match.team1Name} vs {match.team2Name}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5 truncate">
                    {formatDate(match.matchDate)} • {match.venue}
                  </p>
                </div>
                {match.status === 'live' && (
                  <div className="text-right shrink-0">
                    <p className="text-lg font-bold text-gray-900">87/2</p>
                    <p className="text-xs text-gray-500">10.3 overs</p>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
