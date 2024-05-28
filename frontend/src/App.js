import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Homepage from "./pages/Homepage";
import Admin from "./pages/admin/AdminPage";
import "./App.css";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import PageState from "./notes/PageState.js";
import { Navigate } from 'react-router-dom';
import AdminLocationPage from "./pages/admin/AdminLocationPage";
import AdminArchivePage from "./pages/admin/AdminArchivePage";
import AdminDeleteLocationPage from "./pages/admin/AdminDeleteLocationsPage.jsx";
import AdminEditHistoryPage from "./pages/admin/AdminEditHistoryPage.jsx";
import { jwtDecode } from "jwt-decode";
import AdminRoute from "./AdminRoute.js";
import SuperAdminRoute from "./SuperAdminRoute.js";
import SuperAdminAccessPage from "./pages/superadmin/SuperAdminAccessPage.jsx";
import SuperAdminDashboardPage from "./pages/superadmin/SuperAdminDashboardPage.jsx";
import SuperAdminLoginPage from "./pages/superadmin/SuperAdminLoginPage.jsx";
import SuperAdminLocaionPage from "./pages/superadmin/SuperAdminLocationPage.jsx";
import SuperAdminArchivePage from "./pages/superadmin/SuperAdminArchivePage.jsx";
import SuperAdminEditHistoryPage from "./pages/superadmin/SuperAdminEditHistoryPage.jsx";
import SuperAdminDeleteLocationPage from "./pages/superadmin/SuperAdminDeleteLocationPage.jsx";
import CryptoJS from 'crypto-js';
import SuperAdminRegisterPage from "./pages/superadmin/SuperAdminRegisterPage.jsx";




function App() {

const userRole = localStorage.getItem('role');
const isAuthenticated = !!userRole;
const isAdmin = userRole ==='admin';
const isSuperAdmin = userRole === 'superadmin';
console.log(isSuperAdmin);


  return (
    <>
      <PageState>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/admin-login" element={<AdminLoginPage />} />
          <Route path="/superadmin-login" element={<SuperAdminLoginPage />} />
          <Route path="/superadmin-register" element={<SuperAdminRegisterPage />} />
          <Route path="/admin-dashboard" 
          element={<AdminRoute isAuthenticated={isAuthenticated} isAdmin={isAdmin} element={Admin} /> }/>
          <Route path="/admin-location" element={<AdminRoute isAuthenticated={isAuthenticated} isAdmin={isAdmin} element={AdminLocationPage} />} />
          <Route path="/admin-archive" element={<AdminRoute isAuthenticated={isAuthenticated} isAdmin={isAdmin} element={AdminArchivePage} />} />

          <Route
            path="/admin-delete-location"
            element={<AdminRoute isAuthenticated={isAuthenticated} isAdmin={isAdmin} element={AdminDeleteLocationPage} />}
          />
          <Route path="/admin-edit-history" element={<AdminRoute isAuthenticated={isAuthenticated} isAdmin={isAdmin} element={AdminEditHistoryPage} />} />

         <Route path="/superadmin-dashboard" element={<SuperAdminRoute isAuthenticated={isAuthenticated} isSuperAdmin={isSuperAdmin} element={SuperAdminDashboardPage} />} />
          <Route path="/superadmin-location" element={<SuperAdminRoute isAuthenticated={isAuthenticated} isSuperAdmin={isSuperAdmin} element={SuperAdminLocaionPage} />} />
          <Route path="/superadmin-archive" element={<SuperAdminRoute isAuthenticated={isAuthenticated} isSuperAdmin={isSuperAdmin} element={SuperAdminArchivePage} />} />
          <Route path="/superadmin-access" element={<SuperAdminRoute isAuthenticated={isAuthenticated} isSuperAdmin={isSuperAdmin} element={SuperAdminAccessPage} />} />
          <Route path="/superadmin-edit-history" element={<SuperAdminRoute isAuthenticated={isAuthenticated} isSuperAdmin={isSuperAdmin} element={SuperAdminEditHistoryPage} />} />
          <Route
            path="/superadmin-delete-location"
            element={<SuperAdminRoute isAuthenticated={isAuthenticated} isSuperAdmin={isSuperAdmin} element={SuperAdminDeleteLocationPage} />}
          />

          {/* Add the following route to redirect to home for any other route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <ToastContainer
          position="bottom-center"
          reverseOrder={false}
          autoClose={2000}
          hideProgressBar={true}
        />
      </PageState>
    </>
  );
}

export default App;
