import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Box } from '@mui/material';

import type { SensorAverageResponse } from '@/types/sensors';

interface SensorAverageChartProps {
  period: string;
  data: SensorAverageResponse;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SensorAverageChart = ({ data, period }: SensorAverageChartProps) => {
  const chartData = {
    labels: data.sensorsAverage.map((sensor) => sensor.equipmentId),
    datasets: [
      {
        label: `Average Value - Last ${period}`,
        data: data.sensorsAverage.map((sensor) => sensor.averageValue),
        fill: false,
        backgroundColor: 'rgba(33, 150, 243, 0.5)',
        borderColor: 'rgba(33, 150, 243, 1)',
      },
    ],
  };

  return (
    <Box sx={{ p: 3 }}>
      <Line data={chartData} />
    </Box>
  );
};

export default SensorAverageChart;
