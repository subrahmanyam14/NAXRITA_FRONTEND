// src/layouts/PublicEmployeeLayout.jsx
import { Outlet } from 'react-router-dom';
import Header from '../shared/components/Header';
import Footer from '../shared/components/Footer';
const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header isPublic={false} />
      <main className="container mx-auto px-4 py-8">
        <div className=" mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Employee Portal</h2>
          <p className="text-gray-600 mb-6">
            Welcome! This is your public employee space. Access policies, learning, and announcements.
          </p>
          <Outlet />
        </div>
      </main>
     <Footer/>
    </div>
  );
};

export default PublicLayout;