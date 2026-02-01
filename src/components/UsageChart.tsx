import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { DailyUsage } from '../types/usage';

interface UsageChartProps {
  data: DailyUsage[];
}

export function UsageChart({ data }: UsageChartProps) {
  const formattedData = data.map(item => ({
    ...item,
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
  }));

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Token Usage</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={formattedData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="inputGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#da7756" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#da7756" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="outputGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#d4a27f" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#d4a27f" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12, fill: '#6b7280' }}
              tickLine={false}
              axisLine={{ stroke: '#e5e7eb' }}
            />
            <YAxis
              tick={{ fontSize: 12, fill: '#6b7280' }}
              tickLine={false}
              axisLine={{ stroke: '#e5e7eb' }}
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }}
              formatter={(value: number) => [value.toLocaleString(), '']}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey="inputTokens"
              name="Input Tokens"
              stroke="#da7756"
              strokeWidth={2}
              fill="url(#inputGradient)"
            />
            <Area
              type="monotone"
              dataKey="outputTokens"
              name="Output Tokens"
              stroke="#d4a27f"
              strokeWidth={2}
              fill="url(#outputGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
