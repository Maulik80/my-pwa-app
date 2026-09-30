import { Plus, Calendar } from 'lucide-react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import EmptyState from '../../components/ui/EmptyState';
import { matches } from '../../lib/mockData';
import { formatDate } from '../../lib/utils';

export default function MatchesPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Matches</h1>
          <p className="text-sm text-gray-500 mt-1">Manage all matches</p>
        </div>
        <Button icon={<Plus className="w-4 h-4" />}>Create</Button>
      </div>

      {matches.length === 0 ? (
        <EmptyState
          icon={Calendar}
          title="No matches yet"
          description="Create your first match to get started"
        />
      ) : (
        <div className="space-y-3">
          {matches.map((match) => (
            <Card key={match.id} hover className="p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge
                      variant={
                        match.status === 'live'
                          ? 'live'
                          : match.status === 'completed'
                          ? 'success'
                          : match.status === 'scheduled'
                          ? 'info'
                          : 'default'
                      }
                    >
                      {match.status === 'live' ? 'LIVE' : match.status.charAt(0).toUpperCase() + match.status.slice(1)}
                    </Badge>
                    <span className="text-xs text-gray-500 truncate">{match.venue}</span>
                  </div>
                  <p className="font-semibold text-gray-900 truncate">
                    {match.team1Name} vs {match.team2Name}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {formatDate(match.matchDate)} • {match.totalOvers} Overs
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {match.status === 'live' && (
                    <div className="text-right mr-2">
                      <p className="text-sm font-bold text-gray-900">87/2</p>
                      <p className="text-xs text-gray-500">10.3 ov</p>
                    </div>
                  )}
                  <Button variant="ghost" size="sm">View</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
