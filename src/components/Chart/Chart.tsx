'use client';

import {
  Chart as ChartJS,
  Tooltip,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';
import { FC } from 'react';
import { Bar } from 'react-chartjs-2';

import { Order } from '@/models/order'; 

ChartJS.register(Tooltip, CategoryScale, LinearScale, BarElement);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};
type ChartProps = {
    userOrders: Order[];
  };
  const Chart: FC<ChartProps> = ({ userOrders }) => {
  const labels = userOrders.map(order => order.product.name);
  const amountSpent = userOrders.map(order => order.totalPrice);

  return (
    <Bar
      options={options}
      data={{
        labels,
        datasets: [
          {
            label: 'Amount spent',
            data: amountSpent,
            borderWidth: 1,
            backgroundColor: '#F27405',
            hoverBackgroundColor: '#F2C641',
          },
        ],
      }}
    />
  );
};

export default Chart;