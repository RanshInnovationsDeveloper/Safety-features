import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Homepage from "./pages/Homepage";
import Admin from "./pages/admin/AdminPage";
import "./App.css";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import PageState from "./notes/PageState.js";

import AdminLocationPage from "./pages/admin/AdminLocationPage";
import AdminArchivePage from "./pages/admin/AdminArchivePage";
import AdminDeleteLocationPage from "./pages/admin/AdminDeleteLocationsPage.jsx";
import AdminAccessPage from "./pages/admin/AdminAccessPage.jsx";
import AdminEditHistoryPage from "./pages/admin/AdminEditHistoryPage.jsx";
function App() {
  return (
    <>
      <PageState>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/admin-dashboard" element={<Admin />} />
          <Route path="/admin-location" element={<AdminLocationPage />} />
          <Route path="/admin-archive" element={<AdminArchivePage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route
            path="/admin-delete-location"
            element={<AdminDeleteLocationPage />}
          />
          <Route path="/admin-edit-history" element={<AdminEditHistoryPage />} />

         <Route path="/superadmin-dashboard" element={<Admin />} />
          <Route path="/superadmin-location" element={<AdminLocationPage />} />
          <Route path="/superadmin-archive" element={<AdminArchivePage />} />
          <Route path="/superadmin/login" element={<AdminLoginPage />} />
          <Route path="/superadmin-access" element={<AdminAccessPage />} />
          <Route path="/superadmin-edit-history" element={<AdminEditHistoryPage />} />
          <Route
            path="/superadmin-delete-location"
            element={<AdminDeleteLocationPage />}
          />
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
