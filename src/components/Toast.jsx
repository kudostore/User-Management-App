import React, { useState, useEffect } from 'react';
import { setToastListener } from '../hooks/useToast';

/**
 * Toast notification component
 */
function Toast() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    setToastListener((toast) => {
      setToasts(prev => [...prev, toast]);
      
      // Auto remove toast after 3 seconds
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== toast.id));
      }, 3000);
    });
  }, []);

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`px-4 py-3 rounded-lg shadow-lg border max-w-sm animate-in slide-in-from-right ${
            toast.type === 'success' 
              ? 'bg-green-50 border-green-200 text-green-800' 
              : toast.type === 'error'
              ? 'bg-red-50 border-red-200 text-red-800'
              : 'bg-blue-50 border-blue-200 text-blue-800'
          }`}
        >
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">{toast.message}</p>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-3 text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Toast;