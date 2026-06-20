import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

interface RankChartProps {
  data: { time: string; rank: number }[]
}

export default function RankChart({ data }: RankChartProps) {
  const maxRank = Math.max(...data.map((d) => d.rank))
  const yMax = Math.min(maxRank + 5, 50)

  return (
    <div className="w-full h-48">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="rankGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#38BDF8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="time"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: '#64748B' }}
            dy={8}
          />
          <YAxis
            domain={[1, yMax]}
            reversed
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: '#64748B' }}
            dx={-4}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1E293B',
              border: '1px solid #334155',
              borderRadius: '8px',
              fontSize: '12px',
              color: '#F8FAFC',
            }}
            formatter={(value: number) => [`第 ${value} 位`, '排名']}
            labelFormatter={(label: string) => `时间: ${label}`}
          />
          <Area
            type="monotone"
            dataKey="rank"
            stroke="#38BDF8"
            strokeWidth={2}
            fill="url(#rankGradient)"
            dot={{ r: 3, fill: '#38BDF8', stroke: '#0F172A', strokeWidth: 2 }}
            activeDot={{ r: 5, fill: '#38BDF8', stroke: '#0F172A', strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
