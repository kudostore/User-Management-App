import React, { useState, useEffect } from 'react';
import { fetchUsers, createUser, updateUser, deleteUser } from '../services/api';
import UserCard from '../components/UserCard';
import UserForm from '../components/UserForm';
import { showToast } from '../hooks/useToast';

/**
 * Main Users page component for managing user CRUD operations
 */
function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load users when component mounts
  useEffect(() => {
    loadUsers();
  }, []);

  /**
   * Load users from API
   */
  const loadUsers = async () => {
    try {
      setLoading(true);
      const usersData = await fetchUsers();
      setUsers(usersData);
    } catch (error) {
      showToast('Failed to load users', 'error');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle creating a new user
   */
  const handleCreateUser = async (userData) => {
    try {
      setIsSubmitting(true);
      const newUser = await createUser(userData);
      
      // Add the new user to the list (simulate with a temporary ID)
      const userWithId = { ...newUser, id: Date.now() };
      setUsers(prev => [userWithId, ...prev]);
      
      setShowCreateForm(false);
      showToast('User created successfully', 'success');
    } catch (error) {
      showToast('Failed to create user', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Handle updating an existing user
   */
  const handleUpdateUser = async (userData) => {
    try {
      setIsSubmitting(true);
      const updatedUser = await updateUser(editingUser.id, userData);
      
      // Update the user in the list
      setUsers(prev => prev.map(user => 
        user.id === editingUser.id ? { ...updatedUser, id: editingUser.id } : user
      ));
      
      setEditingUser(null);
      showToast('User updated successfully', 'success');
    } catch (error) {
      showToast('Failed to update user', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Handle deleting a user
   */
  const handleDeleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      await deleteUser(id);
      setUsers(prev => prev.filter(user => user.id !== id));
      showToast('User deleted successfully', 'success');
    } catch (error) {
      showToast('Failed to delete user', 'error');
    }
  };

  /**
   * Handle editing a user
   */
  const handleEditUser = (user) => {
    setEditingUser(user);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-4 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5">
      {/* Header */}
      <div className="bg-fuchsia-500 shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">User Management</h1>
              <p className="text-muted-foreground mt-1">
                Manage users with full CRUD operations
              </p>
            </div>
            <button
              onClick={() => setShowCreateForm(true)}
              className="inline-flex items-center px-4 py-2 bg-yellow-200 text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-200 shadow-sm font-medium"
            >
              <span className="mr-2">+</span>
              Add New User
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container bg-fuchsia-200 mx-auto px-4 py-8">
        {users.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
              <span className="text-2xl text-muted-foreground">👥</span>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No users found</h3>
            <p className="text-muted-foreground">Get started by adding your first user.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                onEdit={handleEditUser}
                onDelete={handleDeleteUser}
              />
            ))}
          </div>
        )}
      </div>

      {/* Create User Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-fuchsia-50 rounded-lg shadow-xl w-full max-w-md">
            <UserForm
              onSubmit={handleCreateUser}
              onCancel={() => setShowCreateForm(false)}
              isLoading={isSubmitting}
            />
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {editingUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-fuchsia-50 rounded-lg shadow-xl w-full max-w-md">
            <UserForm
              user={editingUser}
              onSubmit={handleUpdateUser}
              onCancel={() => setEditingUser(null)}
              isLoading={isSubmitting}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;