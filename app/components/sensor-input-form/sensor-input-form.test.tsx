import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import SensorInputForm from './index';
import {
  SENSOR_INPUT_FORM_MOCKS,
  SENSOR_INPUT_FORM_MOCK_DATE,
} from './sensor-input.fixtures';

const mockOnClose = jest.fn();

describe('SensorInputForm', () => {
  it('render the form correctly when open', () => {
    render(
      <MockedProvider mocks={SENSOR_INPUT_FORM_MOCKS} addTypename={false}>
        <SensorInputForm open={true} onClose={mockOnClose} />
      </MockedProvider>
    );

    expect(screen.getByText('Create New Sensor Data')).toBeInTheDocument();
    expect(screen.getByLabelText('Equipment ID')).toBeInTheDocument();
    expect(screen.getByLabelText('Timestamp')).toBeInTheDocument();
    expect(screen.getByLabelText('Value')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  it('don`t render the form when closed', () => {
    render(
      <MockedProvider mocks={SENSOR_INPUT_FORM_MOCKS} addTypename={false}>
        <SensorInputForm open={false} onClose={mockOnClose} />
      </MockedProvider>
    );

    expect(
      screen.queryByText('Create New Sensor Data')
    ).not.toBeInTheDocument();
  });

  it('calls onClose when Cancel button is clicked', async () => {
    const mockOnClose = jest.fn();
    render(
      <MockedProvider mocks={SENSOR_INPUT_FORM_MOCKS} addTypename={false}>
        <SensorInputForm open={true} onClose={mockOnClose} />
      </MockedProvider>
    );

    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });

  it('update the input fields correctly', () => {
    render(
      <MockedProvider mocks={SENSOR_INPUT_FORM_MOCKS} addTypename={false}>
        <SensorInputForm open={true} onClose={mockOnClose} />
      </MockedProvider>
    );

    fireEvent.change(screen.getByLabelText('Equipment ID'), {
      target: { value: 'test-equipment' },
    });
    fireEvent.change(screen.getByLabelText('Timestamp'), {
      target: { value: SENSOR_INPUT_FORM_MOCK_DATE },
    });
    fireEvent.change(screen.getByLabelText('Value'), {
      target: { value: '10.5' },
    });

    expect(screen.getByLabelText('Equipment ID')).toHaveValue('test-equipment');
    expect(screen.getByLabelText('Timestamp')).toHaveValue(
      SENSOR_INPUT_FORM_MOCK_DATE
    );
    expect(screen.getByLabelText('Value')).toHaveValue('10.5');
  });

  it('send the form correctly', async () => {
    render(
      <MockedProvider mocks={SENSOR_INPUT_FORM_MOCKS} addTypename={false}>
        <SensorInputForm open={true} onClose={mockOnClose} />
      </MockedProvider>
    );

    fireEvent.change(screen.getByLabelText('Equipment ID'), {
      target: { value: 'test-equipment' },
    });
    fireEvent.change(screen.getByLabelText('Timestamp'), {
      target: { value: SENSOR_INPUT_FORM_MOCK_DATE },
    });
    fireEvent.change(screen.getByLabelText('Value'), {
      target: { value: '10.5' },
    });
    expect(
      (screen.getByLabelText('Equipment ID') as HTMLInputElement).value
    ).toBe('test-equipment');
    expect((screen.getByLabelText('Timestamp') as HTMLInputElement).value).toBe(
      SENSOR_INPUT_FORM_MOCK_DATE
    );
    expect((screen.getByLabelText('Value') as HTMLInputElement).value).toBe(
      '10.5'
    );
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });
});
