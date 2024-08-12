import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
} from '@mui/material';

import { CREATE_SENSOR_MUTATION } from '@/api/sensor';

interface SensorInputFormProps {
  open: boolean;
  onClose: () => void;
}

const SensorInputForm = ({ open, onClose }: SensorInputFormProps) => {
  const [equipmentId, setEquipmentId] = useState('');
  const [timestamp, setTimestamp] = useState('');
  const [value, setValue] = useState('');
  const [createSensor] = useMutation(CREATE_SENSOR_MUTATION);

  const handleSubmit = async () => {
    await createSensor({
      variables: { equipmentId, timestamp, value: parseFloat(value) },
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create New Sensor Data</DialogTitle>
      <DialogContent>
        <Box component="form" noValidate autoComplete="off">
          <TextField
            margin="dense"
            label="Equipment ID"
            fullWidth
            value={equipmentId}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEquipmentId(e.target.value)
            }
          />
          <TextField
            margin="dense"
            fullWidth
            type="datetime-local"
            value={timestamp}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTimestamp(e.target.value)
            }
          />
          <TextField
            margin="dense"
            label="Value"
            fullWidth
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setValue(e.target.value)
            }
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SensorInputForm;
