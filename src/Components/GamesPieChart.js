import React from 'react';
import {Pie, PieChart, ResponsiveContainer, Tooltip} from 'recharts';

export const GamesPieChart = (props) => {
  const {data, width = 400, height = 400} = props;

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({cx, cy, midAngle, innerRadius, outerRadius, percent, index, name, value}) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {/*{`${(percent * 100).toFixed(0)}%`}*/}
       {name} ${value}
      </text>
    );
  };

  // https://recharts.org/en-US/examples/PieChartWithCustomizedLabel
  return (
      <PieChart width={width} height={height}>
        <Pie
          dataKey="value"
          isAnimationActive={false}
          labelLine={false}
          label={renderCustomizedLabel}
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={120}
          fill="#39d1f9"
        />
        <Pie dataKey="value" data={data} cx={500} cy={200} innerRadius={40} outerRadius={80} fill="#82ca9d" />
        <Tooltip />
      </PieChart>
  );

}
