import React, {FC} from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

interface GamesBarChartProps {
  data: any;
}


export const GamesBarChart: FC<GamesBarChartProps> = (props) => {
  const {data} = props;
    return (
        <BarChart width={640} height={480} data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Bar dataKey="value" fill="#8884d8" />
          <Tooltip />
        </BarChart>
    );
}
