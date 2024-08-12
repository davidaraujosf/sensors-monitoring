import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import { toast } from 'react-toastify';
import SensorCSVUpload from './index';

jest.mock('axios');
jest.mock('react-toastify');

describe('SensorCSVUpload', () => {
  it('renders the upload button', () => {
    render(<SensorCSVUpload />);
    expect(screen.getByText('Upload CSV')).toBeInTheDocument();
  });

  it('does not show the process button when no file is selected', () => {
    render(<SensorCSVUpload />);
    expect(screen.queryByText('Process CSV')).not.toBeInTheDocument();
  });

  it('shows the process button when a file is selected', async () => {
    render(<SensorCSVUpload />);
    const input = screen.getByLabelText('Upload CSV');
    const file = new File(['conteúdo do arquivo'], 'test.csv', {
      type: 'text/csv',
    });
    fireEvent.click(input);
    fireEvent.change(input, { target: { files: [file] } });

    const processButton = screen.getByText('Process CSV');
    expect(processButton).toBeInTheDocument();
  });

  it('calls the API and shows success message when the file is processed', async () => {
    (axios.post as jest.Mock).mockResolvedValue({ data: 'Sucesso' });

    render(<SensorCSVUpload />);
    const input = screen.getByLabelText('Upload CSV');
    const file = new File(['conteúdo do arquivo'], 'test.csv', {
      type: 'text/csv',
    });
    fireEvent.change(input, { target: { files: [file] } });

    const processButton = screen.getByText('Process CSV');
    fireEvent.click(processButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalledWith(
        'CSV processed successfully',
        expect.any(Object)
      );
    });
  });

  it('shows processing message when the file is being processed', async () => {
    render(<SensorCSVUpload />);
    const input = screen.getByLabelText('Upload CSV');
    const file = new File(['conteúdo do arquivo'], 'test.csv', {
      type: 'text/csv',
    });
    fireEvent.change(input, { target: { files: [file] } });

    const processButton = screen.getByText('Process CSV');
    fireEvent.click(processButton);

    expect(screen.getByText('Processing...')).toBeInTheDocument();
  });

  it('shows error message when processing fails', async () => {
    (axios.post as jest.Mock).mockRejectedValue(new Error('API error'));

    render(<SensorCSVUpload />);
    const input = screen.getByLabelText('Upload CSV');
    const file = new File(['conteúdo do arquivo'], 'test.csv', {
      type: 'text/csv',
    });
    fireEvent.change(input, { target: { files: [file] } });

    const processButton = screen.getByText('Process CSV');
    fireEvent.click(processButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalled();
      expect(toast.error).toHaveBeenCalledWith(
        'Error processing CSV',
        expect.any(Object)
      );
    });
  });
});
