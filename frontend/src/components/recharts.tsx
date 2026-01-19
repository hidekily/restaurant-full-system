import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { validatedData } from '../data/financa'

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'var(--color-bg-card)',
        border: '1px solid var(--color-border)',
        borderRadius: '10px',
        padding: '12px 16px',
        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
      }}>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '12px', marginBottom: '4px' }}>{label}</p>
        <p style={{ color: 'var(--color-primary-light)', fontSize: '16px', fontWeight: '600' }}>
          R$ {payload[0].value.toLocaleString('pt-BR')}
        </p>
      </div>
    );
  }
  return null;
};

export const Example = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={validatedData}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <defs>
          <linearGradient id="colorCaixa" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#333333" vertical={false} />
        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#737373', fontSize: 12 }}
          dy={10}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#737373', fontSize: 12 }}
          tickFormatter={(value) => `R$ ${value}`}
          dx={-10}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="caixa"
          stroke="#6366f1"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorCaixa)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default Example;
