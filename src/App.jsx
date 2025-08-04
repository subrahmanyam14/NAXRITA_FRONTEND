// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Layouts
import AdminLayout from './layouts/AdminLayout';
import EmployeeLayout from './layouts/EmployeeLayout';
import PublicAdminLayout from './layouts/PublicLayoutAdmin';
import PublicEmployeeLayout from './layouts/PubliclayoutEmp';
import BlankLayout from './layouts/BlankLayout'; // for login only
import PublicLayout from './layouts/PublicLayout';
// Pages
import Login from './shared/pages/Login';
import HomeAdmin from './shared/pages/HomeAdmin';
import HomeEmployee from './shared/pages/HomeEmp';

import PolicyLanding from './shared/pages/PolicyLanding';
import PolicySearchResult from './shared/pages/PolicySearchResult';
import PolicyDetail from './shared/pages/PolicyDetail';
import MyLearning from './shared/pages/MyLearning';
import Unauthorized from './shared/pages/Unauthorized';

// Admin Pages
import AdminSummary from './admin/pages/AdminSummary';
import ManageEmployees from './admin/pages/ManageEmployees';
import EmployeePerformance from './admin/pages/EmployeePerformance';
import AdminProfile from './admin/pages/AdminProfile';
import EmployeeBirthdays from './admin/pages/EmployeeBirthDays'
// Employee Pages
import Summary from './employee/pages/EmployeeSummary';
import MyTasks from './employee/pages/MyTasks';
import EmployeeProfile from './employee/pages/EmployeeProfile';
import EmployeeDashboard from './employee/pages/Dashboard';
import EmployeeCareerDashboard from './employee/pages/EmployeeCareerDashboard';
import EmployeeContactPage from './employee/pages/EmployeeContactPage';
import EmployeeCompensationDashboard from './employee/pages/EmployeeCompensationDashboard.jsx';
import PerformanceDashboard from './admin/pages/PerformanceDashboard.jsx';
import AdminCareerPage from './admin/pages/AdminCareerPage.jsx';
import AdminContactPage from './admin/pages/AdminContactPage.jsx';
import AdminCompensationPage from './admin/pages/AdminCompensationPage.jsx';

// Redirects
const RedirectToLogin = () => {
  const { user } = useAuth();
  if (user?.role === 'admin') return <Navigate to="/admin/home" replace />;
  if (user?.role === 'employee') return <Navigate to="/employee/home" replace />;
  return <Navigate to="/login" replace />;
};

const RedirectToDashboard = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return user.role === 'admin'
    ? <Navigate to="/admin/home" replace />
    : <Navigate to="/employee/home" replace />;
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* 🔥 Root: Redirect to login or role-based public layout */}
          <Route path="/" element={<RedirectToLogin />} />

          {/* 🔐 Login Page (No Layout) */}
          <Route path="/login" element={<BlankLayout />}>
            <Route index element={<Login />} />
          </Route>

          {/* 🟦 Admin Public Layout */}
          <Route
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <PublicAdminLayout />
              </ProtectedRoute>
            }
          >
             <Route path="admin/home" element={<HomeAdmin />} />
            <Route path="admin/public" element={<PolicyLanding />} />
            <Route path="admin/public/policies" element={<PolicyLanding />} />
            <Route path="admin/public/policies/search" element={<PolicySearchResult />} />
            <Route path="admin/public/policies/:id" element={<PolicyDetail />} />
            <Route path="admin/public/learning" element={<MyLearning />} />
            {/* <Route path="admin/home" element={<Navigate to="/admin/home" replace />} /> */}
          </Route>

          {/* 🟩 Employee Public Layout */}
          <Route
            element={
              <ProtectedRoute allowedRoles={['employee']}>
                <PublicEmployeeLayout />
              </ProtectedRoute>
            }
          >
            
            <Route path="employee/home" element={<HomeEmployee />} />
            <Route path="employee/public" element={<PolicyLanding />} />
            <Route path="employee/public/policies" element={<PolicyLanding />} />
            <Route path="employee/public/policies/search" element={<PolicySearchResult />} />
            <Route path="employee/public/policies/:id" element={<PolicyDetail />} />
            <Route path="employee/public/learning" element={<MyLearning />} />
            {/* <Route path="employee/home" element={<Navigate to="/employee/home" replace />} /> */}
          </Route>

          {/* 🏢 Admin Dashboard Layout */}
          <Route
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="admin/home" element={<HomeAdmin />} />
            <Route path="admin/summary" element={<AdminSummary />} />
            
            
            
            <Route path="admin/compensation" element={<AdminCompensationPage />} />
            <Route path="admin/contact" element={<AdminContactPage />} />
            
            <Route path ="admin/birtdays" element ={<EmployeeBirthdays/>}
            <Route path="admin/career" element={<AdminCareerPage />} />
            <Route path="admin/overview" element={<PerformanceDashboard />} />
            <Route path="admin/employees" element={<ManageEmployees />} />
            <Route path="admin/performance" element={<EmployeePerformance />} />
            <Route path="admin/profile" element={<AdminProfile />} />
          </Route>

          {/* 🧑‍💼 Employee Dashboard Layout */}
          <Route
            element={
              <ProtectedRoute allowedRoles={['employee']}>
                <EmployeeLayout />
              </ProtectedRoute>
            }
          >
            <Route path="employee/home" element={<HomeEmployee />} />
            <Route path="employee/summary" element={<Summary />} />
            <Route path="employee/tasks" element={<MyTasks />} />
            <Route path="employee/profile" element={<EmployeeProfile />} />
            
            
            <Route path="employee/contact" element={<EmployeeContactPage/>} />
            
            <Route path="employee/compensation" element={<EmployeeCompensationDashboard/>} />
            <Route path="employee/career" element={<EmployeeCareerDashboard/>} />
            <Route path="employee/overview" element={<EmployeeDashboard />} />
            <Route path="employee/learning" element={<MyLearning />} />
          </Route>

          {/* ❌ Unauthorized */}
          <Route path="/unauthorized" element={<PublicLayout />}>
            <Route index element={<Unauthorized />} />
          </Route>

          {/* 🚫 Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;