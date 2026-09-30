import Card from '../../components/ui/Card';
import { pointsTable } from '../../lib/mockData';

export default function PointsTablePage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Points Table</h1>
        <p className="text-sm text-gray-500 mt-1">SKPT Premier League 2026</p>
      </div>

      <Card padding="none" className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left text-xs text-gray-500">
                <th className="px-4 py-3 font-medium">#</th>
                <th className="px-4 py-3 font-medium">Team</th>
                <th className="px-4 py-3 font-medium text-center">P</th>
                <th className="px-4 py-3 font-medium text-center">W</th>
                <th className="px-4 py-3 font-medium text-center">L</th>
                <th className="px-4 py-3 font-medium text-center">Pts</th>
                <th className="px-4 py-3 font-medium text-right">NRR</th>
              </tr>
            </thead>
            <tbody>
              {pointsTable.map((entry, index) => (
                <tr
                  key={entry.teamId}
                  className="border-t border-gray-50 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-3 text-gray-500">{index + 1}</td>
                  <td className="px-4 py-3">
                    <span className="font-medium text-gray-900">{entry.teamShortName}</span>
                  </td>
                  <td className="px-4 py-3 text-center text-gray-600">{entry.played}</td>
                  <td className="px-4 py-3 text-center text-green-600">{entry.won}</td>
                  <td className="px-4 py-3 text-center text-red-600">{entry.lost}</td>
                  <td className="px-4 py-3 text-center font-bold text-gray-900">{entry.points}</td>
                  <td className="px-4 py-3 text-right text-gray-600">{entry.netRunRate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
