import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';

const UserTable = ({ users, onEdit, onDelete }) => {
  const [pageSize, setPageSize] = useState(25); // Default rows per page set to 25

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 2 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => onEdit(params.row)}
            style={{ marginRight: 8 }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => onDelete(params.row.id)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div style={{ width: '100%' }}>
      <DataGrid
        rows={users}
        columns={columns}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 25, 50, 100]} // Ensure 25 is included
        pagination
        autoHeight // Automatically adjusts height based on content
        disableSelectionOnClick
        style={{
          border: '1px solid #ccc',
          borderRadius: '8px',
          width: '100%', // Ensures the table takes the full width of the container
        }}
      />
    </div>
  );
};

export default UserTable;
