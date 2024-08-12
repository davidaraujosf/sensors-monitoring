import React from 'react';
import { render, screen } from '@testing-library/react';
import SensorAverageChart from './index';

jest.mock('chart.js');

describe('SensorAverageChart', () => {
  const mockData = {
    sensorsAverage: [
      { equipmentId: 'equip1', averageValue: 10 },
      { equipmentId: 'equip2', averageValue: 20 },
      { equipmentId: 'equip3', averageValue: 30 },
    ],
  };

  it('renders without crashing', () => {
    render(<SensorAverageChart data={mockData} period="24h" />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('handles empty data gracefully', () => {
    const emptyData = { sensorsAverage: [] };
    render(<SensorAverageChart data={emptyData} period="24h" />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });
});
