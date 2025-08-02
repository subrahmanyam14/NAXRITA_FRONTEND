// src/layouts/PublicEmployeeLayout.jsx
import { Outlet } from 'react-router-dom';
import Header from '../shared/components/Header';

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header isPublic={false} />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Employee Portal</h2>
          <p className="text-gray-600 mb-6">
            Welcome! This is your public employee space. Access policies, learning, and announcements.
          </p>
          <Outlet />
        </div>
      </main>
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© {new Date().getFullYear()} HR Portal. Employee Public View.</p>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;