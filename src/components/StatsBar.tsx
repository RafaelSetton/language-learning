import { BarChart3, CheckCircle, Flame } from "lucide-react";
import type PracticeStats from "../models/Stats";
import { today } from "../lib/utils";

interface StatsBarProps {
  stats: Map<number, PracticeStats>;
}

export default function StatsBar({ stats }: StatsBarProps) {
  const { correct, practiced } = stats.get(today()) ?? { correct: 0, practiced: 0 }

  let streakStart = today();
  while (stats.get(streakStart) !== undefined) streakStart--;

  const streak = today() - streakStart;

  return (
    <div className="bg-card border rounded-xl p-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <BarChart3 className="w-5 h-5 text-primary" />
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Today's Practice</div>
            <div className="text-2xl font-bold" data-testid="stat-total-practiced">
              {practiced}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-500/10 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Success Rate</div>
            <div className="text-2xl font-bold" data-testid="stat-success-rate">
              {practiced == 0 ? "--" : (correct / practiced * 100).toFixed(0)}%
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-500/10 rounded-lg">
            <Flame className="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Current Day Streak</div>
            <div className="text-2xl font-bold" data-testid="stat-current-streak">
              {streak}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
