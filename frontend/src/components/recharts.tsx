import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {validatedData} from '../types/financa'

export const Example = () => {
  return (
    <div style={{ minWidth: '1' ,width: '100%', height: '70%'}}>
      <ResponsiveContainer>
        <AreaChart
          data={validatedData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="caixa" stroke="#2c9481" fill="#4d6ee3" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Example;
