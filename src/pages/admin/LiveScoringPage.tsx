import { Undo2, RotateCcw } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { useScoringStore } from '../../stores/useScoringStore';

export default function LiveScoringPage() {
  const { addBall, undoLastBall, currentOver } = useScoringStore();

  const handleRun = (runs: number) => {
    addBall({
      inningsId: 'inn1',
      overNumber: Math.floor(currentOver.length / 6) + 1,
      ballNumber: (currentOver.length % 6) + 1,
      batsmanName: 'Rohit Sharma',
      bowlerName: 'Axar Patel',
      runs,
      isWicket: false,
      isWide: false,
      isNoBall: false,
      isBye: false,
      isLegBye: false,
    });
  };

  const handleWicket = () => {
    addBall({
      inningsId: 'inn1',
      overNumber: Math.floor(currentOver.length / 6) + 1,
      ballNumber: (currentOver.length % 6) + 1,
      batsmanName: 'Rohit Sharma',
      bowlerName: 'Axar Patel',
      runs: 0,
      isWicket: true,
      wicketType: 'bowled',
      isWide: false,
      isNoBall: false,
      isBye: false,
      isLegBye: false,
    });
  };

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Live Scoring</h1>
          <p className="text-sm text-gray-500">MUM vs DEL • Wankhede Stadium</p>
        </div>
        <Badge variant="live">LIVE</Badge>
      </div>

      {/* Score Card */}
      <Card className="p-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white border-0">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-3xl font-bold">87/2</p>
            <p className="text-primary-200 text-sm">10.3 overs</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-primary-200">CRR: 8.32</p>
            <p className="text-sm text-primary-200">Target: 186</p>
          </div>
        </div>
      </Card>

      {/* Batsman Stats */}
      <Card className="p-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Batting</h3>
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

      {/* Bowler Stats */}
      <Card className="p-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Bowling</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Axar Patel</p>
              <p className="text-xs text-gray-500">2-0-18-1</p>
            </div>
            <p className="text-sm text-gray-600">Economy: 9.00</p>
          </div>
        </div>
      </Card>

      {/* Run Buttons */}
      <Card className="p-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Runs</h3>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {[0, 1, 2, 3, 4, 6].map((runs) => (
            <button
              key={runs}
              onClick={() => handleRun(runs)}
              className="py-3 rounded-xl bg-gray-100 hover:bg-primary-100 hover:text-primary-700 active:bg-primary-200 font-bold text-gray-900 transition-all"
            >
              {runs}
            </button>
          ))}
        </div>
      </Card>

      {/* Extras & Wicket */}
      <Card className="p-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Extras & Wicket</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <button className="py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-sm font-medium text-gray-700 transition-all">
            Wide
          </button>
          <button className="py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-sm font-medium text-gray-700 transition-all">
            No Ball
          </button>
          <button className="py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-sm font-medium text-gray-700 transition-all">
            Bye
          </button>
          <button className="py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-sm font-medium text-gray-700 transition-all">
            Leg Bye
          </button>
        </div>
        <button
          onClick={handleWicket}
          className="w-full mt-2 py-3 rounded-xl bg-red-500 hover:bg-red-600 active:bg-red-700 text-white font-bold transition-all"
        >
          WICKET
        </button>
      </Card>

      {/* Actions */}
      <div className="flex gap-2">
        <Button
          variant="outline"
          fullWidth
          icon={<Undo2 className="w-4 h-4" />}
          onClick={undoLastBall}
        >
          Undo
        </Button>
        <Button
          variant="outline"
          fullWidth
          icon={<RotateCcw className="w-4 h-4" />}
        >
          Reset
        </Button>
      </div>
    </div>
  );
}
