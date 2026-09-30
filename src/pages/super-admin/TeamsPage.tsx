import { Plus, Users } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import EmptyState from '../../components/ui/EmptyState';
import { teams, players } from '../../lib/mockData';

export default function TeamsPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Teams</h1>
          <p className="text-sm text-gray-500 mt-1">Manage all teams</p>
        </div>
        <Button icon={<Plus className="w-4 h-4" />}>Create</Button>
      </div>

      {teams.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No teams yet"
          description="Create your first team to get started"
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
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Tournament: SKPT Premier League</span>
                  <Button variant="ghost" size="sm">View</Button>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
