import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchUser } from '../services/api';
import { showToast } from '../hooks/useToast';

/**
 * User detail page showing comprehensive user information
 */
function UserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadUser(parseInt(id));
    }
  }, [id]);

  /**
   * Load user data from API
   */
  const loadUser = async (userId) => {
    try {
      setLoading(true);
      const userData = await fetchUser(userId);
      setUser(userData);
    } catch (error) {
      showToast('Failed to load user details', 'error');
      // Redirect back to users list if user not found
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black from-primary/5 to-secondary/5 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground text-white">Loading user details...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-sm border p-8 max-w-md mx-4">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
              <span className="text-2xl text-muted-foreground">👤</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">User Not Found</h3>
            <p className="text-muted-foreground mb-4">
              The user you're looking for doesn't exist or has been deleted.
            </p>
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center px-4 py-2 bg-fuchsia-700 text-primary-foreground rounded-md hover:bg-fuchsia/90 transition-colors"
            >
              <span className="mr-2">←</span>
              Back to Users
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5">
      {/* Header */}
      <div className="bg-gradient-to-r bg-blue-400 from-primary to-primary/80 text-white py-8">
        <div className="container mx-auto px-4">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center px-4 py-2 bg-white/20 text-white rounded-md hover:bg-white/30 transition-colors mb-4"
          >
            <span className="mr-2">←</span>
            Back to Users
          </button>
          
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-2xl">👤</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold">{user.name}</h1>
              <p className="text-white/80">@{user.username}</p>
            </div>
            <div className="ml-auto">
              <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm">
                ID: {user.id}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center">
              <span className="mr-2">📧</span>
              Contact Information
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-muted-foreground">📧</span>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{user.email}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-muted-foreground">📱</span>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{user.phone}</p>
                </div>
              </div>
              
              {user.website && (
                <div className="flex items-center gap-3">
                  <span className="text-muted-foreground">🌐</span>
                  <div>
                    <p className="text-sm text-muted-foreground">Website</p>
                    <a
                      href={`http://${user.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-primary hover:underline"
                    >
                      {user.website}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Address Information */}
          {user.address && (
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                <span className="mr-2">📍</span>
                Address
              </h2>
              <div className="space-y-2">
                <p className="font-medium">
                  {user.address.suite} {user.address.street}
                </p>
                <p className="text-muted-foreground">
                  {user.address.city}, {user.address.zipcode}
                </p>
              </div>
            </div>
          )}

          {/* Company Information */}
          {user.company && (
            <div className="bg-white rounded-lg shadow-sm border p-6 lg:col-span-2">
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                <span className="mr-2">🏢</span>
                Company Information
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">{user.company.name}</h3>
                  <p className="text-muted-foreground italic">"{user.company.catchPhrase}"</p>
                </div>
                
                <div className="border-t pt-4">
                  <p className="text-sm text-muted-foreground mb-1">Business Focus</p>
                  <p className="text-sm">{user.company.bs}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center px-6 py-3 bg-amber-400 text-primary-foreground rounded-lg hover:bg-fuchsia-700/90 transition-colors font-medium"
          >
            <span className="mr-2">←</span>
            Back to User Management
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserDetail;