import { Users } from 'lucide-react';
import Card from '../../components/ui/Card';
import EmptyState from '../../components/ui/EmptyState';
import { teams, players } from '../../lib/mockData';

export default function TeamsPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Teams</h1>
        <p className="text-sm text-gray-500 mt-1">Browse all teams</p>
      </div>

      {teams.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No teams"
          description="No teams available at the moment"
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {teams.map((team) => {
            const teamPlayers = players.filter((p) => p.teamId === team.id);
            return (
              <Card key={team.id} hover className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center">
                    <span className="text-primary-700 font-bold text-sm">{team.shortName}</span>
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">{team.name}</h3>
                    <p className="text-xs text-gray-500">{teamPlayers.length} Players</p>
                  </div>
                </div>
                {teamPlayers.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {teamPlayers.slice(0, 5).map((player) => (
                      <span
                        key={player.id}
                        className="px-2 py-0.5 bg-gray-100 rounded text-xs text-gray-600"
                      >
                        {player.name}
                      </span>
                    ))}
                    {teamPlayers.length > 5 && (
                      <span className="px-2 py-0.5 bg-gray-100 rounded text-xs text-gray-500">
                        +{teamPlayers.length - 5} more
                      </span>
                    )}
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
