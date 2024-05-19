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
