// src/layouts/BlankLayout.jsx
import { Outlet } from 'react-router-dom';

const BlankLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Outlet />
    </div>
  );
};

export default BlankLayout;