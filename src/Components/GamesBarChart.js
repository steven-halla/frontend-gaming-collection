import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const GamesBarChart = (props) => {
  const {data} = props;
    return (
      // <ResponsiveContainer width="100%" height="100%">
        <BarChart width={640} height={480} data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Bar dataKey="value" fill="#8884d8" />
          <Tooltip />
        </BarChart>
    );
}
