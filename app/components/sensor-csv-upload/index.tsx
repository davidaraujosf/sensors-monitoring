import { useState } from 'react';
import axios from 'axios';
import { toast, Bounce } from 'react-toastify';
import { Button } from '@mui/material';

import { enviroment } from '../../enviroment';

const SensorCSVUpload = () => {
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCsvFile(event?.target?.files?.[0] ?? null);
  };

  const handleUpload = async () => {
    if (!csvFile) return;

    const formData = new FormData();
    formData.append('file', csvFile);

    try {
      setIsUploading(true);
      await axios.post(enviroment.API_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('CSV processed successfully', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      });
    } catch (error) {
      toast.error('Error processing CSV', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      });
      console.error('Error uploading file:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <input
        accept=".csv"
        style={{ display: 'none' }}
        id="upload-csv"
        type="file"
        onChange={handleFileChange}
      />
      <label htmlFor="upload-csv">
        <Button sx={{ height: '100%' }} variant="contained" component="span">
          Upload CSV
        </Button>
      </label>
      {csvFile && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
          disabled={!csvFile || isUploading}
        >
          {isUploading ? 'Processing...' : 'Process CSV'}
        </Button>
      )}
    </>
  );
};

export default SensorCSVUpload;
