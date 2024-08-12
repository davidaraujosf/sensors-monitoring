import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import SensorTable from './index';

describe('SensorTable', () => {
  const mockRows = [
    { equipmentId: 'equip1', count: 5, somatoryValue: 100, averageValue: 20 },
    { equipmentId: 'equip2', count: 3, somatoryValue: 60, averageValue: 20 },
    { equipmentId: 'equip3', count: 7, somatoryValue: 60, averageValue: 20 },
    { equipmentId: 'equip4', count: 3, somatoryValue: 60, averageValue: 20 },
    { equipmentId: 'equip5', count: 3, somatoryValue: 60, averageValue: 20 },
    { equipmentId: 'equip6', count: 3, somatoryValue: 60, averageValue: 20 },
    { equipmentId: 'equip7', count: 3, somatoryValue: 60, averageValue: 20 },
    { equipmentId: 'equip8', count: 3, somatoryValue: 60, averageValue: 20 },
    { equipmentId: 'equip9', count: 3, somatoryValue: 60, averageValue: 20 },
    { equipmentId: 'equip10', count: 3, somatoryValue: 60, averageValue: 20 },
    { equipmentId: 'equip11', count: 3, somatoryValue: 60, averageValue: 20 },
    { equipmentId: 'equip12', count: 3, somatoryValue: 60, averageValue: 20 },
  ];

  it('render the table with the correct columns', () => {
    render(<SensorTable rows={mockRows} />);

    expect(screen.getByText('Equipment Id')).toBeInTheDocument();
    expect(screen.getByText('Count')).toBeInTheDocument();
    expect(screen.getByText('Somatory Value')).toBeInTheDocument();
    expect(screen.getByText('Average Value')).toBeInTheDocument();
  });

  it('render the data correctly', () => {
    render(<SensorTable rows={mockRows} />);

    expect(screen.getByText('equip1')).toBeInTheDocument();
    expect(screen.getByText('equip2')).toBeInTheDocument();
    expect(screen.getAllByText('5').length).toBeGreaterThan(0);
    expect(screen.getAllByText('3').length).toBeGreaterThan(0);
    expect(screen.getAllByText('100.00').length).toBeGreaterThan(0);
    expect(screen.getAllByText('60.00').length).toBeGreaterThan(0);
    expect(screen.getAllByText('20.00').length).toBeGreaterThan(0);
  });

  it('render the table empty when there is no data', () => {
    render(<SensorTable rows={[]} />);

    expect(screen.getByText('No rows')).toBeInTheDocument();
  });

  it('render the table with the correct number of rows per page', () => {
    render(<SensorTable rows={mockRows} />);
    // 6 linhas por página porque o componente conta as linhas com o cabeçalho
    expect(screen.getAllByRole('row')).toHaveLength(6);
  });

  it('render next page button disabled when there is less than 6 rows', () => {
    render(<SensorTable rows={[]} />);
    const nextButton = screen.getByRole('button', { name: /next page/i });
    expect(nextButton).toBeInTheDocument();
    expect(nextButton).toBeDisabled();
  });

  it('render next page when the user click on next page button', () => {
    render(<SensorTable rows={mockRows} />);
    const nextButton = screen.getByRole('button', { name: /next page/i });
    fireEvent.click(nextButton);
    expect(screen.getByText('equip6')).toBeInTheDocument();
    expect(screen.getByText('equip7')).toBeInTheDocument();
    expect(screen.getByText('equip8')).toBeInTheDocument();
    expect(screen.getByText('equip9')).toBeInTheDocument();
    expect(screen.getByText('equip10')).toBeInTheDocument();
  });
});
