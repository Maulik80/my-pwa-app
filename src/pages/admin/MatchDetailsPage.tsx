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
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-gray-500 border-b border-gray-100">
                <th className="pb-2 font-medium">Batsman</th>
                <th className="pb-2 text-right font-medium">R</th>
                <th className="pb-2 text-right font-medium">B</th>
                <th className="pb-2 text-right font-medium">4s</th>
                <th className="pb-2 text-right font-medium">6s</th>
                <th className="pb-2 text-right font-medium">SR</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-50">
                <td className="py-2.5 font-medium text-gray-900">Rohit Sharma</td>
                <td className="py-2.5 text-right font-bold text-gray-900">32</td>
                <td className="py-2.5 text-right text-gray-600">24</td>
                <td className="py-2.5 text-right text-gray-600">4</td>
                <td className="py-2.5 text-right text-gray-600">2</td>
                <td className="py-2.5 text-right text-gray-600">133.33</td>
              </tr>
              <tr>
                <td className="py-2.5 font-medium text-gray-900">Suryakumar Yadav</td>
                <td className="py-2.5 text-right font-bold text-gray-900">28</td>
                <td className="py-2.5 text-right text-gray-600">18</td>
                <td className="py-2.5 text-right text-gray-600">3</td>
                <td className="py-2.5 text-right text-gray-600">1</td>
                <td className="py-2.5 text-right text-gray-600">155.56</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="font-semibold text-gray-900 mb-3">Bowling</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-gray-500 border-b border-gray-100">
                <th className="pb-2 font-medium">Bowler</th>
                <th className="pb-2 text-right font-medium">O</th>
                <th className="pb-2 text-right font-medium">R</th>
                <th className="pb-2 text-right font-medium">W</th>
                <th className="pb-2 text-right font-medium">Econ</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2.5 font-medium text-gray-900">Axar Patel</td>
                <td className="py-2.5 text-right text-gray-600">2.3</td>
                <td className="py-2.5 text-right text-gray-600">18</td>
                <td className="py-2.5 text-right font-bold text-gray-900">1</td>
                <td className="py-2.5 text-right text-gray-600">7.20</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
