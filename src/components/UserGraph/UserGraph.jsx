import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserTable from '../UserTable/UserTable';
import UserForm from '../UserForm/UserForm';
import { Container, Typography } from '@mui/material';

const UserGraph = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error.message);
    }
  };

  const handleSave = async (formData) => {
    try {
      if (selectedUser) {
        await axios.put(`http://localhost:3001/users/${selectedUser.id}`, formData);
      } else {
        await axios.post('http://localhost:3001/users', formData);
      }
      fetchUsers();
      setSelectedUser(null);
    } catch (error) {
      console.error('Error saving user:', error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error.message);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
  };

  const handleCancel = () => {
    setSelectedUser(null);
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>
        User Management
      </Typography>
      <UserForm
        selectedUser={selectedUser}
        onSave={handleSave}
        onCancel={handleCancel}
      />
      <UserTable users={users} onEdit={handleEdit} onDelete={handleDelete} />
    </Container>
  );
};

export default UserGraph;
