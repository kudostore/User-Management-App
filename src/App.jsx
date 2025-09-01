import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Users from './pages/Users';
import UserDetail from './pages/UserDetail';
import NotFound from './pages/NotFound';
import Toast from './components/Toast';


/**
 * Main App component with routing configuration
 */
function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-backgrounds bg-white">
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/user/:id" element={<UserDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toast />
      </div>
    </BrowserRouter>
  );
}

export default App;