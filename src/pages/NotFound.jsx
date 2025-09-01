import React from 'react';
import { Link } from 'react-router-dom';

/**
 * 404 Not Found page component
 */
function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center">
      <div className="text-center space-y-6 max-w-md mx-4">
        <div className="text-6xl font-bold text-primary">404</div>
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-foreground">Page Not Found</h1>
          <p className="text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
        >
          <span className="mr-2">🏠</span>
          Go Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;