import React from 'react';
import { Link } from 'react-router-dom';

/**
 * UserCard component displays individual user information with actions
 */
function UserCard({ user, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-border p-6 hover:shadow-md transition-all duration-200">
      {/* User Info */}
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-foreground mb-2">{user.name}</h3>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium">ID:</span> {user.id}
          </p>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium">Email:</span> {user.email}
          </p>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium">Phone:</span> {user.phone}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onEdit(user)}
          className="flex-1 px-3 py-2 bg-emerald-500 text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm font-medium"
        >
          Edit
        </button>
        
        <button
          onClick={() => onDelete(user.id)}
          className="flex-1 px-3 py-2 bg-red-500 text-destructive-foreground rounded-md hover:bg-destructive/90 transition-colors text-sm font-medium"
        >
          Delete
        </button>
        
        <Link
          to={`/user/${user.id}`}
          className="flex-1 px-3 py-2 bg-violet-300 text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors text-sm font-medium text-center"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default UserCard;