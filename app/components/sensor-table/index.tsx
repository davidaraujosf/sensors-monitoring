import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import type { SensorSomatory } from '@/types/sensors';

interface SensorTableProps {
  rows: SensorSomatory[];
}

const columns: GridColDef<SensorSomatory>[] = [
  { field: 'equipmentId', headerName: 'Equipment Id', flex: 1 },
  {
    field: 'count',
    headerName: 'Count',
    flex: 1,
  },
  {
    field: 'somatoryValue',
    headerName: 'Somatory Value',
    flex: 1,
    renderCell: (cell) => cell.row.somatoryValue.toFixed(2),
  },
  {
    field: 'averageValue',
    headerName: 'Average Value',
    flex: 1,
    renderCell: (cell) => cell.row.averageValue.toFixed(2),
  },
];

const SensorTable = ({ rows }: SensorTableProps) => {
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        getRowId={(row) => row.equipmentId}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default SensorTable;
