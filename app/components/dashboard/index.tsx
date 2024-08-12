import { useState } from 'react';
import { useQuery } from '@apollo/client';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
  Box,
  Button,
  Alert,
  CircularProgress,
} from '@mui/material';

import {
  GET_SENSOR_AVERAGES_QUERY,
  GET_SENSOR_SOMATORY_QUERY,
} from '@/api/sensor';
import SensorChart from '../sensor-chart';
import SensorCSVUpload from '../sensor-csv-upload';
import SensorInputForm from '../sensor-input-form';
import SensorTable from '../sensor-table';
import type {
  SensorAverageResponse,
  SensorSomatoryResponse,
} from '@/types/sensors';

const Dashboard = () => {
  const [period, setPeriod] = useState('24h');
  const [openForm, setOpenForm] = useState(false);
  const {
    data: dataSensors,
    loading: loadingSensors,
    error: errorSensors,
  } = useQuery<SensorSomatoryResponse>(GET_SENSOR_SOMATORY_QUERY, {
    variables: { period },
  });
  const {
    data: dataSensorAverage,
    loading: loadingSensorAverage,
    error: errorSensorAverage,
  } = useQuery<SensorAverageResponse>(GET_SENSOR_AVERAGES_QUERY, {
    variables: { period },
  });

  const handleOpenForm = () => {
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  if (loadingSensorAverage || loadingSensors) return <CircularProgress />;
  if (errorSensorAverage)
    return (
      <Alert severity="error">
        Error on fetch sensor average: {errorSensorAverage.message}
      </Alert>
    );
  if (errorSensors)
    return (
      <Alert severity="error">
        Error on fetch sensors: {errorSensors.message}
      </Alert>
    );

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
          <FormControl variant="outlined">
            <InputLabel id="period-select-label">Select Period</InputLabel>
            <Select
              labelId="period-select-label"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              label="Select Period"
              data-testid="period-select"
            >
              <MenuItem data-testid="period-24h" value="24h">
                Last 24 hours
              </MenuItem>
              <MenuItem data-testid="period-48h" value="48h">
                Last 48 hours
              </MenuItem>
              <MenuItem data-testid="period-1w" value="1w">
                Last 1 week
              </MenuItem>
              <MenuItem data-testid="period-1m" value="1m">
                Last 1 month
              </MenuItem>
              <MenuItem data-testid="period-all" value="all">
                All time
              </MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" onClick={handleOpenForm}>
            Add Sensor Data
          </Button>
          <SensorCSVUpload />
        </Box>
        {dataSensorAverage && dataSensors ? (
          <>
            <SensorChart data={dataSensorAverage} period={period} />
            <SensorTable rows={dataSensors?.sensorsSomatory} />
          </>
        ) : (
          <Alert severity="warning">No sensors data founded</Alert>
        )}
        <SensorInputForm open={openForm} onClose={handleCloseForm} />
      </Box>
    </Container>
  );
};

export default Dashboard;
