import { UserPlus } from 'lucide-react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Avatar from '../../components/ui/Avatar';
import { matches } from '../../lib/mockData';

const scorers = [
  { id: '1', name: 'Match Admin', email: 'scorer@skpt.com' },
  { id: '2', name: 'John Doe', email: 'john@skpt.com' },
  { id: '3', name: 'Jane Smith', email: 'jane@skpt.com' },
];

export default function AssignScorerPage() {
  const scheduledMatches = matches.filter((m) => m.status === 'scheduled');

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Assign Scorer</h1>
        <p className="text-sm text-gray-500 mt-1">Assign scorers to upcoming matches</p>
      </div>

      <div className="space-y-4">
        {scheduledMatches.map((match) => (
          <Card key={match.id} className="p-4">
            <div className="flex items-center justify-between mb-4 gap-3">
              <div className="min-w-0">
                <p className="font-semibold text-gray-900">
                  {match.team1ShortName} vs {match.team2ShortName}
                </p>
                <p className="text-xs text-gray-500 truncate">{match.venue}</p>
              </div>
              <Badge variant="info" className="shrink-0">Scheduled</Badge>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-medium text-gray-500">Select Scorer:</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {scorers.map((scorer) => (
                  <button
                    key={scorer.id}
                    className="flex items-center gap-2 p-2.5 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-all text-left"
                  >
                    <Avatar name={scorer.name} size="sm" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{scorer.name}</p>
                      <p className="text-xs text-gray-500 truncate">{scorer.email}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <Button size="sm" icon={<UserPlus className="w-4 h-4" />}>
                Assign Scorer
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
