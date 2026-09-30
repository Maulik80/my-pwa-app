import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import { matches } from '../../lib/mockData';

export default function MatchDetailsPage() {
  const navigate = useNavigate();
  const match = matches[0];

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <Card className="p-4">
        <div className="text-center mb-4">
          <Badge variant="live">LIVE</Badge>
          <h1 className="text-xl font-bold text-gray-900 mt-2">
            {match.team1Name} vs {match.team2Name}
          </h1>
          <p className="text-sm text-gray-500">{match.venue}</p>
        </div>

        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-4 text-white text-center">
          <p className="text-4xl font-bold">87/2</p>
          <p className="text-primary-200">10.3 overs • CRR: 8.32</p>
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="font-semibold text-gray-900 mb-3">Batting</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Rohit Sharma</p>
              <p className="text-xs text-gray-500">32 (24) • 4x4 2x6</p>
            </div>
            <p className="font-bold text-gray-900">32</p>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Suryakumar Yadav</p>
              <p className="text-xs text-gray-500">28 (18) • 3x4 1x6</p>
            </div>
            <p className="font-bold text-gray-900">28</p>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="font-semibold text-gray-900 mb-3">Bowling</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Axar Patel</p>
              <p className="text-xs text-gray-500">2.3-0-18-1</p>
            </div>
            <p className="text-sm text-gray-600">Economy: 7.20</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
