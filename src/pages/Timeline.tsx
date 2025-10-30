import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useStoredVar } from '../hooks/storedVar'
import type PracticeStats from '../models/Stats'
import { today } from '../lib/utils';


export default function Timeline() {
  const [stats] = useStoredVar<Map<number, PracticeStats>>("stats_v2", new Map())
  const data: any[] = [];

  for (let i = today() - 30; i <= today(); i++) {
    const d = new Date(i * 24 * 60 * 60 * 1000)
    const [dd, mm, yyyy] = [d.getDate() + 1, d.getMonth() + 1, d.getFullYear()]
    const dayStats = stats.get(i) ?? { correct: 0, practiced: 0 }

    data.push({ name: `${dd}/${mm}/${yyyy}`, correct: dayStats.correct, wrong: dayStats.practiced - dayStats.correct })
  }

  return (
    <div className="w-full h-[750px] mt-20 px-10">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar barSize={20} dataKey="correct" name="Correct" stackId={1} fill="#127118" />
          <Bar barSize={20} dataKey="wrong" name="Wrong" stackId={1} fill="#831007" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
