import { BarChart3, CheckCircle, Flame } from "lucide-react";
import type PracticeStats from "../models/Stats";

interface StatsBarProps {
  stats: PracticeStats;
}

export default function StatsBar({ stats }: StatsBarProps) {
  return (
    <div className="bg-card border rounded-xl p-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <BarChart3 className="w-5 h-5 text-primary" />
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Total Practiced</div>
            <div className="text-2xl font-bold" data-testid="stat-total-practiced">
              {stats.totalPracticed}
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
              {(stats.successRate * 100).toFixed(0)}%
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-500/10 rounded-lg">
            <Flame className="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Current Streak</div>
            <div className="text-2xl font-bold" data-testid="stat-current-streak">
              {stats.currentStreak}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
