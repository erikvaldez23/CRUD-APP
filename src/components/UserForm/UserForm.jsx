import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const UserForm = ({ selectedUser, onSave, onCancel }) => {
  const [formData, setFormData] = useState({ name: '', email: '' });

  useEffect(() => {
    if (selectedUser) {
      setFormData({ name: selectedUser.name, email: selectedUser.email });
    } else {
      setFormData({ name: '', email: '' });
    }
  }, [selectedUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    setFormData({ name: '', email: '' });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: '100%',
        maxWidth: 400,
        mx: 'auto',
        mb: 4,
      }}
    >
      <Typography variant="h6">
        {selectedUser ? 'Edit User' : 'Add User'}
      </Typography>
      <TextField
        label="Name"
        variant="outlined"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <TextField
        label="Email"
        variant="outlined"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button type="submit" variant="contained" color="primary">
          {selectedUser ? 'Update' : 'Add'}
        </Button>
        {selectedUser && (
          <Button variant="outlined" color="secondary" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default UserForm;
