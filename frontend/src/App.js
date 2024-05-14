import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage"
import Admin from "./pages/admin/AdminPage"
import "./App.css"
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import PageState from './context/pages/PageState';

import AdminLocationPage from "./pages/admin/AdminLocationPage";
import AdminArchivePage from "./pages/admin/AdminArchivePage";
function App() {
  return (
    <>
    <PageState>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/admin-dashboard' element={<Admin/>}/>
        <Route path="/admin-location" element={<AdminLocationPage/>}/>
        <Route path="/admin-archive" element={<AdminArchivePage/>}/>
        
        <Route path='/admin/login' element={<AdminLoginPage />} />
      </Routes>
      </PageState>
    </>
  );
}

export default App;
