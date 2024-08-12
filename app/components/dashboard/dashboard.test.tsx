import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import Dashboard from './index';
import {
  DASHBOARD_TEST_MOCKS,
  DASHBOARD_TEST_MOCKS_ERROR,
} from './dashboard.fixtures';

jest.mock('react-chartjs-2', () => ({
  Line: () => null,
}));

describe('Dashboard', () => {
  it('renders loading state initially', () => {
    render(
      <MockedProvider mocks={DASHBOARD_TEST_MOCKS} addTypename={false}>
        <Dashboard />
      </MockedProvider>
    );
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders the dashboard with data after loading', async () => {
    render(
      <MockedProvider mocks={DASHBOARD_TEST_MOCKS} addTypename={false}>
        <Dashboard />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    });

    expect(screen.getAllByText('Select Period').length).toBeGreaterThan(0);
    expect(screen.getByText('Add Sensor Data')).toBeInTheDocument();
    expect(screen.getByText('Upload CSV')).toBeInTheDocument();
  });

  it('changes period when select is changed', async () => {
    render(
      <MockedProvider mocks={DASHBOARD_TEST_MOCKS} addTypename={false}>
        <Dashboard />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    });

    const selectInput = screen.getByTestId('period-select').children[0];

    fireEvent.mouseDown(selectInput);
    fireEvent.click(screen.getByTestId('period-48h'));
    await waitFor(() => {
      expect(screen.getAllByText('Last 48 hours').length).toBe(1);
    });
  });

  it('opens sensor input form when "Add Sensor Data" is clicked', async () => {
    render(
      <MockedProvider mocks={DASHBOARD_TEST_MOCKS} addTypename={false}>
        <Dashboard />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Add Sensor Data'));

    expect(screen.getByText('Create New Sensor Data')).toBeInTheDocument();
  });

  it('displays error message when query fails', async () => {
    render(
      <MockedProvider mocks={DASHBOARD_TEST_MOCKS_ERROR} addTypename={false}>
        <Dashboard />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    });

    expect(
      screen.getByText('Error on fetch sensor average: An error occurred')
    ).toBeInTheDocument();
  });
});
