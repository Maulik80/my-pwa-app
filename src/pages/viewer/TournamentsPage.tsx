import { Trophy } from 'lucide-react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import EmptyState from '../../components/ui/EmptyState';
import { tournaments } from '../../lib/mockData';
import { formatDate } from '../../lib/utils';

export default function TournamentsPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Tournaments</h1>
        <p className="text-sm text-gray-500 mt-1">Browse all tournaments</p>
      </div>

      {tournaments.length === 0 ? (
        <EmptyState
          icon={Trophy}
          title="No tournaments"
          description="No tournaments available at the moment"
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {tournaments.map((tournament) => (
            <Card key={tournament.id} hover className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-primary-600" />
                </div>
                <Badge
                  variant={
                    tournament.status === 'ongoing'
                      ? 'live'
                      : tournament.status === 'upcoming'
                      ? 'info'
                      : 'default'
                  }
                >
                  {tournament.status.charAt(0).toUpperCase() + tournament.status.slice(1)}
                </Badge>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{tournament.name}</h3>
              <p className="text-sm text-gray-500 mb-3 line-clamp-2">{tournament.description}</p>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span className="px-2 py-0.5 bg-gray-100 rounded">{tournament.format}</span>
                <span>{tournament.totalTeams} Teams</span>
                <span>{tournament.totalMatches} Matches</span>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100">
                <span className="text-xs text-gray-500">
                  {formatDate(tournament.startDate)} - {formatDate(tournament.endDate)}
                </span>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
